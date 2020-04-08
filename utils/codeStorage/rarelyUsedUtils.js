

/**
 * Refresh makesModels Object from db
 * @function refreshMakesModels
 * @returns nothing (writes file to server)
 */
exports.refreshMakesModels = async () => {
    const makesModels = await MakesModels.find().sort('sellerName').select('-_id -__v');
    // console.log(makesModels)
    fs.writeFile('assets/constants/makesModels.json', JSON.stringify(makesModels), function (err) {
        if (err) console.log('From refreshMakesModels function:', err.message);
    });
}

/**
 * Only used to get initial maker/model array into noSQL (Mongo) DB format
 * @function initialMakerArraytoDB
 * @returns nothing (saves to Mongo DB)
 */
exports.initialMakerArraytoDB = async () => {
    //Sub Docs
    // var Product = mongoose.model('Product', productSchema);
    const makers = Object.keys(productMakesModels);
    makers.map(maker => {
        // maker product info
        const sellerProducts = [];
        const products = (leaf(productMakesModels, maker));
        const productDeets = Object.keys(products);
        
        productDeets.map((deet, idx) => {
            const productDetails = leaf(products, deet);
            if (productDetails.harptype) {
                const newProduct = {
                    productTitle: Object.keys(products)[idx],
                    productMaker: maker,
                    productType: productDetails.harptype,
                    productSize: productDetails.strings,
                    productAliases: productDetails.othernames
                }
                sellerProducts.push(newProduct);
            }        
        })

        // main maker info
        const seller = (leaf(productMakesModels, maker));
        const newSeller = {
            sellerName: maker,
            sellerAliases: seller.othernames,
            sellerProducts
        }

        /*******************
         * THIS CHANGES THE DATABASE!!!
         * uncomment to run initial data upload
         ******************/
        // const makesmodels = new MakesModels(newSeller);

        // makesmodels.save(function (err) {
        //       if (err) return console.log(err)
        //       console.log('Success!');
        //     });       
    });
}