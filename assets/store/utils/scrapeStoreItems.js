const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');

const { FINDAHARP_PRODUCTS } = require('../../constants/FindaHarpProducts');

async function getLinkInfo(url) {
    const response = await axios({url: `https://www.harpsetc.com/bow-brand-natural-gut-1st-octave-set-00g-f.html`, 'strictSSL': false});
    const html = response.data.text;
    const $ = cheerio.load(html);

    const product = {};
    product.id = $('.ty-product-block__left').find('form').attr('name').substring(13);
    product.category = 'strings';
    product.title = $('.ty-product-block-title').text().trim();
    product.price = $('.ty-price-num').text().trim();
    product.description = $('.content-description').text().trim();
    product.image = $('.ty-pict   ').first().attr('src');
    product.newused = 'new';
    console.log(product);
    return product;
}

exports.scrapeStoreItems = async (answerArray, url) => {
    // let storeItems = [];
    let storeItems = [...FINDAHARP_PRODUCTS];
    console.log(storeItems.length);

    storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-natural-gut/?sef_rewrite=1`);
    console.log('storeItems', storeItems.length);
    storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-lever-gut/`);
    console.log('storeItems', storeItems.length);
    storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-concedo/`);
    console.log('storeItems', storeItems.length);
    storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-burgundy-gut/`);
    console.log('storeItems', storeItems.length);
    storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-nylon/`);
    console.log('storeItems', storeItems.length);
    storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bass-wire-silver-plated/`);
    console.log('storeItems', storeItems.length);
    storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-bass-wire-tarnish-resistant/`);
    console.log('storeItems', storeItems.length);
    storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-lever-bass-wire/`);
    console.log('storeItems', storeItems.length);
    storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-professional-lever-wire/`);
    console.log('storeItems', storeItems.length);
    storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-lever-nylon/`);
    console.log('storeItems', storeItems.length);
    
    // storeItems = await scrapeStoreItems(storeItems,`https://www.harpsetc.com/strings/artist-nylon-strings/`);
    // console.log('storeItems.length', storeItems.length)
    // storeItems = await scrapeStoreItems(storeItems,`https://www.harpsetc.com/strings/bronze-wire-monofilament/`);
    // console.log('storeItems.length', storeItems.length)
    // storeItems = await scrapeStoreItems(storeItems,`https://www.harpsetc.com/strings/dusty-strings/`);
    // console.log('storeItems.length', storeItems.length)
    // storeItems = await scrapeStoreItems(storeItems,`https://www.harpsetc.com/strings/savarez-kf/`);
    // console.log('storeItems.length', storeItems.length)
    // storeItems = await scrapeStoreItems(storeItems,`https://www.harpsetc.com/strings/nylon-monofilament/`);
    // console.log('storeItems.length', storeItems.length)

    //write to product file
        
    fs.writeFile('assets/constants/storeItemsList.json', JSON.stringify(storeItems), function (err) {
        if (err) console.log('Error writing store-item list function:', err.message);
    });

    // return scrapeStoreItemsSub(answerArray, url);
}

const scrapeStoreItemsSub = async (answerArray, url) => {
    console.log(answerArray.length)
    const response = await axios({url, 'strictSSL': false});
    const html = response.data.text;
    const $ = cheerio.load(html);

    let productTable = $('.ty-product-list').toArray();
    
    await Promise.all(productTable.map(async item => {
        const product = {};
        const secondaryUrl = $(item).find('.ty-product-list__image').find('a').attr('href');
        try {
            const response = await axios({url: `${secondaryUrl}`, 'strictSSL': false});
            const html = response.data.text;
            // console.log(response.data.text)
            const $S = cheerio.load(html);

            const product = {};
            product.id = $S('.ty-product-block__left').find('form').attr('name').substring(13);
            product.category = 'strings';
            product.store = 'harpsetc';
            product.title = $S('.ty-product-block-title').text().trim();
            product.price = $S('.ty-price-num').text().trim();
            product.description = $S('.content-description').text().trim();
            product.image = $S('.ty-pict   ').first().attr('src');
            product.newused = 'new';
            
            answerArray.push(product);
        } catch(e) {
            console.log('error', e.message)
        }         
    }));
    // get next button href
    if (!$('.ty-pagination').find('a').last().attr('href')) return answerArray

    const nextUrl = $('.ty-pagination').find('a').last().attr('href');
    // return answerArray;
    return scrapeStoreItemsSub(answerArray, nextUrl);
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