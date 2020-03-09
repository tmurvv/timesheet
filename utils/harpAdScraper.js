const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');
const { downloadImage } = require('../utils/downloadWebSiteImages.js');
const { shortFileName } = require('./helpers.js');

const usedHarpsNorthAmerica = [];
 
const sellerArray = [
    // {   
    //     sellerID: uuid(),
    //     sellerName: 'Harp Connection',
    //     sellerUrl: 'https://www.harpconnection.com/harpstore/harp-UsedHarps.html',
    //     sellerCountry: 'USA',
    //     sellerRegion: 'Eastern',
    //     sellerParentIdentifier: '.ty-price-num',
    //     productTitleFn: ($, item) => $(item).find('h3').text().trim(), 
    //     productShortDescFn: ($, item) => $(item).parent().parent().find('p').first().text().trim(),
    //     productPriceFn: ($, item) => $(item).parent().parent().find('.THCsmall').text().trim(),
    //     productLongDescFn: ($, item) => $(item).parent().parent().find('p:nth-child(2)').text().trim(),
    //     longProductImageUrlFn: ($, item) => `https://www.harpconnection.com${$(item).parent().parent().parent().parent().parent().parent().parent().parent().parent().find('.THCHarpImage').attr('src')}`,
    // },
    // {   
    //     sellerID: uuid(),
    //     sellerName: 'Atlanta Harp Centre-o',
    //     sellerUrl: 'https://stores.atlantaharpcenter.com/pre-owned-lever-harps/',
    //     sellerCountry: 'USA',
    //     sellerRegion: 'Southern',
    //     sellerParentIdentifier: '.Odd',
    //     productTitleFn: ($, item) => $(item).find('.ProductDetails').text().trim(),
    //     productShortDescFn: () => "Short Description not available.",
    //     productPriceFn: ($, item) => $(item).find('.ProductPriceRating').find('em').text().trim(),
    //     productLongDescFn: () => "Long Description not available",   
    //     longProductImageUrlFn: ($, item) => $(item).find('img').attr('src'),
    // },
    {   
        sellerID: uuid(),
        sellerName: 'Atlanta Harp Centre-e',
        sellerUrl: 'https://stores.atlantaharpcenter.com/pre-owned-lever-harps/',
        sellerCountry: 'USA',
        sellerRegion: 'Southern',
        sellerParentIdentifier: '.Even',
        productTitleFn: ($, item) => $(item).find('.ProductDetails').text().trim(),
        productShortDescFn: () => "Short Description not available.",
        productPriceFn: ($, item) => $(item).find('.ProductPriceRating').find('em').text().trim(),
        productLongDescFn: () => "Long Description not available",   
        longProductImageUrlFn: ($, item) => $(item).find('img').attr('src'),
    },
    {   
        sellerID: uuid(),
        sellerName: 'Harps Etc',
        sellerUrl: 'https://www.harpsetc.com/harps-en/certified-used-harps/certified-used-lever-harps/',
        sellerCountry: 'USA',
        sellerRegion: 'Pacific',
        sellerParentIdentifier: '.ty-product-list__description',
        sellerAxiosResponsePath: '.text',
        //productTitleFn: ($, item) => $(item).find('.ProductDetails').text().trim(),
        // productShortDescFn: () => "Short Description not available.",
        // productPriceFn: ($, item) => $(item).find('.ProductPriceRating').find('em').text().trim(),
        // productLongDescFn: () => "Long Description not available",   
        // longProductImageUrlFn: ($, item) => $(item).find('img').attr('src'),
        
    },
    //#region 
    // {   
    //     sellerID: uuid(),
    //     sellerName: 'Virginia Harp Centre',
    //     sellerUrl: 'https://www.vaharpcenter.com/harps/used-harps/',
    //     sellerCountry: 'USA',
    //     sellerRegion: 'Eastern',
    //     sellerParentIdentifier: '.category',
    //     sellerLinkUrlFn: ($, item) => $(item).attr('data-url'),
    //     sellerLinkParentIdentifier: '.maxwidth',
    //     linkFn: async (seller, url) => {
    //         try {
    //             const response = await axios(url);
    //             // console.log('secondary response', response.data)
    //             secondaryData=parseStoreSecondaryInfo(seller, response.data); 
    //             return secondaryData;
    //         } catch {
    //             console.log(url, 'timed out');
    //         }
    //         // console.log('Link Func', url);
            
                
                   
    //         // //console.log('Link Func', url);
    //         // return await sellerArray.map(async seller => {
    //             const response = await axios(url);
    //             // console.log('secondary response', response.data)
    //             secondaryData=parseStoreSecondaryInfo(seller, response.data); 
    //             return secondaryData;
    //         // });           
    //     },        
    //     productTitleFn: ($, item) => $(item).find('.manufacturerName').text().trim(),
    //     productShortDescFn: () => "Short Description not available.",
    //     productPriceLinkFn: ($, item) => {
    //         let priceString = $(item).find('.subheader').text().trim();
    //         if(priceString) {
    //             const dollarSignIdx = priceString.indexOf('$');
    //             //const nonNumberIndex = priceString.indexOf( /^(?!.*[0-9]{1,2}([,.][0-9]{1,2})?$)/ );  //NOT YET IMPLEMENTED = non-number regex
    //             const nonNumberIndex = priceString.indexOf('\t\t\t\tAdditional Information');
    //             if (nonNumberIndex) {
    //                 priceString = priceString.substring(dollarSignIdx, nonNumberIndex).trim();
    //             } else {
    //                 priceString = priceString.substring(dollarSignIdx).trim();
    //             }
    //             return priceString;
    //         }
    //     },
    //     productLongDescLinkFn: ($, item) => {if($(item).find('.content_container').find('p').text().trim()) return $(item).find('.content_container').find('p').text().replace('/n', ''), replace('/t',''), trim()},   
    //     longProductImageUrlLinkFn: ($, item) => $(item).find('#fancy_photos_id0').attr('href'),
    // },
    // {   
    //     sellerID: uuid(),
    //     sellerName: 'Tisha Murvihill, harp services',
    //     sellerUrl: 'https://harptisha.com',
    //     sellerCountry: 'Canada',
    //     sellerRegion: 'Western',
    //     sellerParentIdentifier: '.main',
    //     productTitleFn: () => 'Sierra 36 by Triplett',
    //     productShortDescFn: () => 'Purchased 2011 Maple',
    //     productPriceFn: () => '$4300',
    //     productLongDescFn: () => 'Excellent condition, lightly used, beautiful Triplett sound. This one is a winner!',   
    //     longProductImageUrlFn: () => 'triplettSierra36Maple.jpg',
    // },
    // {   THIS ONE IS HARD, SAVE FOR LATER
        // sellerID: uuid(),
        // sellerName: 'West Coast Harps',
        // sellerUrl: 'https://www.westcoastharps.com/used-harps.html',
        // sellerCountry: 'Canada',
        // sellerRegion: 'Western',
        // sellerParentIdentifier: '.container',
        // // productTitleFn: ($, item) => $(item).find('.wsite-content-title').text().trim(),
        
        // // productShortDescFn: () => "Short Description not available.",
        // productPriceFn: ($, item) => {
        //     if ($(item).find('span').text().trim() && $(item).find('span').text().indexOf('$') !== -1) {
        //         return $(item).find('span').text().trim();
        //     } else {
        //         return '';
        //     }
            
            
        // },
        // // productLongDescFn: () => "Long Description not available",   
        // // longProductImageUrlFn: ($, item) => $(item).find('img').attr('src'),
    // },
    //#endregion
]

