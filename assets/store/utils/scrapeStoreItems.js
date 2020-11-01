const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');

exports.scrapeStoreItems = async (seller, data) => {
    console.log('imin scrape')
    const response = await axios({url: `https://www.harpsetc.com/bow-brand-natural-gut-1st-octave-set-00g-f.html`, 'strictSSL': false});
    const html = response.data.text;
    // console.log(html);

    const $ = cheerio.load(html);

    const product = {};
    product.storeId = $('.ty-product-block__left').find('form').attr('name').substring(13);
    product.title = $('.ty-product-block-title').text().trim();
    product.price = $('.ty-price-num').text().trim();
    product.description = $('.content-description').text().trim();
    product.image = $('.ty-pict   ').first().attr('src');

    console.log('answer', product)
    // const productTable = $('.ty-price-block');
    // console.log(($, item) => $(item).find('.ty-product-list__item-name').text().trim()); //titleFn
    // ($, item) => $(item).find('.ty-product-list__price').text().trim(), //priceFn 
    // ($, item) => $(item).find('.ty-product-list__description').text().trim(), //shortDescFn
        
    // console.log(response.data)
    // const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;
    // const $ = cheerio.load(html);
    // const productTable = $(seller.mainPathId);
    // console.log('Seller', seller.name)
    // console.log('# of Products:', productTable.length);
    return {item: 'myItem'}
}