const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');
const { downloadImage } = require('../utils/downloadWebSiteImages.js');
const { shortFileNameFn, checkBadImages} = require('./helpers.js');

const sellerArrayObject = require('../assets/constants/sellerArray');
const sellerArray = sellerArrayObject.sellerArray;

const scrapeHarps = async () => {
    const usedHarpsNorthAmerica = [];
    function parseStoreInfo(seller, data) {  
        const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;  
        const $ = cheerio.load(html);
        const productTable = $(seller.sellerArrayIdentifier);
        console.log(seller.sellerName)
        console.log(productTable.length);
        productTable.each(async function (item) {
            const id=uuid();
            let productTitle = seller.hasOwnProperty('productTitleFn') ? seller.productTitleFn($, this) : '';
            // console.log('product title:', productTitle);
            let productPrice = seller.hasOwnProperty('productPriceFn') ? seller.productPriceFn($, this) : '';
            // console.log('price primary:', productPrice);
            let productShortDesc = seller.hasOwnProperty('productShortDescFn') ? seller.productShortDescFn($, this) : '';
            // console.log( 'short desc primary:', productShortDesc);
            let productLongDesc = seller.hasOwnProperty('productLongDescFn') ? seller.productLongDescFn($, this) : '';
            // console.log( 'Long desc primary:', productLongDesc);
            let longProductImageUrl = seller.hasOwnProperty('longProductImageUrlFn') ? seller.longProductImageUrlFn($, this) : '';
            if (seller.hasOwnProperty('specialFileNameFn')) longProductImageUrl = seller.specialFileNameFn(longProductImageUrl);
            // console.log( 'longProductImageUrl primary:', longProductImageUrl);
     
            if (seller.hasOwnProperty('sellerLinkUrlFn')) {
                const secondaryUrl = seller.sellerLinkUrlFn($, this);
                const secondaryUrlData = await seller.linkFn(seller, secondaryUrl);
                if (secondaryUrlData) {
                    if (!productTitle && secondaryUrlData.productTitle) productTitle = secondaryUrlData.productTitle;
                    if (!productShortDesc && secondaryUrlData.productShortDesc) productShortDesc = secondaryUrlData.productShortDesc;
                    if (!productPrice && secondaryUrlData.productPrice) productPrice = secondaryUrlData.productPrice;
                    if (!productLongDesc && secondaryUrlData.productLongDesc) productLongDesc = secondaryUrlData.productLongDesc;
                    if (!longProductImageUrl && secondaryUrlData.longProductImageUrl) longProductImageUrl = secondaryUrlData.longProductImageUrl;
                }          
            }
            
            // console.log('title:', productTitle);
            let productMaker = seller.productMakerFn(productTitle);
            // console.log('product maker:', productMaker);
            let productModel = seller.productModelFn(productTitle);
            // console.log('product model:', productModel);
            let productType = seller.hasOwnProperty('productTypeFn')?seller.productTypeFn(productMaker, productModel):'';
            // console.log('product Type:', productType);
            let productSize = seller.hasOwnProperty('productSizeFn')?seller.productSizeFn(productMaker, productModel):'';
            // console.log('product Type:', productType);
            let shortProductImageUrl;
            if (seller.hasOwnProperty('badImages') && productModel) {
                if (checkBadImages(productModel, seller.badImages)) shortProductImageUrl = checkBadImages(productModel, seller.badImages);
            }
            if (!shortProductImageUrl) shortProductImageUrl = shortFileNameFn(longProductImageUrl);
            const productImageUrl = seller.hasOwnProperty('imageFromWeb')?longProductImageUrl:`https://onestop-api-staging.herokuapp.com/assets/img/${shortProductImageUrl}`;

            const product = {
                id,
                sellerName: seller.sellerName,
                sellerCountry: seller.sellerCountry,
                sellerRegion: seller.sellerRegion,
                productTitle,
                productMaker,
                productModel,
                productType,
                productSize,
                productShortDesc,
                productPrice,
                productLongDesc,
                productImageUrl,
                divider: '00000000000000000000000'
            }
            if (productModel) usedHarpsNorthAmerica.push(product);
            // console.log('scraper', usedHarpsNorthAmerica);
            fs.writeFile('assets/constants/usedHarpList.json', JSON.stringify(usedHarpsNorthAmerica), function (err) {
                if (err) throw err;
                // console.log('Saved!');
            });
            
            if (shortProductImageUrl && !shortProductImageUrl.includes("STOCK")) downloadImage(longProductImageUrl, shortProductImageUrl);
        });         
    }
    
    sellerArray.map(async seller => {
        const response = await axios(seller.sellerUrl);
        parseStoreInfo(seller, response.data);
    });        
}

module.exports = scrapeHarps;