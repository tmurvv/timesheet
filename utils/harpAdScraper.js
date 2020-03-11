const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');
const { downloadImage } = require('../utils/downloadWebSiteImages.js');
const { shortFileNameFn } = require('./helpers.js');

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
            // if (seller.hasOwnProperty('specialFileNameFn')) longProductImageUrl = console.log('imin');
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
            
            const shortProductImageUrl = shortFileNameFn(longProductImageUrl);
            const product = {
                id,
                sellerName: seller.sellerName,
                sellerCountry: seller.sellerCountry,
                sellerRegion: seller.sellerRegion,
                productTitle,
                productShortDesc,
                productPrice,
                productLongDesc,
                shortProductImageUrl,
                divider: '00000000000000000000000'
            }
            usedHarpsNorthAmerica.push(product);
            
            // fs.writeFile('assets/constants/usedHarpList.json', JSON.stringify(usedHarpsNorthAmerica), function (err) {
            //     if (err) throw err;
            //     console.log('Saved!');
            // });
            
            downloadImage(longProductImageUrl, shortProductImageUrl);
        });         
    }
    
    sellerArray.map(async seller => {
        const response = await axios(seller.sellerUrl);
        parseStoreInfo(seller, response.data);
    });
    fs.writeFile('./assets/constants/usedHarpList.json', JSON.stringify(usedHarpsNorthAmerica), function (err) {
        if (err) console.log(err);
        console.log('Saved!');
    });         
}

module.exports = scrapeHarps;