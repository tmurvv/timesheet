process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';  //NOT YET IMPLEMENTED dangerous code

const path = require('path');
const EventEmitter = require('events');
const cors = require('cors');
const express = require('express');
const viewRouter = require('./routes/viewRoutes');
const productRouter = require('./routes/productRoutes');
const { scrapeAds } = require('./utils/harpAdScraper');
const app = express();
// const { shortFileNameFn } = require('./toStack');
// const usedHarps = require('./assets/constants/usedHarpList.json');
const emitter = new EventEmitter;
emitter.setMaxListeners(50);
console.log(process.env.NODE_ENV);

const { productMakesModels } = require('./assets/constants/makerArray');


// const longProductImageUrl = 'https://img1.wsimg.com/isteam/ip/7ed83e96-6fb7-4d7c-bfe9-1a34fcbed15e/SB_20Detail.jpg/:/cr=t:31.25_25,l:0_25,w:100_25,h:37.5_25/rs=w:388,h:194,cg:true';
// const shortProductImageUrl = shortFileNameFn(longProductImageUrl);
// console.log('Short File Name:', shortProductImageUrl); //Returns undefined


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

//security ** see commented code below

//utilities ** see commented code below

//Error handling ** see below commented code

//Router
app.use('/', viewRouter); 
// app.use('/productads', productRouter); 

// //Run get product ads
app.get('/productads', async (req, res) => {
    const usedHarps = await scrapeAds();
    console.log('prodads', usedHarps)
    // send results 
    res.status(200).json({
        title: 'FindAHarp.com | Get Harp Ads',
        status: 'success',
        //availableHarps: usedHarps.length,
        harpData: usedHarps  
    });
});

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
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    });
});
// exports.getUsedHarp = async (req, res) => {
//     // send results 
//     res.status(200).json({
//         title: 'OneStopHarpShop | Used Harps',
//         status: 'success',
//         harpMakesModels: productMakesModels,
//         harpData: usedHarps  
//     });
// };

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
