const AppError = require('../AppError');
const { globalMakesModels } = require('../../assets/constants/makesModels'); // NOT YET IMPLEMENTED make scrape function pass in makesModels

/**
 * Gets a list of unique model names from maker/model JSON-style object
 * @function getModelList
 * @param {array} makesModels array product makers with models
 * @returns {Set} - Set of model names
 */
const getModelList = makesModels => {
    if (!makesModels || makesModels.length === 0) throw new AppError('from getModelList: makes/models variable is empty'); 
    const productFields = [];

    makesModels.map(maker => {
        productFields.push(...maker.sellerProducts.map(product => [product.productTitle, product.productAliases, product.productDoNotSelect]));
    });

    // console.log(productFields);
    return productFields;

    // copy Sept 6, 2020
    // if (!makesModels || makesModels.length === 0) throw new AppError('from getModelList: makes/models variable is empty'); 
    // const productKeys = [];

    // makesModels.map(maker => {
    //     productKeys.push(...maker.sellerProducts.map(product => product.productTitle));
    // });

    // return productKeys.sort();
}
/**
 * Searches list of other names
 * @function searchAliasArray
 * @param {String} title the title of the product ad
 * @param {Array} - Array of Arrays containing [correctName, [othernames]]
 * @returns {String} - Corrected name, if found
 */
const searchAliasArray = (title, aliasArray) => {
    if (!title) throw new AppError('from searchOtherNamesArrray: title parameter is empty');
    if (!aliasArray) throw new AppError('from searchAliasArray: otherNamesArray parameter is empty');
    let foundName;
    aliasArray.map(modelFields => {
        if (modelFields[1]) {
            modelFields[1].map(otherName => {
                // console.log(otherName)
                const modRegEx = String.raw`\b${otherName.toUpperCase()}\b`;
                const regExPattern = new RegExp(modRegEx);
                if (otherName&&title.toUpperCase().match(regExPattern)) foundName = modelFields[0];
            });
        }                     
    });

    return foundName;
    // copy sept 6
    // if (!title) throw new AppError('from searchOtherNamesArrray: title parameter is empty');
    // if (!aliasArray) throw new AppError('from searchAliasArray: otherNamesArray parameter is empty');
    // let foundName;
    // aliasArray.map(name => {
    //     name[1].map(otherName => {
    //         const modRegEx = String.raw`\b${otherName}\b`;
    //         const regExPattern = new RegExp(modRegEx);
    //         if (title.match(regExPattern)) foundName = name[0];
    //     });                     
    // });

    // return foundName;
}
/**
 * Gets a list of all misspellings and colloquialisms of maker names from maker/model JSON-style object
 * @function getMakerAliasArray
 * @param {array} makesModels array product makers with models
 * @returns {Array} - Array of Arrays containing [correctMakerName, [othernames]] or [correctModelName, [othernames]]
 */
const getMakerAliasArray = (makesModels) => {
    if (!makesModels || makesModels.length === 0) throw new AppError('from getMakerAliasArray: makesModels parameter is empty');
    const allSellerAliases = [];
    makesModels.map(maker => {
        if (maker.sellerAliases.length>0 && maker.sellerName !== 'findaharpFinishes') {
            allSellerAliases.push([maker.sellerName, [...maker.sellerAliases]]);
        }
    });
   
    return allSellerAliases;
}

/**
 * Gets a list of all misspellings and colloquialisms of model names from maker/model JSON-style object
 * @function getModelAliasArray
 * @param {array} makesModels array product makers with models
 * @returns {Array} - Array of Arrays containing [correctMakerName, [othernames]] or [correctModelName, [othernames]]
 */
