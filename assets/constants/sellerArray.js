const uuid = require('uuid');
const cheerio = require('cheerio');
const axios = require('axios');

function findMaker(title) {
    let returnThis;
    const leverMakers = [
        'Dusty Strings',
        'Triplett',
        'Thormalen',
        'Lyon & Healy',
        'Salvi',
        'Camac',
        'Swanson Harps',
        'Noteworthy',
        'Jack Yule',
        'Newsom Harps'
    ];
    if (title) {
        leverMakers.map((maker) => {
            if (title.indexOf(maker)>-1) {
                // console.log(title, maker);
                returnThis = maker;
                return;
            }               
        });
        console.log('no maker found') 
    } else {
        console.log('no title')
    }
    return returnThis;
}

function parseStoreSecondaryInfo(seller, data) {
    const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;  
    const $ = cheerio.load(html);   
    const thisProduct = $(seller.sellerLinkParentIdentifier);
    
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
    return product;
}

exports.sellerArray = [
    // {   
    //     sellerID: uuid(),
    //     sellerName: 'Atlanta Harp Centre-o',
    //     sellerUrl: 'https://stores.atlantaharpcenter.com/pre-owned-lever-harps/',
    //     sellerCountry: 'USA',
    //     sellerRegion: 'Southern',
    //     sellerArrayIdentifier: '.Odd',
    //     productTitleFn: ($, item) => $(item).find('.ProductDetails').text().trim(),
    //     productShortDescFn: () => "Short Description not available.",
    //     productPriceFn: ($, item) => $(item).find('.ProductPriceRating').find('em').text().trim(),
    //     productLongDescFn: () => "Long Description not available",   
    //     longProductImageUrlFn: ($, item) => $(item).find('img').attr('src'),
    // },
    // {   
    //     sellerID: uuid(),
    //     sellerName: 'Atlanta Harp Centre-e',
    //     sellerUrl: 'https://stores.atlantaharpcenter.com/pre-owned-lever-harps/',
    //     sellerCountry: 'USA',
    //     sellerRegion: 'Southern',
    //     sellerArrayIdentifier: '.Even',
    //     productTitleFn: ($, item) => $(item).find('.ProductDetails').text().trim(),
    //     productShortDescFn: () => "Short Description not available.",
    //     productPriceFn: ($, item) => $(item).find('.ProductPriceRating').find('em').text().trim(),
    //     productLongDescFn: () => "Long Description not available",   
    //     longProductImageUrlFn: ($, item) => $(item).find('img').attr('src'),
    // },
    // {   
    //     sellerID: uuid(),
    //     sellerName: 'Harp Connection',
    //     sellerUrl: 'https://www.harpconnection.com/harpstore/harp-UsedHarps.html',
    //     sellerCountry: 'USA',
    //     sellerRegion: 'Eastern',
    //     sellerArrayIdentifier: '.plusplus',
    //     productTitleFn: ($, item) => $(item).find('h3').text().trim(), 
    //     productShortDescFn: ($, item) => $(item).parent().parent().find('p').first().text().trim(),
    //     productPriceFn: ($, item) => $(item).parent().parent().find('.THCsmall').text().trim(),
    //     productLongDescFn: ($, item) => $(item).parent().parent().find('p:nth-child(2)').text().trim(),
    //     longProductImageUrlFn: ($, item) => `https://www.harpconnection.com${$(item).parent().parent().parent().parent().parent().parent().parent().parent().parent().find('.THCHarpImage').attr('src')}`,
    // },
    // {   
    //     sellerID: uuid(),
    //     sellerName: 'Harps Etc',
    //     sellerUrl: 'https://www.harpsetc.com/harps-en/certified-used-harps/certified-used-lever-harps/',
    //     sellerCountry: 'USA',
    //     sellerRegion: 'Pacific',
    //     sellerArrayIdentifier: '.ty-product-list__info',
    //     sellerAxiosResponsePath: '.text',
    //     sellerLinkUrlFn: ($, item) => $(item).parent().prev().find('a').attr('href'),
    //     sellerLinkParentIdentifier: '.content-description',
    //     linkFn: async (seller, url) => {
    //         try {
    //             const response = await axios(url);
    //             secondaryData=parseStoreSecondaryInfo(seller, response.data); 
    //             return secondaryData;
    //         } catch {
    //             console.log(url, 'timed out');
    //         }
    //     },
    //     productTitleFn: ($, item) => $(item).find('.ty-product-list__item-name').text().trim(),
    //     productShortDescFn: ($, item) => $(item).find('.ty-product-list__description').text().trim(),
    //     productPriceFn: ($, item) => $(item).find('.ty-product-list__price').text().trim(),
    //     productLongDescLinkFn: ($, item) => {if($(item).find('p').text().trim()) return $(item).find('p').text().trim()},
    //     longProductImageUrlFn: ($, item) => $(item).parent().prev().find('img').attr('src'),   
    // },
    {   
        sellerID: uuid(),
        sellerName: 'Phoenix Harp Center',
        sellerUrl: 'https://phoenixharpcenter.com/harp-sales',
        sellerCountry: 'USA',
        sellerRegion: 'Western',
        sellerArrayIdentifier: '[data-field-id="contentCards.headline"]',
        productTitleFn: ($, item) => $(item).parent().find('h4').text().trim(),
        productMakerFn: (title) => {
            let productMaker;
            // console.log(title);
            const leverMakers = [
                'Dusty Strings',
                'Triplett',
                'Thormalen',
                'Lyon & Healy',
                'Salvi',
                'Camac',
                'Swanson Harps',
                'Noteworthy',
                'Jack Yule',
                'Newsom Harps'
            ];
            if (title) {
                leverMakers.map((maker) => {
                    if (title.indexOf(maker)>-1) {
                        console.log('in', maker)
                        productMaker = maker;
                        // return;
                    } 
                });
            } else {
                console.log('no title')
            }
            return productMaker;
        },
        productShortDescFn: ($, item) => {
            const productInfo = $(item).parent().find('[data-field-id="contentCards.description"]').text();
            return productInfo.substring(0, productInfo.indexOf('.') + 1);
        },
        productPriceFn: ($, item) => {
            const productInfo = $(item).parent().find('[data-field-id="contentCards.description"]').text();
            return productInfo.indexOf('$') > -1 ? productInfo.substring(productInfo.indexOf('$'), productInfo.indexOf('$') + 10) : '';
        },
        productLongDescFn: ($, item) => $(item).parent().find('[data-field-id="contentCards.description"]').text(),
        longProductImageUrlFn: ($, item) => `https:${$(item).parent().find('[data-field-id="contentCards.imageProperties"]').find('img').attr("src")}`,
        specialFileNameFn: (longProductImageUrl) => longProductImageUrl.replace(/%20/g, '_').replace(/%25/g, '_').replace(/%/g, '_'),
        
    },   
    // {   
    //     sellerID: uuid(),
    //     sellerName: 'Tisha Murvihill, harp services',
    //     sellerUrl: 'https://harptisha.com',
    //     sellerCountry: 'Canada',
    //     sellerRegion: 'Western',
    //     sellerArrayIdentifier: '.main',
    //     productTitleFn: () => 'Sierra 36 by Triplett',
    //     productShortDescFn: () => 'Purchased 2011 Maple',
    //     productPriceFn: () => '$4300',
    //     productLongDescFn: () => 'Excellent condition, lightly used, beautiful Triplett sound. This one is a winner!',   
    //     longProductImageUrlFn: () => 'triplettSierra36Maple.jpg',
    // },
    // {   
    //     sellerID: uuid(),
    //     sellerName: 'Virginia Harp Centre',
    //     sellerUrl: 'https://www.vaharpcenter.com/harps/used-harps/',
    //     sellerCountry: 'USA',
    //     sellerRegion: 'Eastern',
    //     sellerArrayIdentifier: '.category',
    //     sellerLinkUrlFn: ($, item) => $(item).attr('data-url'),
    //     sellerLinkParentIdentifier: '.maxwidth',
    //     linkFn: async (seller, url) => {
    //         try {
    //             const response = await axios(url);
    //             // console.log('secondary response', response.data)
    //             secondaryData=parseStoreSecondaryInfo(seller, response.data); 
    //             return secondaryData;
    //         } catch (err) {
    //             console.log(url, 'timed out', err.message);
    //         }           
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
    //     productLongDescLinkFn: ($, item) => {
    //         if ($(item).find('.content_container').find('p').text()) {
    //             return $(item).find('.content_container')
    //                 .find('p').text()
    //                 .replace('/n', '').replace('/t','')
    //                 .replace('\\t', '').replace('\\n', '')
    //                 .trim()
    //             }
    //         },   
    //     longProductImageUrlLinkFn: ($, item) => $(item).find('#fancy_photos_id0').attr('href'),
    //     specialFileNameFn: (longProductImageUrl) => longProductImageUrl.replace(/\/n/g, '').replace(/\/t/g, '').replace(/\\n/g, '').replace(/\\t/g, '')
    // }   
    // {   THIS ONE IS HARD, SAVE FOR LATER
    //     sellerID: uuid(),
    //     sellerName: 'West Coast Harps',
    //     sellerUrl: 'https://www.westcoastharps.com/used-harps.html',
    //     sellerCountry: 'Canada',
    //     sellerRegion: 'Western',
    //     sellerArrayIdentifier: '.container',
    //     // productTitleFn: ($, item) => $(item).find('.wsite-content-title').text().trim(),
        
    //     // productShortDescFn: () => "Short Description not available.",
    //     productPriceFn: ($, item) => {
    //         if ($(item).find('span').text().trim() && $(item).find('span').text().indexOf('$') !== -1) {
    //             return $(item).find('span').text().trim();
    //         } else {
    //             return '';
    //         }
            
            
    //     },
    //     // productLongDescFn: () => "Long Description not available",   
    //     // longProductImageUrlFn: ($, item) => $(item).find('img').attr('src'),
    // },
]

