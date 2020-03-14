const { productMakesModels } = require('../assets/constants/makerArray');

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
    //helps find nested object keys
    const leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow

    let productKeys = [];

    const makers = Object.keys(productMakesModels)
    makers.map(maker => {
        productKeys.push(...Object.keys(leaf(productMakesModels, maker)));
    });
    productKeys = new Set(productKeys);
    return productKeys;
}
exports.findModel = (title) => {
    let productModel;
    const productKeys = Array.from(getModelList());
    // console.log(productKeys);
    
    if (title) {
        productKeys.map((model) => {
            if (title.indexOf(model)>-1) {
                productModel = model;
            } 
        });
    } else {
        console.log('no title')
    }
    return productModel;
}