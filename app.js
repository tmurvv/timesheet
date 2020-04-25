process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

// packages
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
const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controllers/errorController');
const { scrapeAds } = require('./utils/harpAdScraper');
const { catchAsync } = require('./utils/helpers/helpers');
const { ContactRequests } = require('./assets/data/Schemas');

// program setup
const app = express();
const emitter = new EventEmitter;
emitter.setMaxListeners(50);
console.log(process.env.NODE_ENV);

//security setup ** see commented code below
app.use(helmet());
app.use(xss());
app.use(hpp())

const limiter = rateLimit.apply({
    max: 300,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour.'
});

app.use('/api', limiter);

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
// app.use(express.static('img/testdataimg'));
// app.use('/img', express.static(__dirname + '/public'));
// app.use('/img/datatestimg', express.static(__dirname + '/public/'));

//utilities ** see commented code below
app.use(express.json({limit: '10kb'}))

//Router
app.use('/', viewRouter); 

app.post('/api/v1/privateads', async (req, res) => {
    const productId = uuid();
    const product = Object.assign({ productId }, req.body);
    
    // add to json usedharplist
    res.status(200).json({
        title: 'FindAHarp.com | Create Private Ad',
        status: 'success',
        data: {
            product
        }
    });
    
});
app.post('/api/v1/contactform', (req, res) => {
    const contactId = uuid();
    const contact = Object.assign({ contactId }, req.body);
    // const contact = Object.assign({ firstname, lastname, email, productmaker, productmodel, sellername }, req.body);
    ContactRequests.create(contact);
    // add to json usedharplist
    res.status(200).json({
        title: 'FindAHarp.com | Create Contact',
        status: 'success',
        data: {
            contact
        }
    });
});


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
  
    const fileName = req.params.name
    
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(new AppError(`No image found with the file name '${fileName}'.`, 404))
        } else {
            console.log('Sent:', fileName)
        } 
    });
});
app.get('/assets/img/testdataimg/:name', function (req, res, next) {
    const options = {
        root: path.join(__dirname, 'assets/img'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
  
    const fileName = req.params.name
    
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(new AppError(`No image found with the file name '${fileName}'.`, 404))
        } else {
            console.log('Sent:', fileName)
        } 
    });
});


app.get('/assets/img/stock:name', function (req, res, next) {
    const options = {
        root: path.join(__dirname, 'assets/img'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
  
    const fileName = req.params.name
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
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

//Export
module.exports = app;

/***********
*OLD CODE
************/

// const path = require('path');
// const cors = require('cors');
// const express = require('express');
// //const Holidays = require('date-holidays');

// // const morgan = require('morgan');
// // const rateLimit = require('express-rate-limit');
// // const helmet = require('helmet');

// // const mongoSanitize = require('express-mongo-sanitize');

// // const xss = require('xss-clean');
// // const hpp = require('hpp');
// // const compression = require('compression');
// // const cookieParser = require('cookie-parser');

// // const globalErrorHandler = require('./controllers/errorController');
// // const AppError = require('./utils/AppError');
// // const bookingController = require('./controllers/bookingController');
// // const bookingItemController = require('./controllers/bookingItemController');
// // const globalErrorHandler = require('./controllers/errorController');
// // const rentalRoomRouter = require('./routes/rentalRoomRoutes');
// // const userRouter = require('./routes/userRoutes');
// // const bookingRouter = require('./routes/bookingRoutes');
// // const bookingItemRouter = require('./routes/bookingItemRoutes');
// const viewRouter = require('./routes/viewRoutes');
// // const companyProfileRouter = require('./routes/companyProfileRoutes');
// const app = express();
// app.use(cors());
// express.static('img');
// app.use(express.static('img'));
// //app.set('view engine', 'pug');
// //app.set('views', path.join(__dirname, 'views'));
// console.log(process.env.NODE_ENV);

// //const hd = new Holidays('CA', 'ab');

// //security
// // app.use(helmet()); //variety of security protections
// // const limiter = rateLimit({
// //     max: 200,
// //     windowMs: 60 * 60 * 1000,
// //     message: 'Too many requests from this IP, please try again in an hour.'
// // });
// // app.use('/api', limiter); //limits calls from each api (brute force attack)
// // app.use(express.json({ limit: '10kb' }));
// // app.use(cookieParser());
// // app.use(mongoSanitize()); //must come after express.json statement, eliminate special chars
// // app.use(xss()); //further data sanitization
// // app.use(hpp()); //cleans up url parameters, you can whitelist params you want more than one search on

// //utilities
// app.use(express.static(path.join(__dirname, 'public')));
// // app.use(compression());

// // app.get('/addBooking', (req, res) => {
// //     res.status(200).render('post');
// // });

// // *************
// //  * ROUTES
// //  ************/

// //Rental room routes & middleware
// app.all('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()
// });
// app.use('/', viewRouter);
// // app.use('/api/v1/rentalrooms', rentalRoomRouter);
// // app.use('/api/v1/users', userRouter);
// // app.use('/api/v1/bookings', bookingRouter);
// // app.use('/api/v1/bookingItems', bookingItemRouter);
// // app.use('/api/v1/companyProfile', companyProfileRouter);

// //REFACTOR
// // app.post('/submitBooking', bookingController.createBooking);
// // app.post('/submitBookingItems', bookingItemController.createBookingItem);

// // app.all('*', (req, res, next) => {
// //     next(new AppError(`Page not found (${req.originalUrl}).`, 404));
// // });

// //uncomment when error handler put in place
// // app.use(globalErrorHandler);

// module.exports = app;