function parseStoreInfo(seller, data) {
    
    const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;
    
    const $ = cheerio.load(html);
    const productTable = $(seller.sellerParentIdentifier);
    console.log(productTable.length);
    productTable.each(async function (item) {
        const id=uuid();
        let productTitle = seller.hasOwnProperty('productTitleFn') ? seller.productTitleFn($, this) : '';
        //console.log('product title', productTitle);
        let productPrice = seller.hasOwnProperty('productPriceFn') ? seller.productPriceFn($, this) : '';
        console.log('price primary:', productPrice);
        let productShortDesc = seller.hasOwnProperty('productShortDescFn') ? seller.productShortDescFn($, this) : '';
        //console.log( 'short desc primary:', productShortDesc);
        let productLongDesc = seller.hasOwnProperty('productLongDescFn') ? seller.productLongDescFn($, this) : '';
        //console.log( 'Long desc primary:', productLongDesc);
        let longProductImageUrl = seller.hasOwnProperty('longProductImageUrlFn') ? seller.longProductImageUrlFn($, this) : '';
        //console.log( 'longProductImageUrl primary:', longProductImageUrl);
 
        if (seller.hasOwnProperty('sellerLinkUrlFn')) {
            const secondaryUrl = seller.sellerLinkUrlFn($, this);
            const secondaryUrlData = await seller.linkFn(seller, secondaryUrl);
            if (secondaryUrlData) {
                console.log('secondary in')
                if (!productTitle && secondaryUrlData.productTitle) productTitle = secondaryUrlData.productTitle;
                if (!productShortDesc && secondaryUrlData.productShortDesc) productShortDesc = secondaryUrlData.productShortDesc;
                if (!productPrice && secondaryUrlData.productPrice) productPrice = secondaryUrlData.productPrice;
                    console.log(ProductPrice)
                if (!productLongDesc && secondaryUrlData.productLongDesc) productLongDesc = secondaryUrlData.productLongDesc;
                if (!longProductImageUrl && secondaryUrlData.longProductImageUrl) longProductImageUrl = secondaryUrlData.longProductImageUrl;
            }
           
        }
                   
        const shortProductImageUrl = shortFileName(longProductImageUrl);
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
        // console.log(product)
        usedHarpsNorthAmerica.push(product);
        // downloadImage(longProductImageUrl, shortFileName(longProductImageUrl));
    });         
}
function parseStoreSecondaryInfo(seller, data) {
    const html = data;
    // console.log(data);
    //console.log('occurs', data.indexOf('postfooter'))
    const $ = cheerio.load(html);
    // console.log("$", $)
    const thisProduct = $(seller.sellerLinkParentIdentifier);
    console.log(thisProduct.length);
    
        // //console.log('table secondary', item)
        // const id=uuid();
        const productTitle = seller.hasOwnProperty('productTitleLinkFn') ? seller.productTitleLinkFn($, thisProduct) : '';
        //console.log('title secondary:', productTitle);
        const productPrice = seller.hasOwnProperty('productPriceLinkFn') ? seller.productPriceLinkFn($, thisProduct) : '';
        //console.log('price secondary:', productPrice);
        const productShortDesc = seller.hasOwnProperty('productShortDescLinkFn') ? seller.productShortDescLinkFn($, thisProduct) : '';
        //console.log( 'short desc secondary:', productShortDesc);
        const productLongDesc = seller.hasOwnProperty('productLongDescLinkFn') ? seller.productLongDescLinkFn($, thisProduct) : '';
        //console.log( 'Long desc secondary:', productLongDesc);
        const longProductImageUrl = seller.hasOwnProperty('longProductImageUrlLinkFn') ? seller.longProductImageUrlLinkFn($, thisProduct) : '';
        //console.log( 'longProductImageUrl secondary:', longProductImageUrl);
        product = {
            productTitle,
            productShortDesc,
            productPrice,
            productLongDesc,
            longProductImageUrl
        }
        //console.log('prod', product)
        return product;
        //usedHarpsNorthAmerica.push(product);
        // downloadImage(longProductImageUrl, shortFileName(longProductImageUrl));
         
}
sellerArray.map(async seller => {
    const response = await axios(seller.sellerUrl);
    // console.log(response.data)
    parseStoreInfo(seller, response.data);   
});    

module.exports = usedHarpsNorthAmerica;