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
const userharpsRouter = require('./routes/userharpsRoutes');
const productRouter = require('./routes/productRoutes');
const partnerRouter = require('./routes/partnerRoutes');
const authController = require('./controllers/authController');
const { scrapeAds } = require('./utils/harpAdScraper');
const { scrapeStoreItems } = require('./assets/store/utils/scrapeStoreItems');
const { catchAsync, leaf } = require('./utils/helpers/helpers');
const { Users } = require('./assets/data/UserSchema');
const { Agreements } = require('./assets/data/Schemas');
const { ProductUploads } = require('./assets/data/Schemas');
const { StoreItemUpload } = require('./assets/data/Schemas');
const { ContactRequests, MakesModels, Products } = require('./assets/data/Schemas');
const { 
    sendMailUserToSeller, 
    contactUsForm, 
    emailVerifySend, 
    sendReceipt, 
    agreementSigned 
} = require('./email');
const { refreshMakesModels } = require('./utils/codeStorage/rarelyUsedUtils');

// program setup
const app = express();
const emitter = new EventEmitter;
emitter.setMaxListeners(50);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

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

// // misc
// app.use((req, res, next) => {
//     console.log(req.headers);
//     next();
// })

//Router
app.use('/', viewRouter); 
app.use('/api/v1/users', userRouter);
app.use('/api/v1/userharps', userharpsRouter);
app.use('/api/v1/products', productRouter); 
// app.use('/api/v1/partners', partnerRouter); 

//parser for pug
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//#region partner agreements
// blevins harps
app.get('/api/v1/partners/blevinsharps', (req,res) => {
    res.status(200).render('base', {
        seller: 'Blevins Harps',
        sellerId: 'blevinsharps',
        startDate: 'December 14, 2020',
        fee: '5%',
        minimum: '$40.00usd'
    });
});
app.post('/api/v1/partners/blevinsharpsagree', async (req,res) => {
    if (!(req.body.feecheck&&req.body.feecheck==='on'&&req.body.termscheck&&req.body.termscheck==='on')) {
        return res.status(400).render('base', {
            agreement: 'fail',
            seller: 'Blevins Harps',
            sellerId: 'blevinsharps',
            startDate: 'December 14, 2020',
            fee: '5%',
            minimum: '$40.00usd'
        });
    }
    try {
        const uploadagreement = Object.assign({ 
            seller: req.body.seller,
            sellerId: req.body.sellerId,
            startdate: req.body.startdate,
            fee: req.body.fee,
            minimum: req.body.minimum,
            scheduletext: req.body.scheduletext
        });
        const addedagreement = await Agreements.create(uploadagreement);
        agreementSigned();
        return res.status(200).render('base', {
            agreement: 'success',
            seller: req.body.seller
        });
    } catch (e) {
        return res.status(500).render('base', {
            error: 'server error',
            message: e.message
        });
    }
});
// 4 harp music
app.get('/api/v1/partners/4harpmusic', (req,res) => {
    res.status(200).render('base', {
        seller: 'Margaret Atkinson',
        sellerId: '4harpmusic',
        startDate: 'January 7, 2021',
        fee: '3%',
        minimum: '$40.00usd'
    });
});
app.post('/api/v1/partners/4harpmusicagree', async (req,res) => {
    if (!(req.body.feecheck&&req.body.feecheck==='on'&&req.body.termscheck&&req.body.termscheck==='on')) {
        return res.status(400).render('base', {
            agreement: 'fail',
            seller: 'Margaret Atkinson',
            sellerId: '4harpmusic',
            startDate: 'January 7, 2021',
            fee: '3%',
            minimum: '$40.00usd'
        });
    }
    try {
        const uploadagreement = Object.assign({ 
            seller: req.body.seller,
            sellerId: req.body.sellerId,
            startdate: req.body.startdate,
            fee: req.body.fee,
            minimum: req.body.minimum,
            scheduletext: req.body.scheduletext
        });
        const addedagreement = await Agreements.create(uploadagreement);
        agreementSigned();
        return res.status(200).render('base', {
            agreement: 'success',
            seller: req.body.seller
        });
    } catch (e) {
        return res.status(500).render('base', {
            error: 'server error',
            message: e.message
        });
    }
});
// Harp Angel
app.get('/api/v1/partners/harpangel', (req,res) => {
    res.status(200).render('base', {
        seller: 'Deborah Nyack',
        sellerId: 'harpangel',
        startDate: 'January 7, 2021',
        fee: '3%',
        minimum: '$45.00cad'
    });
});
app.post('/api/v1/partners/harpangelagree', async (req,res) => {
    if (!(req.body.feecheck&&req.body.feecheck==='on'&&req.body.termscheck&&req.body.termscheck==='on')) {
        return res.status(400).render('base', {
            agreement: 'fail',
            seller: 'Deborah Nyack',
            sellerId: 'harpangel',
            startDate: 'January 7, 2021',
            fee: '3%',
            minimum: '$45.00CAD'
        });
    }
    try {
        const uploadagreement = Object.assign({ 
            seller: req.body.seller,
            sellerId: req.body.sellerId,
            startdate: req.body.startdate,
            fee: req.body.fee,
            minimum: req.body.minimum,
            scheduletext: req.body.scheduletext
        });
        const addedagreement = await Agreements.create(uploadagreement);
        agreementSigned();
        return res.status(200).render('base', {
            agreement: 'success',
            seller: req.body.seller
        });
    } catch (e) {
        return res.status(500).render('base', {
            error: 'server error',
            message: e.message
        });
    }
});
// Vixen Harps
app.get('/api/v1/partners/vixenharps', (req,res) => {
    res.status(200).render('base', {
        seller: 'Vixen Harps',
        sellerId: 'vixenharps',
        startDate: 'December 18, 2020',
        fee: '3%',
        minimum: '$45.00cad'
    });
});
app.post('/api/v1/partners/vixenharpsagree', async (req,res) => {
    if (!(req.body.feecheck&&req.body.feecheck==='on'&&req.body.termscheck&&req.body.termscheck==='on')) {
        return res.status(400).render('base', {
            agreement: 'fail',
            seller: 'Vixen Harps',
            sellerId: 'vixenharps',
            startDate: 'January 2, 2021',
            fee: '3%',
            minimum: '$45.00cad'
        });
    }
    try {
        const uploadagreement = Object.assign({ 
            seller: req.body.seller,
            sellerId: req.body.sellerId,
            startdate: req.body.startdate,
            fee: req.body.fee,
            minimum: req.body.minimum,
            scheduletext: req.body.scheduletext
        });
        const addedagreement = await Agreements.create(uploadagreement);
        agreementSigned();
        return res.status(200).render('base', {
            agreement: 'success',
            seller: req.body.seller
        });
    } catch (e) {
        return res.status(500).render('base', {
            error: 'server error',
            message: e.message
        });
    }
});

