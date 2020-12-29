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
// Agreements from harp and merch sellers
const agreementsSchema = new mongoose.Schema({
    seller: {type: String},
    sellerId: String,
    startdate: String,
    fee: String,
    minimum: String,
    scheduletext: String
},{ versionKey: false, timestamps: true });

const Agreements = mongoose.model('Agreements', agreementsSchema);


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
module.exports.ProductUploads = ProductUploads;
module.exports.StoreItemUpload = StoreItemUpload;
module.exports.Agreements = Agreements;
