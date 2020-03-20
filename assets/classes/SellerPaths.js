const { Seller } = require('./Seller');

// exports.SellerPaths = class SellerPaths extends Seller {
//     constructor(name, productsUrl) {
//         super(name, productsUrl)
//     }
// }
exports.SellerPaths = class SellerPaths extends Seller {
    constructor(name, productsUrl, mainPathId, customFns, titleFn, priceFn, shortDescFn, longDescFn) {
        super(name, productsUrl, mainPathId, customFns)
        this.titleFn = titleFn;
        this.priceFn = priceFn;
        this.shortDescFn = shortDescFn;
        this.longDescFn = longDescFn;
    }
}
