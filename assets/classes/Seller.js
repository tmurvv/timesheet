const uuid = require('uuid');

exports.Seller = class Seller {
    constructor(name, productsUrl) {
        this.id = uuid();
        this.name = name;
        this.productsUrl = productsUrl;
    }
}
