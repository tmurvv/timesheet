const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//Sub Docs

const productSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: [true, 'A model name is required.']
    },
    productMaker: String,
    productType: {
        type: String,
        enum: ['lever', 'pedal', 'lever-free', 'Wire/Cross/Double/Triple', 'not sure', 'other']
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

// *********Main Doc
const makesModelsTestSchema = new mongoose.Schema({
    makerName: {
        type: String,
        required: [true, 'A product maker (manufacturer) name is required.']
    },
    makerAliases: Array,
    
    // Array of subdocuments
    makerProducts: [productSchema],
    
},{ versionKey: false });

const MakesModelsTest = mongoose.model('MakesModelsTest', makesModelsTestSchema);


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
        unique: true,
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
    newsletter: {
        type: Boolean, 
        default: false
    },
    distanceunit: {
        type: String,
        enum: {
            values: ['miles', 'kms'],
            message: 'Preferred distance unit must be "miles" or "kms".'
        },
        default: 'miles'
    },
    currency: {
        type: String,
        enum: {
            values: ['USD', 'CAD'],
            message: 'Currency must be "USD" or "CAD".'
        },
        default: 'USD'
    },
    role: {
        type: String, 
        enum: {
            values: ['user', 'seller', 'admin', 'other', 'not set'],
            message: 'User Type must be user, seller, admin, not set, or other.'
        },
        default: 'user'
    },
    agreements: Array,
    _date_created: {
        type: Date,
        default: Date.now()
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now()
    }
},{ versionKey: false });
usersSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next;
    const saltRounds=10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});
usersSchema.pre('save', async function(next) {
    if(!this.isModified('password') || this.isNew) return next;
    const saltRounds=10;
    this.passwordChangedAt = Date.now()-1000; // one sec earlier so it for sure happens before JWT cookie is set
    next();
});
usersSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changeTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        return JWTTimestamp < changeTimeStamp;
    }
    return false;
}
const Users = mongoose.model('Users', usersSchema);

const productUploadSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: [true, 'A title is required, example: "Beautiful Mahogany Salvi Aurora now Available."']
    },
    productMaker: {
        type: String,
        required: [true, 'A maker is required, if maker unknown, enter "unknown".']
    },
    productModel: {
        type: String,
        required: [true, 'A model is required, if model unknown, enter "unknown".']
    },
    productPrice: String,
    productSeller: String,
    productDescription: String,
    productImageUrl: String,
    _date_created: {
        type: Date,
        default: Date.now()
    }
},{ versionKey: false });

const ProductUploads = mongoose.model('ProductUpload', productUploadSchema);

//upload store items (not harps)
const storeItemUploadSchema = new mongoose.Schema({
    category: {
        type: String,
        default: 'music',
        required: [true, 'Main category is required.']
    },
    subcategories: Array,
    title: {
        type: String,
        required: [true, 'A title is required.']
    },
    artist_first: {
        type: String
    },
    artist_last: {
        type: String,
        required: [true, 'Artist is required, name most likely to be searched between Composer, Arranger, or Performer']
    },
    price: {
        type: String,
        required: [true, 'Price is required.']
    },
    seller: {
        type: String,
        required: [true, 'Name of your store is required.']
    },
    description: String,
    image: String,
    condition: String,
    level: String,
    harptype: String,
    notes: String,
    newused: String,
    newprice: String,
    _date_created: {
        type: Date,
        default: Date.now()
    }
},{ versionKey: false });

const StoreItemUpload = mongoose.model('StoreItemUpload', storeItemUploadSchema);

module.exports.MakesModels = MakesModels;
module.exports.MakesModelsTest = MakesModelsTest;
module.exports.ContactRequests = ContactRequests;
module.exports.Users = Users;
module.exports.ProductUploads = ProductUploads;
module.exports.StoreItemUpload = StoreItemUpload;

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


