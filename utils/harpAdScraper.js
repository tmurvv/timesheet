const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');
const { downloadImage } = require('../utils/downloadWebSiteImages.js');
const { shortFileName } = require('./helpers.js');

const usedHarpsNorthAmerica = [];
 
const sellerArray = [
    {   
        sellerID: uuid(),
        sellerName: 'Harp Connection',
        sellerUrl: 'https://www.harpconnection.com/harpstore/harp-UsedHarps.html',
        sellerCountry: 'USA',
        sellerRegion: 'Eastern',
        sellerParentIdentifier: '.plusplus',
        productTitleFn: ($, item) => $(item).find('h3').text().trim(), 
        productShortDescFn: ($, item) => $(item).parent().parent().find('p').first().text().trim(),
        productPriceFn: ($, item) => $(item).parent().parent().find('.THCsmall').text().trim(),
        productLongDescFn: ($, item) => $(item).parent().parent().find('p:nth-child(2)').text().trim(),
        longProductImageUrlFn: ($, item) => `https://www.harpconnection.com${$(item).parent().parent().parent().parent().parent().parent().parent().parent().parent().find('.THCHarpImage').attr('src')}`,
    },
    {   
        sellerID: uuid(),
        sellerName: 'Atlanta Harp Centre',
        sellerUrl: 'https://stores.atlantaharpcenter.com/pre-owned-lever-harps/',
        sellerCountry: 'USA',
        sellerRegion: 'Southern',
        sellerParentIdentifier: '.Odd',
        productTitleFn: ($, item) => $(item).find('.ProductDetails').text().trim(),
        productShortDescFn: () => "Short Description not available.",
        productPriceFn: ($, item) => $(item).find('.ProductPriceRating').find('em').text().trim(),
        productLongDescFn: () => "Long Description not available",   
        longProductImageUrlFn: ($, item) => $(item).find('img').attr('src'),
    },
    {   
        sellerID: uuid(),
        sellerName: 'Tisha Murvihill, harp services',
        sellerUrl: 'https://harptisha.com',
        sellerCountry: 'Canada',
        sellerRegion: 'Western',
        sellerParentIdentifier: '.main',
        productTitleFn: () => 'Sierra 36 by Triplett',
        productShortDescFn: () => 'Purchased 2011 Maple',
        productPriceFn: () => '$4300',
        productLongDescFn: () => 'Excellent condition, lightly used, beautiful Triplett sound. This one is a winner!',   
        longProductImageUrlFn: () => 'triplettSierra36Maple.jpg',
    }
]

function parseStoreInfo(seller, data) {
    const html = data;
    const $ = cheerio.load(html);
    const productTable = $(seller.sellerParentIdentifier);

    productTable.each(function (item) {
        const id=uuid();
        const productTitle = seller.productTitleFn($, this);
        const productShortDesc = seller.productShortDescFn($, this);
        const productPrice = seller.productPriceFn($, this);
        const productLongDesc = seller.productLongDescFn($, this);
        const longProductImageUrl = seller.longProductImageUrlFn($, this);
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
        usedHarpsNorthAmerica.push(product);
        downloadImage(longProductImageUrl, shortFileName(longProductImageUrl));
    });         
}
sellerArray.map(async seller => {
    const response = await axios(seller.sellerUrl);
    parseStoreInfo(seller, response.data);   
});    

module.exports = usedHarpsNorthAmerica;