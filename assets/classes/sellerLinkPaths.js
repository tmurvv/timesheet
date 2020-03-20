const axios = require('axios');
const cheerio = require('cheerio');
const { SellerPaths } = require('./SellerPaths');

exports.SellerLinkPaths = class SellerLinkPaths extends SellerPaths {
    // constructor(name, productsUrl) {
    //     super(name, productsUrl)
    // }
    constructor(name, productsUrl, mainPathId, customFns, titleFn, priceFn, shortDescFn, longDescFn,
                    findLinkUrlFn, mainPathIdLink, titleLinkFn, priceLinkFn, shortDescLinkFn, longDescLinkFn) {
        super(name, productsUrl, mainPathId, customFns, titleFn, priceFn, shortDescFn, longDescFn)
        this.findLinkUrlFn = findLinkUrlFn;
        this.mainPathIdLink = mainPathIdLink;
        this.titleLinkFn = titleLinkFn;
        this.priceLinkFn = priceLinkFn;
        this.shortDescLinkFn = shortDescLinkFn;
        this.longDescLinkFn = longDescLinkFn;
    }
    parseStoreSecondaryInfo(seller, data) {
        const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;  
        const $ = cheerio.load(html);   
        const thisProduct = $('.ProductMain');
        
        const productTitle = seller.hasOwnProperty('titleLinkFn')&&seller.titleLinkFn ? seller.titleLinkFn($, thisProduct) : '';
        //console.log('title secondary:', productTitle);
        const productPrice = seller.hasOwnProperty('priceLinkFn')&&seller.priceLinkFn ? seller.priceLinkFn($, thisProduct) : '';
        //console.log('price secondary:', productPrice);
        const productShortDesc = seller.hasOwnProperty('shortDescLinkFn')&&seller.shortDescLinkFn ? seller.shortDescLinkFn($, thisProduct) : '';
        //console.log( 'short desc secondary:', productShortDesc);
        const productLongDesc = seller.hasOwnProperty('longDescLinkFn')&&seller.longDescLinkFn ? seller.longDescLinkFn($, thisProduct) : '';
        
        const longProductImageUrl = seller.hasOwnProperty('longProductImageUrlLinkFn') ? seller.longProductImageUrlLinkFn($, thisProduct) : '';
        //console.log( 'longProductImageUrl secondary:', longProductImageUrl);
        const product = {
            productTitle,
            productShortDesc,
            productPrice,
            productLongDesc,
            longProductImageUrl
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