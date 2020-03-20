const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');
const { downloadImage } = require('../utils/downloadWebSiteImages.js');
const { shortFileNameFn, checkBadImages, findMaker, findModel, findProductType, findProductSize, leaf } = require('./helpers.js');

// const sellerArrayObject = require('../assets/constants/sellerArray');
// const sellerArray = sellerArrayObject.sellerArray;
const sellerArrayObject = require('../assets/constants/sellers');
const sellerArray = sellerArrayObject.sellerArray;
//const { SellerPaths } = require('../assets/classes/SellerPaths');
//const { SellerLinkPaths } = require('../assets/classes/SellerLinkPaths');

console.log('scrpaer', sellerArray)

// const { Seller } = require('../assets/classes/Seller');
//-----
// const VanderbiltMusic_e = new SellerLinkPaths(
//         'Vanderbilt', //name
//         'https://vanderbiltmusic.com/harp-sales/used-harps/', //productsurl
//         '.Even', //mainPathId
//         ($, item) => $(item).find('a').text().trim(), //titleFn
//         ['longDescLinkCustomFn'], //customFns
//         ($, item) => $(item).find('.ProductDetails').find('a').attr('href'), //link url fn
//         '.ProductMain', //mainPathIdLink
//         '', //titlelinkfn
//         ($, item) => $(item).find('.prodAccordionContent').text() //long desc link fn
//     );
// VanderbiltMusic_e.longDescLinkCustomFn = (product) => {
//     let productLongDesc = product.productLongDesc;
//     productLongDesc = productLongDesc.replace(/\n/g,'').replace(/\t/g,'');
//     if (productLongDesc.indexOf('HarpsNew') > -1) productLongDesc = productLongDesc.substring(0,productLongDesc.indexOf('HarpsNew')).replace('  ', ' ');
//     if (productLongDesc.indexOf('HarpsUsed') > -1) productLongDesc = productLongDesc.substring(0,productLongDesc.indexOf('HarpsUsed')).replace('  ', ' ');
//     // console.log('custom',productLongDesc)
//     return {...product, productLongDesc }
// }
// // -----
// const HarpConnection = new SellerPaths(
//         'Harp Connection', //name
//         'https://www.harpconnection.com/harpstore/harp-UsedHarps.html', //products Url
//         '.plusplus', //mainPathId
//         ($, item) => $(item).find('h3').text().trim(), //titleFn
//         '' //custom Fns
//     );
// console.log(VanderbiltMusic_e);
// sellerArray.push(VanderbiltMusic_e, HarpConnection);

const scrapeHarps = async () => {
    const usedHarpsNorthAmerica = [];
    function parseStoreInfo(seller, data) {  
        const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;
        // console.log('html', html)  
        const $ = cheerio.load(html);
        const productTable = $(seller.mainPathId);
        console.log('scrapeHarps seler', seller.name)
        console.log(productTable.length);
        productTable.each(async function (item) {
            const id=uuid();
            let productTitle = seller.hasOwnProperty('titleFn')&&seller.titleFn ? seller.titleFn($, this) : '';
            // console.log('product title:', productTitle);
            let productPrice = seller.hasOwnProperty('priceFn')&&seller.priceFn ? seller.priceFn($, this) : '';
            // console.log('price primary:', productPrice);
            let productShortDesc = seller.hasOwnProperty('shortDescFn')&&seller.shortDescFn ? seller.shortDescFn($, this) : '';
            // console.log( 'short desc primary:', productShortDesc);
            let productLongDesc = seller.hasOwnProperty('longDescFn')&&seller.longDescFn ? seller.longDescFn($, this) : '';
            // console.log( 'Long desc primary:', productLongDesc);
            let productImageUrl = seller.hasOwnProperty('imageUrlFn') ? seller.imageUrlFn($, this) : '';
            // if (seller.hasOwnProperty('specialFileNameFn')) longProductImageUrl = seller.specialFileNameFn(longProductImageUrl);
            // // console.log( 'longProductImageUrl primary:', longProductImageUrl);
            if (typeof seller.linkFn === 'function') {          
                const secondaryUrl = seller.findLinkUrlFn($, this);
                const secondaryUrlData = await seller.linkFn(seller, secondaryUrl);
                if (secondaryUrlData) {
                // console.log('imin secondary url', secondaryUrlData)
                if (!productTitle && secondaryUrlData.productTitle) productTitle = secondaryUrlData.productTitle;
                if (!productShortDesc && secondaryUrlData.productShortDesc) productShortDesc = secondaryUrlData.productShortDesc;
                if (!productPrice && secondaryUrlData.productPrice) productPrice = secondaryUrlData.productPrice;
                if (!productLongDesc && secondaryUrlData.productLongDesc) productLongDesc = secondaryUrlData.productLongDesc;
            //         if (!longProductImageUrl && secondaryUrlData.longProductImageUrl) longProductImageUrl = secondaryUrlData.longProductImageUrl;
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
            // if (seller.hasOwnProperty('badImages') && productModel) {
            //     if (checkBadImages(productModel, seller.badImages)) shortProductImageUrl = checkBadImages(productModel, seller.badImages);
            // }
            if (!shortProductImageUrl) shortProductImageUrl = shortFileNameFn(productImageUrl);
            productImageUrl = seller.hasOwnProperty('imageFromWeb')?productImageUrl:`https://onestop-api-staging.herokuapp.com/assets/img/${shortProductImageUrl}`;

            
                
            // {
            //         customFns.map(sellerFunc => leaf(seller, longDescLinkCustomFn))
            //     //     customFns.map(customFn => customFn[1](customFn[0]))
            //     // productLongDesc = seller.formatLongDescLink(productLongDesc);
            // }
            
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
                    customFunc = leaf(seller, customFuncString);
                    //console.log('cust fn', productLongDesc)
                    return product = customFunc(product);
                    // console.log('maybe', customFunc(productLongDesc));
                });
            }
            // if (productModel) usedHarpsNorthAmerica.push(product);
            usedHarpsNorthAmerica.push(product);
            console.log('scraper usedHarpsNA', usedHarpsNorthAmerica);
            fs.writeFile('assets/constants/usedHarpList.json', JSON.stringify(usedHarpsNorthAmerica), function (err) {
                if (err) throw err;
                // console.log('Saved!');
            });
            
            // if (shortProductImageUrl && !shortProductImageUrl.includes("STOCK")) downloadImage(longProductImageUrl, shortProductImageUrl);
        });         
    }
    
    sellerArray.map(async seller => {
        const response = await axios(seller.productsUrl);
        // console.log('sellarmap responste data', response.data)
        parseStoreInfo(seller, response.data);
    });        
}

module.exports = scrapeHarps;