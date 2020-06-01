const { Seller } = require('./Seller');

exports.SellerPaths = class SellerPaths extends Seller {
    constructor(name, country, region, lat, long, productsUrl, mainPathId, customFns, //from seller
            titleFn, priceFn, shortDescFn, longDescFn, imageUrlFn) {
        super(name, country, region, lat, long, productsUrl, mainPathId, customFns);
        this.titleFn = titleFn;
        this.priceFn = priceFn;
        this.shortDescFn = shortDescFn;
        this.longDescFn = longDescFn;
        this.imageUrlFn = imageUrlFn
    }
}
