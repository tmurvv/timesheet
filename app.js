// this is the Nodemailer Branch
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';  // to allow scraping of webstores with invalid ssl
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
const nodemailer = require('nodemailer');
// packages
const { Users } = require('./assets/data/Schemas');
const atob = require('atob');
const path = require('path');
const uuid = require('uuid');

// security
const EventEmitter = require('events');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const express = require('express');

// internal
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');
const { scrapeAds } = require('./utils/harpAdScraper');
const { emailVerifySend } = require('./email');
const { catchAsync } = require('./utils/helpers/helpers');
const { ContactRequests } = require('./assets/data/Schemas');

// program setup
const app = express();
const emitter = new EventEmitter;
emitter.setMaxListeners(50);

//security setup ** see commented code below
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use('/api', rateLimit.apply({
    max: 300,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour.'
}));

//CORS
app.use(cors());
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

//Serve static image files
express.static('assets');
app.use(express.static('img'));

//utilities ** see commented code below
app.use(express.json({limit: '10kb'}))

/****************
 * NODEMAILER TRIAL
 ****************/

emailVerifySend('user var');

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   const testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport({
//     host: "mail.findaharp.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: 'tmurvvvv', // main 'cwh' user
//       pass: 'weSS#4ling', // main user password for 'cwh'
//     },
//   });

//   // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
//   const info = await transporter.sendMail({
//     from: '<harps@findaharp.com>', // sender address
//     to: "tech@take2tech.ca, tmurv@shaw.ca", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "tech, shaw", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
// //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   console.log('Nodemailer return object:', nodemailer)
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);







//Router
app.use('/', viewRouter); 
app.use('/api/v1/users', userRouter); 

app.post('/api/v1/privateads', async (req, res) => {
    const productId = uuid();
    const product = Object.assign({ productId }, req.body);
    
    res.status(200).json({
        title: 'FindAHarp.com | Create Private Ad',
        status: 'success',
        data: {
            product
        }
    });
    
});
app.post('/api/v1/contactform', async (req, res) => {
    try {
        const contact = Object.assign({ contactId: uuid() }, req.body);
        const added = await ContactRequests.create(contact);
    
        res.status(200).json({
            title: 'FindAHarp.com | Create Contact',
            status: 'success',
            data: {
                added
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Create Contact',
            status: 'fail',
            data: {
                message: `Something went wrong while contacting seller: ${e.message}`
            }
        });
    }
});

// Run send email
app.post('/api/v1/emailverify', catchAsync(async (req, res) => {
    const decodeEmail = atob(req.body.email);
    
    try {
        const user = await Users.findOne({email: decodeEmail});
        if (user) {
            if (!user.emailverified) await Users.findOneAndUpdate({email: user.email}, {emailverified: true});
        
            res.status(200).json({
                title: 'FindAHarp.com | Get Email',
                status: 'success'
            });
        } else {
            res.status(400).json({
                title: 'FindAHarp.com | Verify Email',
                status: 'fail',
                data: {
                    message: `Email ${decodeEmail} not found.`
                }
            });
        }
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Verify Email',
            status: 'fail',
            data: {
                message: `Something went wrong while verifying email: ${e.message}`
            }
        });
    }
}));
// Run get product ads
app.get('/api/v1/productads', catchAsync(async (req, res) => {
    const usedHarps = await scrapeAds();

    res.status(200).json({
        title: 'FindAHarp.com | Get Harp Ads',
        status: 'success',
        harpData: usedHarps  
    });
}));
//Image Router code based on expressjs.com API reference
app.get('/assets/img/:name', function (req, res, next) {
    const options = {
        root: path.join(__dirname, 'assets/img'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
  
    const fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(new AppError(`No image found with the file name '${fileName}'.`, 404))
        } else {
            console.log('Sent:', fileName)
        } 
    });
});
 
// Catch invalid routes
app.all('*', (req,res,next) => {
    next(new AppError(`Web address 'findaharp-api${req.originalUrl}' not found. Please see findaharp-api docs for valid addresses.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
