const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');
const { downloadImage } = require('../utils/downloadWebSiteImages.js');
const { 
    shortFileNameFn, 
    checkBadImages, 
    findMaker, 
    findModel, 
    findProductType, 
    findProductSize,
    linkFn,
    cleanText, 
    leaf,
 } = require('./helpers.js');

const sellerArrayObject = require('../assets/constants/sellers');
const sellerArray = sellerArrayObject.sellerArray;
const usedHarpsNorthAmerica = [];
const parseStoreInfo = async (seller, data) => {
    const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;
    // console.log('html', html)  
    const $ = cheerio.load(html);
    const productTable = $(seller.mainPathId);
    console.log('scrapeHarps seller', seller.name)
    console.log(productTable.length);
    productTable.each(async function (item) {
        const id=uuid();
        let productTitle = seller.hasOwnProperty('titleFn')&&seller.titleFn ? seller.titleFn($, this) : '';
        // console.log('product title:', productTitle);
        let productPrice = seller.hasOwnProperty('priceFn')&&seller.priceFn ? seller.priceFn($, this) : '';
        // console.log('price primary:', productPrice);
        let productShortDesc = seller.hasOwnProperty('shortDescFn')&&seller.shortDescFn ? seller.shortDescFn($, this) : '';
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
                if (!productTitle && secondaryUrlData.productTitle) productTitle = secondaryUrlData.productTitle;
                if (!productShortDesc && secondaryUrlData.productShortDesc) productShortDesc = secondaryUrlData.productShortDesc;
                if (!productPrice && secondaryUrlData.productPrice) productPrice = secondaryUrlData.productPrice;
                if (!productLongDesc && secondaryUrlData.productLongDesc) productLongDesc = cleanText(secondaryUrlData.productLongDesc);
                if (!productImageUrl && secondaryUrlData.productImageUrl) productImageUrl = secondaryUrlData.productImageUrl;
            }          
        }
        // console.log('title:', productTitle);
        let productMaker = findMaker(productTitle);
        // console.log('product maker:', productMaker);
        let productModel = findModel(productTitle);
        // console.log('product model:', productModel);
        let productType = findProductType(productMaker, productModel);
        // console.log('product Type:', productType);
        let productSize = findProductSize(productMaker, productModel);
        // console.log('product Type:', productType);
        // if (seller.hasOwnProperty('specialLongDescFn')) productLongDesc = seller.specialLongDescFn(productLongDesc);
        let shortProductImageUrl;
        if (seller.hasOwnProperty('badImages') && productModel) {
            if (checkBadImages(productModel, seller.badImages)) shortProductImageUrl = checkBadImages(productModel, seller.badImages);
        }
        if (!shortProductImageUrl) shortProductImageUrl = shortFileNameFn(productImageUrl);
        productImageUrl = seller.hasOwnProperty('imageFromWebCustom')?productImageUrl:`https://onestop-api-staging.herokuapp.com/assets/img/${shortProductImageUrl}`;
        
        let product = {
            id,
            sellerName: seller.name,
            sellerCountry: seller.country,
            sellerRegion: seller.region,
            productTitle,
            productPrice,
            productShortDesc,               
            productLongDesc,
            productMaker,
            productModel,
            productType,
            productSize,
            productImageUrl,
            // divider: '00000000000000000000000'
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
        if (productModel) usedHarpsNorthAmerica.push(product);
        // console.log('scraper usedHarpsNA', usedHarpsNorthAmerica);
        fs.writeFile('assets/constants/usedHarpList.json', JSON.stringify(usedHarpsNorthAmerica), function (err) {
            if (err) throw err;
            // console.log('Saved!');
        });
        if (shortProductImageUrl && !shortProductImageUrl.includes("STOCK")) downloadImage(productImageUrl, shortProductImageUrl);
        return usedHarpsNorthAmerica;
    });         
}

exports.scrapeAds = () => {
        sellerArray.map(async seller => {
        const response = await axios(seller.productsUrl);
        return parseStoreInfo(seller, response.data);
    });
};
