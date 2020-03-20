const { Seller } = require('./Seller');

// exports.SellerPaths = class SellerPaths extends Seller {
//     constructor(name, productsUrl) {
//         super(name, productsUrl)
//     }
// }
exports.SellerPaths = class SellerPaths extends Seller {
    constructor(name, country, region, productsUrl, mainPathId, customFns, titleFn, priceFn, shortDescFn, longDescFn, imageUrlFn) {
        super(name, country, region, productsUrl, mainPathId, customFns)
        this.titleFn = titleFn;
        this.priceFn = priceFn;
        this.shortDescFn = shortDescFn;
        this.longDescFn = longDescFn;
        this.imageUrlFn = imageUrlFn
    }
}
