const mongoose = require('mongoose');
//Sub Docs

const productSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: [true, 'A model name is required.']
    },
    productMaker: String,
    productType: {
        type: String,
        enum: ['lever', 'pedal', 'lever-free', 'not sure', 'other']
    },
    productSize: Number,
    productAliases: Array
},{ versionKey: false });

// Main Doc
const makesModelsSchema = new mongoose.Schema({
    makerName: {
        type: String,
        required: [true, 'A product maker (manufacturer) name is required.']
    },
    makerAliases: Array,
    
    // Array of subdocuments
    makerProducts: [productSchema],
    
},{ versionKey: false });

const MakesModels = mongoose.model('MakesModels', makesModelsSchema);
//console.log(MakesModels.find())
// Main Doc
const contactRequestsSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address not valid. Please try again.']
    },
    productmaker: {type: String},
    productmodel: {type: String},
    sellername: {type: String},
    comments: {type: String},
    _date_created: {type: Date}
},{ versionKey: false });

const ContactRequests = mongoose.model('ContactRequests', contactRequestsSchema);
// Users
const usersSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address not valid. Please try again.']
    },
    emailverified: {
        type: Boolean, 
        default: false
    },
    password: {
        type: String,
        minlength: 8
    },
    usertype: {
        type: String, 
        enum: {
            values: ['user', 'seller', 'admin', 'other'],
            message: 'User Type must be user, seller, admin or other.'
        },
        default: 'user'
    }
},{ versionKey: false });

const Users = mongoose.model('Users', usersSchema);

module.exports.MakesModels = MakesModels;
module.exports.ContactRequests = ContactRequests;
module.exports.Users = Users;

// const vendorDeets = {
//     vendorName: 'Murvihill Harps',
//     vendorAliases: ['Mervihill','Murvihill', 'Murvahill'],

// }
// var Vendor = mongoose.model('vendorSchema');
// var newVendor = new vendor(vendorDeets);
// console.log(newVendor);

// create a comment
// parent.children.push({ name: 'Liesl' });
// var subdoc = parent.children[0];
// console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
// subdoc.isNew; // true

// newVendor.save(function (err) {
//   if (err) return handleError(err)
//   console.log('Success!');
// });

// var Parent = mongoose.model('Parent');
// var parent = new Parent;

// // create a comment
// parent.children.push({ name: 'Liesl' });
// var subdoc = parent.children[0];
// console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
// subdoc.isNew; // true

// parent.save(function (err) {
//   if (err) return handleError(err)
//   console.log('Success!');
// });












// const productSchema = new mongoose.Schema({
    
//         type: Array,
//         schema: {
            
//     }
    
// });


// // mongoose
// const makerSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'A product maker (manufacturer) name is required.']
//     },
//     models: Array,
//     othernames: Array
// });
/******************* */
// const Maker = mongoose.model('Maker', makerSchema);

// const testMaker = new Maker({
//     name: 'Rees Harps',
//     models: ['Harpsicle', 'Aberdeen Meadows'],
//     othernames: ['Reis']
// });


/****************** */
// Object.keys(productMakesModels).map(maker => {
    //console.log('************', leaf(productMakesModels, maker))
    // const modelsFromMaker = leaf(productMakesModels, maker);
    // Object.keys(productMakesModels).map(maker => {
    //     const othernames = leaf(productMakesModels, maker).othernames;
    //     const models = Object.keys(leaf(productMakesModels, maker)).filter(model => model !== 'othernames');
        
    //     const testMaker = new Maker({
    //         name: maker,
    //         models,
    //         othernames
    //     });
    //     // testMaker.save().then(doc => console.log(doc)).catch(err => console.log(err));
    // });
    
// })


