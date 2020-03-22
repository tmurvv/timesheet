const axios = require('axios');
const cheerio = require('cheerio');
const { SellerPaths } = require('./SellerPaths');

exports.SellerLinkPaths = class SellerLinkPaths extends SellerPaths {
    constructor(name, productsUrl, mainPathId, titleFn, customFns,
                    linkUrlFn, mainPathIdLink, titleLinkFn, longDescLinkFn) {
        super(name, productsUrl, mainPathId, titleFn, customFns)
        this.linkUrlFn = linkUrlFn;
        this.mainPathIdLink = mainPathIdLink;
        this.titleLinkFn = titleLinkFn;
        this.longDescLinkFn = longDescLinkFn;
    }
    parseStoreSecondaryInfo(seller, data) {
        const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;  
        const $ = cheerio.load(html);   
        const thisProduct = $('.ProductMain');
        
        const productTitle = seller.hasOwnProperty('productTitleLinkFn') ? seller.productTitleLinkFn($, thisProduct) : '';
        //console.log('title secondary:', productTitle);
        const productPrice = seller.hasOwnProperty('productPriceLinkFn') ? seller.productPriceLinkFn($, thisProduct) : '';
        //console.log('price secondary:', productPrice);
        const productShortDesc = seller.hasOwnProperty('productShortDescLinkFn') ? seller.productShortDescLinkFn($, thisProduct) : '';
        //console.log( 'short desc secondary:', productShortDesc);
        const productLongDesc = seller.hasOwnProperty('longDescLinkFn') ? seller.longDescLinkFn($, thisProduct) : '';
        
        const longProductImageUrl = seller.hasOwnProperty('longProductImageUrlLinkFn') ? seller.longProductImageUrlLinkFn($, thisProduct) : '';
        //console.log( 'longProductImageUrl secondary:', longProductImageUrl);
        const product = {
            // productTitle,
            // productShortDesc,
            // productPrice,
            productLongDesc,
            // longProductImageUrl
        }
        // console.log('pasre sec product', product) 
        return product;
    }
    async linkFn(seller, url) {
        console.log(url)
        try {
            const response = await axios(url);
            // console.log('secondary response', response.data)
            // return "linkFun return"
            return this.parseStoreSecondaryInfo(seller, response.data); 
        } catch (err) {
            console.log(url, 'timed out', err.message);
        }           
    }
}



// Harp Connection
// axios(sellerArray[0].sellerUrl)
//     .then(response => {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         const productTable = $('.plusplus');
//         productTable.each(function (item) {
//             const id=uuid();
//             const seller = sellerArray[0].sellerName;
//             const productTitle = $(this).find('h3').text().trim();
//             console.log('productTitle:', productTitle); //returns "productTitle: The Greatest Product Ever"
//             const productTitleFn = sellerArray[0].productTitleFn($, this);           
//             console.log('productTitleFunc:', productTitleFn); //returns "productTitleFunc: "
//         });       
//     })
//     .catch(console.error);
// const sellerArray = [
//     {   
//         sellerUrl: 'https://www.harpconnection.com/harpstore/harp-UsedHarps.html',
//         sellerName: 'Harp Connection',
//         productTitleFn: ($) => $(this).find('h3').text().trim(),       
//     }
// ]

// function parseHarpInfo(seller, data) {
    
// }

// // Harp Connection
// axios(sellerArray[0].sellerUrl)
//     .then(response => {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         const productTable = $('.plusplus');
//         productTable.each(function () {
//             const id=uuid();
//             const seller = sellerArray[0].sellerName;
//             const sellerCountry = 'Eastern USA';
//             const harpTitle = sellerArray[0].productTitleFn($);
//             const harpShortDesc = $(this).parent().parent().find('p').first().text();
//             const harpPrice = $(this).parent().parent().find('.THCsmall').text();
//             const harpLongDesc = $(this).parent().parent().find('p:nth-child(2)').text();
//             const longHarpImageUrl = `https://www.harpconnection.com${$(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().find('.THCHarpImage').attr('src')}`;
//             const harpImageUrl = shortFileName(longHarpImageUrl);

//             downloadImage(longHarpImageUrl, harpImageUrl);
//             mainProductList.push({
//                 id,
//                 seller,
//                 sellerCountry,
//                 harpTitle,
//                 harpShortDesc,
//                 harpPrice,
//                 harpLongDesc,
//                 harpImageUrl,
//                 divider: 'OOOOOOOOOOOOOOOOOOOOOO'
//             });
//         });       
//     })
//     .catch(console.error);

// //Atlanta Harp Center .Odd class
// url = "https://stores.atlantaharpcenter.com/pre-owned-lever-harps/"
// axios(url)
//     .then(response => {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         const usedHarpTable = $('.Odd');

