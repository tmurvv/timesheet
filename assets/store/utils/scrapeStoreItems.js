const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');

async function getLinkInfo(url) {
    const response = await axios({url: `https://www.harpsetc.com/bow-brand-natural-gut-1st-octave-set-00g-f.html`, 'strictSSL': false});
    const html = response.data.text;
    const $ = cheerio.load(html);

    const product = {};
    product.storeId = $('.ty-product-block__left').find('form').attr('name').substring(13);
    product.title = $('.ty-product-block-title').text().trim();
    product.price = $('.ty-price-num').text().trim();
    product.description = $('.content-description').text().trim();
    product.image = $('.ty-pict   ').first().attr('src');
    console.log(product)
    return product;
}

exports.scrapeStoreItems = async (seller, data) => {
    const response = await axios({url: `https://www.harpsetc.com/strings/bow-brand/bow-brand-natural-gut/`, 'strictSSL': false});
    const html = response.data.text;
    const $ = cheerio.load(html);
    let productTable = $('.ty-product-list').toArray();
    
    const answer = await Promise.all(productTable.map(async item => {
        const product = {};
        const secondaryUrl = $(item).find('.ty-product-list__image').find('a').attr('href');
        try {
            const response = await axios({url: `${secondaryUrl}`, 'strictSSL': false});
            const html = response.data.text;
            // console.log(response.data.text)
            const $S = cheerio.load(html);
            
            product.storeId = $S('.ty-product-block__left').find('form').attr('name').substring(13);
            product.title = $S('.ty-product-block-title').text().trim();
            product.price = $S('.ty-price-num').text().trim();
            product.description = $S('.content-description').text().trim();
            product.image = $S('.ty-pict   ').first().attr('src');
            
        } catch(e) {
            console.log('error', e.message)
        }         
        return product;
    }));
    return answer;
}



//-------------------
    // console.log('imin scrape')
    // const response = await axios({url: `https://www.harpsetc.com/bow-brand-natural-gut-1st-octave-set-00g-f.html`, 'strictSSL': false});
    // const html = response.data.text;
    // // console.log(html);

    // const $ = cheerio.load(html);

    // const product = {};
    // product.storeId = $('.ty-product-block__left').find('form').attr('name').substring(13);
    // product.title = $('.ty-product-block-title').text().trim();
    // product.price = $('.ty-price-num').text().trim();
    // product.description = $('.content-description').text().trim();
    // product.image = $('.ty-pict   ').first().attr('src');

    // console.log('answer', product)
    //-----------
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