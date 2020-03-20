const uuid = require('uuid');

exports.Seller = class Seller {
    constructor(name, country, region, productsUrl, mainPathId, customFns) {
        this.id = uuid();
        this.name = name;
        this.country = country;
        this.region = region;
        this.productsUrl = productsUrl;
        this.mainPathId = mainPathId;
        this.customFns = customFns;
    }
}
