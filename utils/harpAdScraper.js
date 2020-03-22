const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');

const sellerArrayObject = require('../assets/constants/sellers');
const { downloadImage } = require('../utils/downloadWebSiteImages.js');
const { 
    shortFileNameFn, 
    checkBadImages, 
    getMakeModelTypeSize,
    linkFn,
    cleanText, 
    leaf,
 } = require('./helpers.js');

let mainProductList = [];

const parseStoreInfo = async (seller, data) => {
    const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;
    // console.log('html', html)  
    const $ = cheerio.load(html);
    const productTable = $(seller.mainPathId);
    console.log('Seller', seller.name)
    console.log('# of Products:', productTable.length);
    productTable.each(async function (item) {
        const id=uuid();
        let productTitle = seller.hasOwnProperty('titleFn')&&seller.titleFn ? cleanText(seller.titleFn($, this)) : '';
        // console.log('product title:', productTitle);
        let productPrice = seller.hasOwnProperty('priceFn')&&seller.priceFn ? seller.priceFn($, this) : '';
        // console.log('price primary:', productPrice);
        let productShortDesc = seller.hasOwnProperty('shortDescFn')&&seller.shortDescFn ? cleanText(seller.shortDescFn($, this)) : '';
        // console.log( 'short desc primary:', productShortDesc);
        let productLongDesc = seller.hasOwnProperty('longDescFn')&&seller.longDescFn ? cleanText(seller.longDescFn($, this)) : '';
        // console.log( 'Long desc primary:', productLongDesc);
        let productImageUrl = seller.hasOwnProperty('imageUrlFn')&&seller.imageUrlFn ? seller.imageUrlFn($, this) : '';
        // console.log( 'longProductImageUrl primary:', longProductImageUrl);
        if (seller.hasOwnProperty('findLinkUrlFn')&&seller.findLinkUrlFn) {  
            const secondaryUrl = seller.findLinkUrlFn($, this);
            const secondaryUrlData = await linkFn(seller, secondaryUrl);
            if (secondaryUrlData) {
                // console.log('imin secondary url', secondaryUrlData)
                if (!productTitle && secondaryUrlData.productTitle) productTitle = cleanText(secondaryUrlData.productTitle);
                if (!productShortDesc && secondaryUrlData.productShortDesc) productShortDesc = cleanText(secondaryUrlData.productShortDesc);
                if (!productPrice && secondaryUrlData.productPrice) productPrice = secondaryUrlData.productPrice;
                if (!productLongDesc && secondaryUrlData.productLongDesc) productLongDesc = cleanText(secondaryUrlData.productLongDesc);
                if (!productImageUrl && secondaryUrlData.productImageUrl) productImageUrl = secondaryUrlData.productImageUrl;
            }          
        }

        const makeModelTypeSize = getMakeModelTypeSize(productTitle);
        // console.log('details', makeModelTypeSize);
        
        let shortProductImageUrl;
        if (seller.hasOwnProperty('badImages') && productModel) {
            if (checkBadImages(productModel, seller.badImages)) shortProductImageUrl = checkBadImages(productModel, seller.badImages);
        }
        
        if (!shortProductImageUrl) shortProductImageUrl = shortFileNameFn(productImageUrl);
        if (shortProductImageUrl && !shortProductImageUrl.includes("STOCK")) downloadImage(productImageUrl, shortProductImageUrl)
        productImageUrl = seller.hasOwnProperty('imageFromWebCustom')?productImageUrl:`https://findaharp-api-development.herokuapp.com/assets/img/${shortProductImageUrl}`;
        
        let product = {
            id,
            sellerName: seller.name,
            sellerCountry: seller.country,
            sellerRegion: seller.region,
            productTitle,
            productPrice,
            productShortDesc,               
            productLongDesc,
            productMaker: makeModelTypeSize[0],
            productModel: makeModelTypeSize[1],
            productType: makeModelTypeSize[2],
            productSize: makeModelTypeSize[3],
            productImageUrl,
            divider: '00000000000000000000000'
        }
        /***********
         * custom Functions
         ***********/
        if (seller.hasOwnProperty('customFns') && seller.customFns) {
            seller.customFns.map(customFuncString => {
                try {
                    customFunc = leaf(seller, customFuncString);
                    product = customFunc(product);
                } catch (err) {
                    console.log('From custom functions:', err.message)
                }              
            });
        }
        if (makeModelTypeSize[1]) mainProductList.push(product);
        // console.log('scraper usedHarpsNA', mainProductList);
        fs.writeFile('assets/constants/usedHarpList.json', JSON.stringify(mainProductList), function (err) {
            if (err) throw err;
            // console.log('Saved!');
        });
               
        return mainProductList;
    });         
}

exports.scrapeAds = async () => {
    mainProductList = [];
    const sellerArray = sellerArrayObject.sellerArray;

    sellerArray.map(async seller => {
        const response = await axios(seller.productsUrl);
        parseStoreInfo(seller, response.data);
    });
};
