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
});

// Main Doc
const makesModelsSchema = new mongoose.Schema({
    sellerName: {
        type: String,
        required: [true, 'A product maker (manufacturer) name is required.']
    },
    sellerAliases: Array,
    
    // Array of subdocuments
    sellerProducts: [productSchema], 
});

const MakesModels = mongoose.model('MakesModels', makesModelsSchema);
// const MakesModels = mongoose.model('MakesModels', makesModelsSchema);
//console.log(MakesModels.find())
module.exports.MakesModels = MakesModels;
// module.exports.productSchema = productSchema;
// module.exports.makesModelsSchema = makesModelsSchema;

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