const getModelAliasArray = (makesModels) => {
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
    if (!model) throw new AppError('from findMakerFromModel: model parameter is empty');
    if (!makesModels || makesModels.length === 0) throw new AppError('from findMakerFromModel: makesModels parameter is empty');

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
 * Checks if badName is in title
 * @function checkBadModelName
 * @param {String} title the title of the product ad 
 * @param {Array} modelFields [modelName, aliasArray, badNameArray]
 * @returns {String} - Maker name or undefined
 */
const checkModelBadNames = (title, badNames) => {
    if (!title) throw new AppError('from checkModelBadNames: title parameter is empty');
    if (!badNames) throw new AppError('from checkModelBadNames: badNames parameter is empty');
    
    badNames.map(name => {
        const modRegEx = String.raw`\b${name.toUpperCase()}\b`;
        const regExPattern = new RegExp(modRegEx);
        if (name&&title.toUpperCase().match(regExPattern)) return false
    });
    
    return true;
}
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function checkMakerAliases
 * @param {String} title the title of the product ad 
 * @param {String} model optional, model if known
 * @returns {String} - Maker name or undefined
 */
const checkMakerAliases = (title, model, makesModels) => {
    if (!title) throw new AppError('from checkMakerAliases: title parameter is empty');
    
    const aliases = getMakerAliasArray(makesModels);
    let foundName = searchAliasArray(title, aliases); //business preference to try to parse maker from title before using model to find maker 
    
    if (!foundName && model) foundName = findMakerFromModel(model, makesModels);
    
    return foundName;
}
/**
 * Parses maker from Product ad title using makers/models JSON-style object
 * @function findMaker
 * @param {String} title the title of the product ad
 * @param {String} validated model name in case maker can not be found
 * @returns {String} - Maker name or undefined
 */
const findMaker = (title, model='', makesModels) => {
    if (!title) throw new AppError('from findMaker: title parameter is empty');
    const titleUpper = title.toUpperCase();
    let productMaker;
    makesModels.map(maker => {
        const makerUpper=maker.sellerName.toUpperCase();
        const modRegEx = String.raw`\b${makerUpper}\b`;
        const regExPattern = new RegExp(modRegEx);
        if (titleUpper.match(regExPattern)) productMaker = maker.sellerName;
    });
    if (!productMaker) productMaker = checkMakerAliases(title, model, makesModels);
    
    return productMaker;
}
/**
 * Parses maker from Product ad title using makers/models JSON-style object
 * @function findProductFinish
 * @param {String} title the title of the product ad
 * @param {Object} makesModels list of product makers and models
 * @returns {String} - Maker name or undefined
 */
const findProductFinish = (title, makesModels) => {
    if (!title) throw new AppError('from findMaker: title parameter is empty');
    const upperTitle = title.toUpperCase();
    const finishes =makesModels[makesModels.length-1].sellerAliases;
    let productFinish;
    finishes.map(finish => {
        const upperFinish=finish.toUpperCase();
        const modRegEx = String.raw`\b${upperFinish}\b`;
        const regExPattern = new RegExp(modRegEx);
        if (upperTitle.match(regExPattern)) productFinish = finish;
    });
    return productFinish;
}
/**
 * Parses maker from Product ad title using makers/models JSON-style object
 * @function findModel
 * @param {String} title the title of the product ad
 * @returns {String} - Model name or undefined
 */
const findModel = (title, makesModels) => {
    if (!title) throw new AppError('from findMaker: title parameter is empty');
    let productModel;
    const modelList = getModelList(makesModels)
    modelList.map(model => {
        const modRegEx = String.raw`\b${model[0].toUpperCase()}\b`;
        const regExPattern = new RegExp(modRegEx);
        // if found
        if (model[0]&&title.toUpperCase().match(regExPattern)) {
            // check for badName
            if (!model[2] || model[2] && !checkModelBadNames(title, model[2])) productModel = model[0];
        }
    });
    if (!productModel) productModel = searchAliasArray(title, modelList);
    
    return productModel;
}

/**
 * Finds product type ('lever', 'pedal') with make and model using makers/models JSON-style object
 * @function findProductType
 * @param {String} maker the product maker
 * @param {String} model the product model
 * @returns {String} - Product Type or undefined
 */
const findProductType = (maker, model, makesModels) => {
    //short circuit
    if (!maker) throw new AppError('from findProductType: maker parameter is empty');
    if (!model) throw new AppError('from findProductType: model parameter is empty');
    
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
function findProductSize(maker, model, makesModels) {
    //short circuit
    if (!maker) throw new AppError('from findProductType: maker parameter is empty');
    if (!model) throw new AppError('from findProductType: model parameter is empty');
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
    if (!title) return [];
    const model = await findModel(title, globalMakesModels);
    if (!model) return [];
    const maker = await findMaker(title, model, globalMakesModels);
    const type = findProductType(maker, model, globalMakesModels);
    const size = findProductSize(maker, model, globalMakesModels);
    const finish = findProductFinish(title, globalMakesModels);
    return [maker, model, type, size, finish];
}

module.exports = {
    getModelList,
    findMakerFromModel,
    getModelAliasArray,
    getMakerAliasArray,
    searchAliasArray,
    checkMakerAliases,
    findMaker,
    findModel,
    findProductType,
    findProductSize,
    getMakeModelTypeSize
}
