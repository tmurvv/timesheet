const cheerio = require('cheerio');
const axios = require('axios');
const { productMakesModels } = require('../assets/constants/makerArray');

/*********
 * helper functions for helper functions
 *********/
//leaf function helps find nested object keys,
exports.leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow

//for parse store info function if secondary link
function parseStoreSecondaryInfo(seller, data) {
    const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;  
    const $ = cheerio.load(html);   
    const thisProduct = $(seller.mainPathIdLink);
    
    const productTitle = seller.hasOwnProperty('titleLinkFn')&&seller.titleLinkFn ? seller.titleLinkFn($, thisProduct) : '';
    //console.log('title secondary:', productTitle);
    const productPrice = seller.hasOwnProperty('priceLinkFn')&&seller.priceLinkFn ? seller.priceLinkFn($, thisProduct) : '';
    //console.log('price secondary:', productPrice);
    const productShortDesc = seller.hasOwnProperty('shortDescLinkFn')&&seller.shortDescLinkFn ? seller.shortDescLinkFn($, thisProduct) : '';
    //console.log( 'short desc secondary:', productShortDesc);
    const productLongDesc = seller.hasOwnProperty('longDescLinkFn')&&seller.longDescLinkFn ? seller.longDescLinkFn($, thisProduct) : '';
    const productImageUrl = seller.hasOwnProperty('imageUrlLinkFn') ? seller.imageUrlLinkFn($, thisProduct) : '';
    //console.log( 'longProductImageUrl secondary:', productImageUrl);
    const product = {
        productTitle,
        productShortDesc,
        productPrice,
        productLongDesc,
        productImageUrl
    }
    // console.log('pasre sec product', product) 
    return product;
}
//helperfor findModel function
function getModelList() {
    //leaf function helps find nested object keys,
    const leafHelper = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
    const productKeys = [];

    Object.keys(productMakesModels).map(maker => {
        productKeys.push(...Object.keys(leafHelper(productMakesModels, maker)));
    });

    return new Set(productKeys);
}

//helper of findMaker function in case maker name is spelled differently
function findOtherNames() {
    const leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
    const otherNames = [];
    
    Object.keys(productMakesModels).map(maker => {
        if (leaf(productMakesModels,maker).othernames) {
            otherNames.push([maker,[...leaf(productMakesModels,maker).othernames]]);
        }
    });   
    return otherNames;  
}

function checkOtherNames(title) {
    const othernames = findOtherNames();
    let foundName;
    if (othernames) {
        othernames.map(name => {
            // console.log(name)
            name[1].map(altName => {
                if (title.toUpperCase().indexOf(altName.toUpperCase()) > -1) foundName = name[0]; 
            });                     
        });
    } else {
        console.log("Other names not found.");
    }
    return foundName;
}

/***********
 * helper functions
 ***********/
exports.linkFn = async (seller, url) => {
    try {
        const response = await axios(url);        
        return parseStoreSecondaryInfo(seller, response.data);    
    } catch (err) {
        console.log(url, 'timed out', err.message);
    }           
}

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
    if (!productMaker) productMaker = checkOtherNames(title);
    
    console.log(productMaker);
    return productMaker;
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

exports.cleanText = (text) => {
    return text
        .replace(/\/n/g, '')
        .replace(/\/t/g, '')
        .replace(/\\n/g, '')
        .replace(/\\t/g, '')
        .trim();
}
