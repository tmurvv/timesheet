const cheerio = require('cheerio');
const axios = require('axios');

//#region helper functions for helper functions
//leaf function helps find nested object keys,
exports.leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
//#endregion
//#region Helper Functions
exports.linkFn = async (seller, url) => {
    try {
        const response = await axios(url);        
        return parseStoreSecondaryInfo(seller, response.data);    
    } catch (err) {
        console.log(url, 'timed out', err.message);
    }           
}
exports.cleanText = (text) => {
    return text
        .replace(/\/n/g, '')
        .replace(/\/t/g, '')
        .replace(/\\n/g, '')
        .replace(/\\t/g, '')
        .replace(/\\/g, '')
        .replace(/\/n/g, ' ')
        .replace(/\/t/g, '')
        .replace(/Add To Cart/g, '')
        .trim();
}
exports.cleanUrlText = (text) => {
    return text
        .replace(/\/n/g, '')
        .replace(/\/t/g, '')
        .replace(/\\n/g, '')
        .replace(/\\t/g, '')
        .replace(/\\/g, '')
        .replace(/\/n/g, ' ')
        .replace(/\/t/g, '')
        .replace(/Add To Cart/g, '')
        .trim();
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
//#endregion

//#region Helper functions for images
exports.checkBadImages = (model, badImages) => {
    let stockUrl;
    badImages.map(badImage => {
        if (model === badImage) stockUrl = `${badImage}STOCK.jpg`.replace(' ','');
    });
    
    return stockUrl;
}
//#endregion

//#region Main Functions parse Secondary
    //for parse store info function if secondary link
    function parseStoreSecondaryInfo(seller, data) {
        const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;  
        const $ = cheerio.load(html);   
        const thisProduct = $(seller.mainPathIdLink);
        
        const productTitle = seller.hasOwnProperty('titleLinkFn')&&seller.titleLinkFn ? seller.titleLinkFn($, thisProduct) : '';
        const productPrice = seller.hasOwnProperty('priceLinkFn')&&seller.priceLinkFn ? seller.priceLinkFn($, thisProduct) : '';
        const productShortDesc = seller.hasOwnProperty('shortDescLinkFn')&&seller.shortDescLinkFn ? seller.shortDescLinkFn($, thisProduct) : '';
        const productLongDesc = seller.hasOwnProperty('longDescLinkFn')&&seller.longDescLinkFn ? seller.longDescLinkFn($, thisProduct) : '';
        const productImageUrl = seller.hasOwnProperty('imageUrlLinkFn')&&seller.imageUrlLinkFn ? seller.imageUrlLinkFn($, thisProduct) : '';
        
        const product = {
            productTitle,
            productShortDesc,
            productPrice,
            productLongDesc,
            productImageUrl
        }
        
        return product;
    }
//#endregion
