const cheerio = require('cheerio');
const axios = require('axios');

/**
 * Traverses an object parsing out an object from the next levelfrom maker/model JSON-style object
 * @function leaf
 * @param {Object} makesModels JSON-style object of product makers with models
 * @returns {Set} - Set of Models
 */
exports.leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
//#region Helper Functions
/**
 * When scraping products, does a second Axios call if seller uses secondary page
 * @function linkFn  
 * @param {Object} seller - seller info
 * @param {Object} url - url for secondary page
 * @returns {Cheerio Object} - HTML of secondary page
 */
exports.linkFn = async (seller, url) => {
    try {
        if (!seller) throw 'from linkFn: missing seller parameter';
        if (!url) throw 'from linkFn: missing url parameter';
    } catch(err) {
        throw(err);
    }
    try {   
        const response = await axios(url);        
        return parseStoreSecondaryInfo(seller, response.data);    
    } catch (err) {
        console.log(url, 'timed out', err.message);
        throw (err)
    }      
}
/**
 * Removes /n/t\n\t 'Add to cart' and trims text
 * @function cleanText 
 * @param {string} text - text to clean
 * @returns {string} - clean text
 */
exports.cleanText = (text) => {
    if (!text) throw 'from cleanText: missing text parameter';
        
    return text.replace(/\/n/g, '').replace(/\/t/g, '').replace(/Add To Cart/gi, '').replace(/AddToCart/gi, '').replace(/\s/g, '');
}
/**
 * Removes url encodes and trims text
 * @function cleanUrlText 
 * @param {string} text - url to clean
 * @returns {string} - clean url
 */
exports.cleanUrlText = (text) => {
    if (!text) throw 'from cleanUrlText: missing text parameter';
    return text
        .replace(/%20/g, '_')
        .replace(/%25/g, '_')
        .replace(/%/g, '_')
        .trim();
}
/**
 * Recursive function that gets the filename from a long url string
 * @function shortFileNameFn 
 * @param {string} longUrlPath 
 * @returns {string} - filename
 */
exports.shortFileNameFn = (longUrlPath) => {
    if (longUrlPath) {
        //remove possible url querystring
        if (longUrlPath.lastIndexOf('?')>-1) longUrlPath=longUrlPath.substring(0,longUrlPath.lastIndexOf('?'));
            
        //recursively remove the section after the last '/' until a valid filename occurs
        const idx = longUrlPath.lastIndexOf('/');
        if (/^(?=[\S])[^\\ \/ : * ? " < > | ]+$/.test(longUrlPath.substring(idx + 1))) {         
            const returnThis = longUrlPath.substring(idx + 1);
            return returnThis;
        }
        //if name not yet valid, remove last section and call function again
        longUrlPath = longUrlPath.substring(0, idx);
        
        return this.shortFileNameFn(longUrlPath);
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
