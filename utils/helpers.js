const { productMakesModels } = require('../assets/constants/makerArray');

/*********
 * helper functions for helper functions
 *********/
//leaf function helps find nested object keys,
exports.leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow

/***********
 * helper functions
 ***********/

exports.shortFileNameFn = (longFilePath) => {
    if (longFilePath) {
        //remove possible url querystring
        if (longFilePath.lastIndexOf('?')>-1) longFilePath=longFilePath.substring(0,longFilePath.lastIndexOf('?'));
            
        //recursively remove the section after the last '/' until a valid filename occurs
        const idx = longFilePath.lastIndexOf('/');
        if (/^(?=[\S])[^\\ \/ : * ? " < > | ]+$/.test(longFilePath.substring(idx + 1))) {         
            const returnThis = longFilePath.substring(idx + 1);
            return returnThis;
        }
        //if name not yet valid, remove last section and call function again
        longFilePath = longFilePath.substring(0, idx);
        return this.shortFileNameFn(longFilePath);
    } 
};

exports.sellerSort = () => sellerArray.sort(function(a, b) {
    var nameA = a.sellerName.toUpperCase(); // ignore upper and lowercase
    var nameB = b.sellerName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
       return 1;
    }
  
    // names must be equal
    return 0;
});
exports.findMaker = (title) => {
    let productMaker;
    const productKeys = Object.keys(productMakesModels);
    if (title) {
        productKeys.map((maker) => {
            if (title.indexOf(maker)>-1) {
                productMaker = maker;
            } 
        });
    } else {
        console.log('no title')
    }
    return productMaker;
}
function getModelList() {
    //leaf function helps find nested object keys,
    const leafHelper = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow

    const productKeys = [];

    Object.keys(productMakesModels).map(maker => {
        productKeys.push(...Object.keys(leafHelper(productMakesModels, maker)));
    });

    return new Set(productKeys);
}
exports.findModel = (title) => {
    if (!title) return 'no model found';
    let productModel;
    
    Array.from(getModelList()).map((model) => {
        if (title.indexOf(model)>-1) {
            productModel = model;
        } 
    });
    return productModel;
}

exports.findProductType = ((maker, model) =>{
    //leaf function helps find nested object keys,
    const leafHelper = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow

    if (!model||!maker) return 'no model found';
   
    const makerHarps = leafHelper(productMakesModels, maker);
    if (leafHelper(makerHarps, model)&&leafHelper(makerHarps, model).harptype) {
        return leafHelper(makerHarps, model).harptype;
    } else {
        return 'harp type not found';
    }
});
exports.findProductSize = ((maker, model) =>{
    //leaf function helps find nested object keys,
    const leafHelper = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow

    if (!maker||!model) return 'no model found';
   
    const makerHarps = leafHelper(productMakesModels, maker);
    if (leafHelper(makerHarps, model)&&leafHelper(makerHarps, model).strings) {
        return leafHelper(makerHarps, model).strings;
    } else {
        return 'harp size not found';
    }
});

exports.checkBadImages = (model, badImages) => {
    let stockUrl;
    badImages.map(badImage => {
        if (model === badImage) stockUrl = `${badImage}STOCK.jpg`.replace(' ','');
    });
    
    return stockUrl;
}