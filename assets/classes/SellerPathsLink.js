const axios = require('axios');
const cheerio = require('cheerio');
const { SellerPaths } = require('./SellerPaths');

exports.SellerPathsLink = class SellerPathsLink extends SellerPaths {
    constructor(name, country, region, productsUrl, mainPathId, customFns, //from Seller.js
                    titleFn, priceFn, shortDescFn, longDescFn, imageUrlFn, //from SellerPaths.js
                    findLinkUrlFn, mainPathIdLink, titleLinkFn, priceLinkFn, 
                    shortDescLinkFn, longDescLinkFn, imageUrlLinkFn) {
        super(name, country, region, productsUrl, mainPathId, customFns, //from Seller.js
                titleFn, priceFn, shortDescFn, longDescFn, imageUrlFn) //from SellerPaths.js
        this.findLinkUrlFn = findLinkUrlFn;
        this.mainPathIdLink = mainPathIdLink;
        this.titleLinkFn = titleLinkFn;
        this.priceLinkFn = priceLinkFn;
        this.shortDescLinkFn = shortDescLinkFn;
        this.longDescLinkFn = longDescLinkFn;
        this.imageUrlLinkFn = imageUrlLinkFn;
    }
}
