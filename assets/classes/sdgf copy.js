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
