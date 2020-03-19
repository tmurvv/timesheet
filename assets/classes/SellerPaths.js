const { Seller } = require('./Seller');

exports.SellerPaths = class SellerPaths extends Seller {
    constructor(name, productsUrl, mainPathId, titleFn, customFns) {
        super(name, productsUrl)
        this.mainPathId = mainPathId;
        this.titleFn = titleFn;
        this.customFns = customFns;
    }
}
