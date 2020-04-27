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
const { Users } = require('./assets/data/Schemas');

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
/***************
 * User Routes
 ***************/
app.post('/api/v1/users/createuser', async (req, res) => {
    try {
        const user = Object.assign({ contactId: uuid() }, req.body);
        const added = await Users.create(user);
    
        res.status(200).json({
            title: 'FindAHarp.com | Create User',
            status: 'success',
            data: {
                added
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Create User',
            status: 'fail',
            data: {
                message: `Something went wrong while creating user: ${e.message}`
            }
        });
    }
});
app.get('/api/v1/users/', async (req, res) => {
    try {
        const allUsers = await Users.find();
       
        res.status(200).json({
            title: 'FindAHarp.com | Get All Users',
            status: 'success',
            data: {
                allUsers
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Get All Users',
            status: 'fail',
            data: {
                message: `Something went wrong getting all users: ${e.message}`
            }
        });
    }
});
app.get('/api/v1/users/me/:userid', async (req, res) => {
    console.log(req.params)
    try {
        const user = await Users.findById(req.params.userid);
       
        res.status(200).json({
            title: 'FindAHarp.com | Get User',
            status: 'success',
            data: {
                user
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Get User',
            status: 'fail',
            data: {
                message: `Something went wrong with your account: ${e.message}`
            }
        });
    }
});
app.patch('/api/v1/users/updateuser/:userid', async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.userid, req.body);
       
        res.status(200).json({
            title: 'FindAHarp.com | Update User',
            status: 'success',
            data: {
                message: 'User updated',
                user
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Update User',
            status: 'fail',
            data: {
                message: `Something went wrong while updating user: ${e.message}`
            }
        });
    }
});
app.delete('/api/v1/users/deleteuser/:userid', async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.userid);
       
        res.status(200).json({
            title: 'FindAHarp.com | Delete User',
            status: 'success',
            data: {
                message: 'User deleted',
                user
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Delete User',
            status: 'fail',
            data: {
                message: `Something went wrong while deleting user: ${e.message}`
            }
        });
    }
});


// Catch invalid routes
app.all('*', (req,res,next) => {
    next(new AppError(`Web address 'findaharp-api${req.originalUrl}' not found. Please see findaharp-api docs for valid addresses.`, 404));
});

app.use(globalErrorHandler);

//Export
module.exports = app;