//#endregion
// Willow Karlene
app.get('/api/v1/partners/wkagree', (req,res) => {
    res.status(200).render('base', {
        seller: 'Willow Karlene',
        sellerId: 'wk',
        startDate: 'February 8, 2021',
        fee: '5%',
        minimum: '$45.00cad'
    });
});
app.post('/api/v1/partners/wk', async (req,res) => {
    if (!(req.body.feecheck&&req.body.feecheck==='on'&&req.body.termscheck&&req.body.termscheck==='on')) {
        return res.status(400).render('base', {
            agreement: 'fail',
            seller: 'wk',
            sellerId: 'wk',
            startDate: 'February 8, 2021',
            fee: '5%',
            minimum: '$45.00cad'
        });
    }
    try {
        const uploadagreement = Object.assign({ 
            seller: req.body.seller,
            sellerId: req.body.sellerId,
            startdate: req.body.startdate,
            fee: req.body.fee,
            minimum: req.body.minimum,
            scheduletext: req.body.scheduletext
        });
        const addedagreement = await Agreements.create(uploadagreement);
        agreementSigned();
        return res.status(200).render('base', {
            agreement: 'success',
            seller: req.body.seller
        });
    } catch (e) {
        return res.status(500).render('base', {
            error: 'server error',
            message: e.message
        });
    }
});

