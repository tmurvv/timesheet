const { makesModels } = require('../../assets/constants/makesModels');

/**
 * Gets a list of unique model names from maker/model JSON-style object
 * @function getModelList
 * @param {array} makesModels array product makers with models
 * @returns {Set} - Set of model names
 */
const getModelList = makesModels => {
    if (!makesModels || makesModels.length === 0) throw 'from getModelList: makes/models variable is empty'; 
    const productKeys = [];

    makesModels.map(maker => {
        productKeys.push(...maker.sellerProducts.map(product => product.productTitle));
    });

    return productKeys.sort();
}
/**
 * Searches list of other names
 * @function searchAliasArray
 * @param {String} title the title of the product ad
 * @param {Array} - Array of Arrays containing [correctName, [othernames]]
 * @returns {String} - Corrected name, if found
 */
const searchAliasArray = (title, aliasArray) => {
    if (!title) throw 'from searchOtherNamesArrray: title parameter is empty';
    if (!aliasArray) throw 'from searchAliasArray: otherNamesArray parameter is empty';
    let foundName;
    aliasArray.map(name => {
        name[1].map(otherName => {
            if (title.toUpperCase().indexOf(otherName.toUpperCase()) > -1) foundName = name[0]; 
        });                     
    });

    return foundName;
}
/**
 * Gets a list of all misspellings and colloquialisms of maker names from maker/model JSON-style object
 * @function getMakerAliases
 * @param {array} makesModels array product makers with models
 * @returns {Array} - Array of Arrays containing [correctMakerName, [othernames]] or [correctModelName, [othernames]]
 */
const getMakerAliases = (makesModels) => {

    if (!makesModels || (Object.keys(makesModels).length === 0 && makesModels.constructor === Object)) throw 'from getOtherMakerModelNames: type parameter is empty';
    const allSellerAliases = [];
    
    makesModels.map(maker => {
        if (maker.sellerAliases.length>0) {
            allSellerAliases.push([maker.sellerName, [...maker.sellerAliases]]);
        }
    });
   
    return allSellerAliases;  
}

/**
 * Gets a list of all misspellings and colloquialisms of model names from maker/model JSON-style object
 * @function getModelAliases
 * @param {array} makesModels array product makers with models
 * @returns {Array} - Array of Arrays containing [correctMakerName, [othernames]] or [correctModelName, [othernames]]
 */
const getModelAliases = (makesModels) => {
    
    const allProductAliases = [];
    
    makesModels.map(maker => { 
        maker.sellerProducts.map(model => {
            if (model.productAliases.length>0) {
                allProductAliases.push([model.productTitle,[...model.productAliases]]);
            }
        });
    });
    return allProductAliases;  
}

/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function findMakerFromModel
 * @param {String} model model name to search on
 * @param {array} makesModels array product makers with models
 * @returns {String} - Maker name
 */
const findMakerFromModel = (model, makesModels) => {   
    if (!model) throw 'from findMakerFromModel: model parameter is empty';
    if (!makesModels || makesModels.length === 0) throw 'from findMakerFromModel: makesModels parameter is empty';
    
    let foundName;
    makesModels.map((maker,idx) => {
        maker.sellerProducts.map(sellerProduct => {
            if (sellerProduct.productTitle.toUpperCase() === model.toUpperCase()) {               
                foundName = maker.sellerName;
            }
        });
    });

    return foundName;
}
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function checkMakerAliases
 * @param {String} title the title of the product ad 
 * @param {String} model optional, model if known
 * @returns {String} - Maker name or undefined
 */
const checkMakerAliases = (title, model) => {
    if (!title) throw 'from searchOtherNamesArrray: title parameter is empty';
    
    const aliases = getMakerAliases(makesModels);
    let foundName = searchAliasArray(title, aliases); //business preference to try to parse maker from title before using model to find maker 
    
    if (!foundName && model) foundName = findMakerFromModel(model, makesModels);
    
    return foundName;
}
/**
 * Checks other model names if initial model search fails from makers/models JSON-style object
 * @function checkModelAliases
 * @param {String} title the title of the product ad
 * @returns {String} - Model name or undefined
 */
const checkModelAliases = (title) => {
    if (!title) throw 'from checkModelAliases: title parameter is empty';
    
    const modelAliases = getModelAliases(makesModels);
    return searchAliasArray(title, modelAliases)
}
/**
 * Parses maker from Product ad title using makers/models JSON-style object
 * @function findMaker
 * @param {String} title the title of the product ad
 * @param {String} validated model name in case maker can not be found
 * @returns {String} - Maker name or undefined
 */
const findMaker = (title, model) => {
    if (!title) throw 'from findMaker: title parameter is empty';
    
    let productMaker;
    
    makesModels.map(maker => {
        if (title.indexOf(maker.sellerName)>-1) {
            productMaker = maker.sellerName;
        } 
    });

    if (!productMaker) productMaker = checkMakerAliases(title, model);
    return productMaker;
}
/**
 * Parses maker from Product ad title using makers/models JSON-style object
 * @function findModel
 * @param {String} title the title of the product ad
 * @returns {String} - Model name or undefined
 */
const findModel = (title) => {
    if (!title) throw 'from findMaker: title parameter is empty';
    let productModel;
    
    getModelList(makesModels).map((model) => {
        if (title.indexOf(model)>-1) {
            productModel = model;
        } 
    });
    if (!productModel) productModel = checkModelAliases(title);
    
    return productModel;
}
/**
 * Finds product type ('lever', 'pedal') with make and model using makers/models JSON-style object
 * @function findProductType
 * @param {String} maker the product maker
 * @param {String} model the product model
 * @returns {String} - Product Type or undefined
 */
const findProductType = (maker, model) => {
    //short circuit
    if (!maker) throw 'from findProductType: maker parameter is empty';
    if (!model) throw 'from findProductType: model parameter is empty';
    
    let type;
    
    try {
        const foundModel = makesModels
            .find(thisMaker => thisMaker.sellerName===maker)
            .sellerProducts
            .find(thisModel => thisModel.productTitle===model)
        ;
        type = foundModel.productType
    } catch (err) {
        return 'not found';
    }

    return type;
}
/**
 * Finds product size with make and model using makers/models JSON-style object
 * @function findProductSize
 * @param {String} maker the product maker
 * @param {String} model the product model
 * @returns {String} - Product size or undefined
 */
function findProductSize(maker, model) {
    //short circuit
    if (!maker) throw 'from findProductType: maker parameter is empty';
    if (!model) throw 'from findProductType: model parameter is empty';
    let size;
    try{
        const foundModel = makesModels
            .find(thisMaker => thisMaker.sellerName===maker)
            .sellerProducts
            .find(thisModel => thisModel.productTitle===model)
        ;
        return foundModel.productSize;
        
    } catch (err) {
        return 'not found';
    }
}

const getMakeModelTypeSize = async (title) => {
    if (!title) throw 'from getMakeModelTypeSize: title parameter is empty';
    const model = await findModel(title);
    if (!model) return [];
    const maker = await findMaker(title, model);
    const type = findProductType(maker, model);
    const size = findProductSize(maker, model);
    
    return [maker, model, type, size];
}

module.exports = {
    getModelList,
    findMakerFromModel,
    getModelAliases,
    getMakerAliases,
    searchAliasArray,
    checkMakerAliases,
    checkModelAliases,
    findMaker,
    findModel,
    findProductType,
    findProductSize,
    getMakeModelTypeSize
}
