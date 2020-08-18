process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';  // to allow scraping of webstores with invalid ssl
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
// packages
const fs = require('fs');
const atob = require('atob');
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');
const upload = multer({dest: __dirname + '/assets/img'});

// security
const EventEmitter = require('events');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const express = require('express');

// internal
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const authController = require('./controllers/authController');
const { scrapeAds } = require('./utils/harpAdScraper');
const { catchAsync, leaf } = require('./utils/helpers/helpers');
const { Users } = require('./assets/data/Schemas');
const { ProductUploads } = require('./assets/data/Schemas');
const { ContactRequests, MakesModels, Products } = require('./assets/data/Schemas');
const { sendMailUserToSeller, contactUsForm, emailVerifySend } = require('./email');
const { refreshMakesModels } = require('./utils/codeStorage/rarelyUsedUtils');

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
app.use(express.static(".")); // put in for Stripe test

//utilities ** see commented code below
app.use(express.json({limit: '10kb'}))


//Router
app.use('/', viewRouter); 
app.use('/api/v1/users', userRouter); 
app.use('/api/v1/products', productRouter); 

// app.post('/api/v1/uploadlisting', upload.single('photo'), (req, res) => {
//     console.log(req.file)
//     console.log(req.body)
//     if(req.file) {
//         fs.rename(`${__dirname}/assets/img/${req.file.filename}`, `${__dirname}/assets/img/${req.file.originalname}`, function (err) {
//             if (err) throw err;
//             console.log('File Renamed!');
//         });
//         res.json(req.file);
//     }
//     else throw 'error';
    
// });

// not in router due to fs directory issue
app.post('/api/v1/uploadlisting', upload.single('photo'), async (req, res) => {
    if(req.file) {
        fs.rename(`${__dirname}/assets/img/${req.file.filename}`, `${__dirname}/assets/img/${req.file.originalname}`, function (err) {
            if (err) throw err;
            console.log('File Renamed!');
        });
    }
    else throw 'error';
    
    try {
        const uploadlisting = Object.assign({ 
            productTitle: req.body.title,
            productMaker: req.body.make,
            productModel: req.body.model,
            productPrice: Number(req.body.price),
            productSeller: req.body.sellerName,
            productDescription: req.body.description,
            productImageUrl: '/assets/img/' + req.file.originalname
        });
        // console.log('top', uploadlisting)
        const addeduploadlisting = await ProductUploads.create(uploadlisting);
        // console.log('bottom', addeduploadlisting)
        res.redirect('https://findaharp.com');
        // res.status(200).json({
        //     title: 'FindAHarp.com | Upload Listing',
        //     status: 'success',
        //     addeduploadlisting
        // });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Upload Listing',
            status: 'fail',
            data: {
                message: e.message
            }
        });
    }
});

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
        if (contact.newsletter===true) {
            try {
                
            } catch(e) {

            }
        }
        contactUsForm(contact);
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
app.post('/api/v1/contactsellerform', async (req, res) => {
    try {
        const contact = Object.assign({ contactId: uuid() }, req.body);
        const added = await ContactRequests.create(contact);
        sendMailUserToSeller(contact);
        res.status(200).json({
            title: 'FindAHarp.com | Contact Seller',
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
app.post('/api/v1/emailverify/', catchAsync(async (req, res) => {
    const decodeEmail = atob(req.body.email);
    
    try {
        const user = await Users.findOne({email: req.params.email});
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
// Resend verify email
app.post('/api/v1/resendverify', catchAsync(async (req, res) => {
    emailVerifySend(req.body);
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

// This is your real test secret API key.

app.post("/api/v1/create-stripe-payment-intent", async (req, res) => {
    const calculateOrderAmount = items => {
        // Replace this constant with a calculation of the order's amount
        // Calculate the order total on the server to prevent
        // people from directly manipulating the amount on the client
        return 1400;
      };

    const { items } = req.body; // if using item list
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        // amount: calculateOrderAmount(items), // if using item list w/calculateOrderAmount
        amount: req.body.total,
        currency: "usd"
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});
 
// Catch invalid routes
app.all('*', (req,res,next) => {
    next(new AppError(`Web address 'findaharp-api${req.originalUrl}' not found. Please see findaharp-api docs for valid addresses.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
