const uuid = require('uuid');

exports.Seller = class Seller {
    constructor(name, country, region, latLong, productsUrl, mainPathId, customFns) {
        this.id = uuid();
        this.name = name;
        this.country = country;
        this.region = region;
        this.latLong = latLong;
        this.productsUrl = productsUrl;
        this.mainPathId = mainPathId;
        this.customFns = customFns;
    }
}
