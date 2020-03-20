const uuid = require('uuid');

exports.Seller = class Seller {
    constructor(name, productsUrl, mainPathId, customFns) {
        this.id = uuid();
        this.name = name;
        this.productsUrl = productsUrl;
        this.mainPathId = mainPathId;
        this.customFns = customFns;
    }
}