//         usedHarpTable.each(function () {
//             const id=uuid();
//             const seller = 'Atlanta Harp Center';
//             const sellerCountry = 'Eastern USA';
//             const harpTitle = $(this).find('.ProductDetails').text();
//             const harpShortDesc = "Short Description not available.";
//             const harpPrice = $(this).find('.ProductPriceRating').find('em').text().trim();
//             const harpLongDesc = "Long Description not available";
//             const longHarpImageUrl = $(this).find('img').attr('src');
//             const harpImageUrl = shortFileName(longHarpImageUrl);
//             downloadImage(longHarpImageUrl, harpImageUrl);

//             mainProductList.push({
//                 id,
//                 seller,
//                 sellerCountry,
//                 harpTitle,
//                 harpShortDesc,
//                 harpPrice,
//                 harpLongDesc,
//                 harpImageUrl,
//                 divider: 'OOOOOOOOOOOOOOOOOOOOOOOOO'
//             });
//         });       
//     })
//     .catch(console.error);

// //Atlanta Harp Center .Even class
// url = "https://stores.atlantaharpcenter.com/pre-owned-lever-harps/"
// axios(url)
//     .then(response => {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         const usedHarpTable = $('.Even');

//         usedHarpTable.each(function () {
//             const id=uuid();
//             const seller = 'Atlanta Harp Center';
//             const sellerCountry = 'Eastern USA';
//             const harpTitle = $(this).find('.ProductDetails').text().trim();
//             const harpShortDesc = "Short Description not available.";
//             const harpPrice = $(this).find('.ProductPriceRating').find('em').text();
//             const harpLongDesc = "Long Description not available";
//             const longHarpImageUrl = $(this).find('img').attr('src');
//             const harpImageUrl = shortFileName(longHarpImageUrl);
//             downloadImage(longHarpImageUrl, harpImageUrl);
            
//             mainProductList.push({
//                 id,
//                 seller,
//                 sellerCountry,
//                 harpTitle,
//                 harpShortDesc,
//                 harpPrice,
//                 harpLongDesc,
//                 harpImageUrl,
//                 divider: 'OOOOOOOOOOOOOOOOOOOOOOOOO'
//             });
//         });       
//     })
//     .catch(console.error);

// //Tisha Murvihill Harp Services
// mainProductList.push({
//     id: uuid(),
//     seller: "Tisha Murvihill Harp Services",
//     sellerCountry: "Canada",
//     harpTitle: 'Sierra 36 by Triplett',
//     harpShortDesc: 'Purchased 2011 Maple',
//     harpPrice: '$4300',
//     harpLongDesc: 'Excellent condition, lightly used, beautiful Triplett sound. This one is a winner!',
//     harpImageUrl: 'triplettSierra36Maple.jpg',
//     divider: 'OOOOOOOOOOOOOOOOOOOOOOO'
// });


// const sellerArray = [
//     {   
//         sellerID: uuid(),
//         sellerName: 'Harp Connection',
//         sellerUrl: 'https://www.harpconnection.com/harpstore/harp-UsedHarps.html',
//         sellerCountry: 'Eastern USA',
//         sellerArrayIdentifier: '.plusplus',
//         harpTitle: $(this).find('h3').text().trim(),
//         harpShortDesc: "$(this).parent().parent().find('p').first().text()",
//         harpPrice: "$(this).parent().parent().find('.THCsmall').text()",
//         harpLongDesc: "$(this).parent().parent().find('p:nth-child(2)').text()",
//         longHarpImageUrl: "https://www.harpconnection.com${$(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().find('.THCHarpImage').attr('src')}",
//         shortHarpImageUrl: "shortFileName(longHarpImageUrl)",
//     }
// ]

// function parseStoreInfo(seller, data) {
//     const $ = cheerio.load(data);
//     const usedHarpTable = $('.plusplus');
    
//     usedHarpTable.map(item => {
//         const id=uuid();
//         const sellerName = seller.sellerName;
//         const harpTitle = seller.harpTitle; 
    
//         mainProductList.push({
//             id,
//             sellerName,
//             harpTitle
//         });
//     });
// }

// sellerArray.map(seller => axios(url)
//     .then(response => {
//         parseHarpInfo(seller, response.data);      
//     })
//     .catch(console.error));

const sellerArray = [
    {   
        sellerUrl: 'https://www.harpconnection.com/harpstore/harp-UsedHarps.html',
        sellerName: 'Harp Connection',
        productTitleFn: function($,item) { return $(item).find('h3').text().trim(); }     
    }
];

axios(sellerArray[0].sellerUrl)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const productTable = $('.plusplus');
        productTable.each(item => {
            const id=uuid();
            const seller = sellerArray[0].sellerName;
            const productTitle = $(item).find('h3').text().trim();
            console.log('productTitle:', productTitle); //returns "productTitle: The Greatest Product Ever"
            const productTitleFnResult = sellerArray[0].productTitleFn($,item); 
            console.log('here')          
            console.log('productTitleFunc:', productTitleFnResult); //returns "productTitleFunc: "
        });       
    })
    .catch(console.error);