//#endregion

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
// app.post('/api/v1/uploadlisting', authController.protect, authController.restrictTo('admin', 'seller'), upload.single('photo'), async (req, res) => { // BREAKING security
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
            productSeller: req.body.sellername,
            productDescription: req.body.description,
            productImageUrl: '/assets/img/' + req.file.originalname
        });
        // console.log('top', uploadlisting)
        const addeduploadlisting = await ProductUploads.create(uploadlisting);
        // console.log('bottom', addeduploadlisting)
        res.redirect('https://findaharp.com?uploadlisting=yes');
        // res.redirect('https://findaharp-testing.take2tech.ca?uploadlisting=yes');
        // res.redirect('http://localhost:3006?uploadlisting=yes');
        // res.status(200).json({
        //     title: 'FindAHarp.com | Upload Listing',
        //     status: 'success',
        //     addeduploadlisting 
        // });
    } catch (e) {
        // res.redirect('http://localhost:3006?uploadlisting=no');
        res.redirect('https://findaharp.com?uploadlisting=no');
        // res.redirect('https://findaharp-testing.take2tech.ca?uploadlisting=no');
    }
});
// not in router due to fs directory issue
// app.post('/api/v1/uploadlisting', authController.protect, authController.restrictTo('admin', 'seller'), upload.single('photo'), async (req, res) => { // BREAKING security
app.post('/api/v1/uploadstoreitem', upload.single('photo'), async (req, res) => {
    const photoSuccess='true';
    const subcategories = [];
    //prepare subcategory list
    if (req.body.harpsolo) subcategories.push('Harp Solo');
    if (req.body.harpensemble) subcategories.push('Harp Ensemble');
    if (req.body.pop) subcategories.push('Pop');
    if (req.body.classical) subcategories.push('Classical');
    if (req.body.fluteharp) subcategories.push('Flute/Harp');
    if (req.body.violinharp) subcategories.push('Violin/Harp');
    if (req.body.voiceharp) subcategories.push('Voice/Harp');
    if (req.body.otherensemble) subcategories.push('Other Ensemble');
    if(req.file&&req.file!==undefined) {
        try {
            fs.rename(`${__dirname}/assets/img/${req.file.filename}`, `${__dirname}/assets/img/store/${req.file.originalname}`, function (err) {
                if (err) throw err;
                console.log('File Renamed!');
            });
        } catch(e) {
            console.log('photo rename catch', e.message);
            photoSuccess = false;
        }
    }
    try {
        const uploaditem = Object.assign({ 
            category: req.body.category,
            subcategories, 
            title: req.body.title,
            artist_first: req.body.artist_first,
            artist_last: req.body.artist_last,
            seller: req.body.seller,
            price: req.body.price,
            description: req.body.description,
            image: `/assets/img/store/${req.file?req.file.originalname:'genericHarp.png'}`,
            condition: req.body.condition,
            level: req.body.level,
            harptype: req.body.harptype,
            notes: req.body.notes,
            newused: req.body.newused,
            newprice: req.body.newprice,

        });
        // console.log('top', uploaditem)
        const addeduploadstoreitem = await StoreItemUpload.create(uploaditem);
        // console.log('bottom', addeduploadstoreitem)
        // res.redirect('https://findaharp.com?uploadstoreitem=yes');
        
        // res.redirect('https://findaharp-testing.take2tech.ca?uploadstoreitem=yes');
        photoSuccess
            ?res.redirect('http://sellersarea-sm.findaharp.com?upload=yes&success=yes')
            :res.redirect('http://sellersarea-sm.findaharp.com?upload=yes&success=yes&photoSuccess=no');
        // res.status(200).json({
        //     title: 'FindAHarp.com | Upload Listing',
        //     status: 'success',
        //     addeduploadstoreitem
        // });
    } catch (e) {
        console.log('error', e.message)
        res.redirect(`http://sellersarea-sm.findaharp.com?upload=yes&success=no&message=${e.message}`);
        // res.redirect('https://findaharp.com?uploadstoreitem=no');
        
        // res.redirect('https://findaharp-testing.take2tech.ca?uploadstoreitem=no');
        // res.status(400).json({
        //     title: 'FindAHarp.com | Upload Listing',
        //     status: 'fail',
        //     message: e.message
        // });
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
        if (contact.newsletter===true) { // BREAKING needs to be wired up
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
// Send Receipt
app.post('/api/v1/sendreceipt', catchAsync(async (req, res) => {
    try {
        sendReceipt(req.body, '', '');
        console.log('success')
        res.status(200).json({
            title: 'FindAHarp.com | Send Receipt',
            status: 'success'  
        });
    } catch (e) {
        console.log('error', e.message)
        res.status(500).json({
            title: 'FindAHarp.com | Send Receipt',
            status: 'fail',
            data: {
                message: `Something went wrong while sending email receipt: ${e.message}`
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
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            // amount: calculateOrderAmount(items), // if using item list w/calculateOrderAmount
            amount: req.body.total,
            currency: req.body.currency
        });
        res.send({
            clientSecret: paymentIntent.client_secret
        });

    } catch (e) {
        console.log('error', e.message)
        res.status(500).json({
            title: 'FindAHarp.com | Stripe Connect',
            status: 'fail',
            data: {
                message: `Something went wrong while connecting with the Stripe payment gateway: ${e.message}`
            }
        });
    }
    
});

// Run get userharps list
app.get('/api/v1/userharps/', catchAsync(async (req, res) => {
   // get product list
   fs.readFile(path.join(__dirname, '/assets/constants/storeItemsList.json'), (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        
        // send results 
        data = JSON.parse(data);
        res.status(200).json({
            title: 'OneStopHarpShop | Used Harps',
            status: 'success',
            storeitems: data
        });
    });
}));



app.get('/api/v1/storeitems', catchAsync(async (req, res) => {
   // get product list
   fs.readFile(path.join(__dirname, '/assets/constants/storeItemsList.json'), (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        
        // send results 
        data = JSON.parse(data);
        res.status(200).json({
            title: 'OneStopHarpShop | Used Harps',
            status: 'success',
            storeitems: data
        });
    });
}));
app.get('/api/v1/scrapestoreitems', catchAsync(async (req, res) => {
    const storeItems=scrapeStoreItems();
    
    res.status(200).json({
        title: 'FindAHarp.com | Get Store Items',
        status: 'success',
        storeItems  
    });
}));
 
// Catch invalid routes
app.all('*', (req,res,next) => {
    next(new AppError(`Web address 'findaharp-api${req.originalUrl}' not found. Please see findaharp-api docs for valid addresses.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
