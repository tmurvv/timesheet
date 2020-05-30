const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios');
const AppError = require('../AppError');

/**
 * Traverses an object parsing out an object from the next levelfrom maker/model JSON-style object
 * @function catchAsync
 * @param {req} Object Standard request/response params
 * @param {res} Object Standard request/response params
 * @param {next} Function Standard request/response params
 * @returns {Error} - Return errors for async functions
 */
exports.catchAsync = fn => {
    return (req,res,next) => fn(req,res,next).catch(next);
}
/**
 * Traverses an object parsing out an object from the next levelfrom maker/model JSON-style object
 * @function leaf
 * @param {Object} makesModels JSON-style object of product makers with models
 * @returns {Set} - Set of Models
 */
const leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow

/**
 * When scraping products, does a second Axios call if seller uses secondary page
 * @function linkFn  
 * @param {Object} seller - seller info
 * @param {Object} url - url for secondary page
 * @returns {Cheerio Object} - HTML of secondary page
 */
exports.linkFn = async (seller, url) => {
    try {
        if (!seller) throw new AppError('from linkFn: missing seller parameter');
        if (!url) throw new AppError('from linkFn: missing url parameter');
    } catch(err) {
        throw(err);
    }
    try {   
        const response = await axios(url);  
        return parseStoreSecondaryInfo(seller, response.data);    
    } catch (err) {
        console.log(url, 'from linkFn: timed out', err.message);
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
    if (!text) return;
    // if (!text) throw new AppError('from cleanText: missing text parameter');
        
    return text.replace(/\/n/g, '').replace(/\/t/g, '').replace(/Add To Cart/gi, '').replace(/AddToCart/gi, '').replace(/\s/g, ' ').replace(/  +/g, ' ');
}
/**
 * Removes url encodes and trims text
 * @function cleanUrlText 
 * @param {string} text - url to clean
 * @returns {string} - clean url
 */
const cleanUrlText = (text) => {
    if (!text) throw new AppError('from cleanUrlText: missing text parameter');
    let protocolDir;
    if (path.parse(text).dir.trim().length>0) protocolDir=`${(path.parse(text).dir).trim()}/`;
    let urlNoExt = 
        path.basename(text)
        .substring(0,path.basename(text)
        .length-path.extname(text).length)
    ;
    urlNoExt = urlNoExt
        .replace(/\./g,'_')
        .replace(/%20/g, '_')
        .replace(/%25/g, '_')
        .replace(/%/g, '_')
        .trim()
    ;
    if (protocolDir) return `${protocolDir}${urlNoExt}${path.extname(text).trim()}`;
    return `${urlNoExt}${path.extname(text).trim()}`
}
/**
 * Recursive function that gets the filename from a long url string
 * @function shortFileNameFn 
 * @param {string} longUrlPath 
 * @returns {string} - filename
 */
exports.shortFileNameFn = (longUrlPath) => {
    if (!longUrlPath) throw new AppError('from shortFileNameFn: missing longUrlPath parameter');
    
    //remove possible url querystring
    if (longUrlPath.lastIndexOf('?')>-1) longUrlPath=longUrlPath.substring(0,longUrlPath.lastIndexOf('?'));
        
    //recursively remove the section after the last '/' until a valid filename occurs
    const idx = longUrlPath.lastIndexOf('/');
    if (/^(?=[\S])[^\\ \/ : * ? " < > | ]+$/.test(longUrlPath.substring(idx + 1))) {         
        const returnThis = cleanUrlText(longUrlPath.substring(idx + 1));
        return returnThis;
    }
    //if name not yet valid, remove last section and call function again
    longUrlPath = longUrlPath.substring(0, idx);
    
    return this.shortFileNameFn(longUrlPath);  
};
/**
 * Checks if stock images need to be used because of bad or missing images from store
 * @function checkBadImages 
 * @param {string} model 
 * @param {Array} list of models that need stock photos (comes from seller info)
 * @returns {string} - filename
 */
exports.checkBadImages = (model, badImages) => {
    if (!model) throw new AppError('from checkBadImages: missing model parameter');
    if (!badImages) throw new AppError('from checkBadImages: missing badImages parameter');

    let stockImageUrl;
    badImages.map(badImage => {
        if (model === badImage) stockImageUrl = `${badImage}STOCK.jpg`.replace(' ','');
    });
    
    return stockImageUrl;
}
/**
 * Parses information from a secondary linked page on a vendor website
 * @function parseStoreSecondaryInfo 
 * @param {Object} - seller info
 * @param {Cheerio Object} - page html
 * @returns {Object} - Product information
 */
const parseStoreSecondaryInfo = (seller, data) => {
    if (!seller) throw new AppError('from parseStoreSecondaryInfo: missing seller parameter');
    if (!data) throw new AppError('from parseStoreSecondaryInfo: missing data parameter');

    const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;  
    const $ = cheerio.load(html);   
    const thisProduct = $(seller.mainPathIdLink);
    /* istanbul ignore next */
    const productTitle = seller.hasOwnProperty('titleLinkFn')&&seller.titleLinkFn ? seller.titleLinkFn($, thisProduct) : '';
    /* istanbul ignore next */
    const productPrice = seller.hasOwnProperty('priceLinkFn')&&seller.priceLinkFn ? seller.priceLinkFn($, thisProduct) : '';
    /* istanbul ignore next */
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

exports.leaf = leaf;
exports.parseStoreSecondaryInfo = parseStoreSecondaryInfo;
exports.cleanUrlText = cleanUrlText;
