const { productMakesModels } = require('../../assets/constants/makerArray');
const { leaf } = require('./helpers');

/**
 * Gets a list of unique model names from maker/model JSON-style object
 * @function getModelList
 * @param {Object} makesModels JSON-style object of product makers with models
 * @returns {Set} - Set of model names
 */
const getModelList = makesModels => {
    if (!makesModels || (Object.keys(makesModels).length === 0 && makesModels.constructor === Object)) throw 'from getModelList: makes/models parameter is empty'; 
    const productKeys = [];

    Object.keys(makesModels).map(maker => {
        productKeys.push(...Object.keys(leaf(makesModels, maker))); //leaf function helps find nested object keys from Stackoverflow
    });
   
    return new Set(productKeys);
}
/**
 * Searches list of other names
 * @function searchOtherNamesArray
 * @param {String} title the title of the product ad
 * @param {Array} - Array of Arrays containing [correctName, [othernames]]
 * @returns {String} - Corrected name, if found
 */
const searchOtherNamesArray = (title, otherNamesArray) => {
    if (!title) throw 'from searchOtherNamesArrray: title parameter is empty';
    if (!otherNamesArray) throw 'from searchOtherNamesArray: otherNamesArray parameter is empty';
    let foundName;
    otherNamesArray.map(name => {
        name[1].map(otherName => {
            if (title.toUpperCase().indexOf(otherName.toUpperCase()) > -1) foundName = name[0]; 
        });                     
    });

    return foundName;
}
/**
 * Gets a list of all misspellings and colloquialisms of maker names from maker/model JSON-style object
 * @function getOtherMakerNames
 * @param {Object} makesModels JSON-style object of product makers with models
 * @returns {Array} - Array of Arrays containing [correctMakerName, [othernames]] or [correctModelName, [othernames]]
 */
const getOtherMakerNames = (makesModels) => {
    if (!makesModels || (Object.keys(makesModels).length === 0 && makesModels.constructor === Object)) throw 'from getOtherMakerModelNames: type parameter is empty';
    const otherNames = [];
    
    Object.keys(makesModels).map(maker => {
        if (leaf(makesModels,maker).othernames) {
            if (!Array.isArray(leaf(makesModels,maker).othernames)) throw 'from getOtherMakerNames: other names must be arrays';
            otherNames.push([maker,[...leaf(makesModels,maker).othernames]]);
        }
    }); 
    return otherNames;  
}

/**
 * Gets a list of all misspellings and colloquialisms of model names from maker/model JSON-style object
 * @function getOtherModelNames
 * @param {Object} makesModels JSON-style object of product makers with models
 * @returns {Array} - Array of Arrays containing [correctMakerName, [othernames]] or [correctModelName, [othernames]]
 */
const getOtherModelNames = (makesModels) => {
    if (!makesModels || (Object.keys(makesModels).length === 0 && makesModels.constructor === Object)) throw 'from getOtherMakerModelNames: type parameter is empty';
    const otherNames = [];
    const makerList = Object.keys(makesModels);
    
    makerList.map(maker => {      
        Object.keys(leaf(makesModels, maker)).map(model => {
            if (leaf(leaf(makesModels, maker), model).othernames && !Array.isArray(leaf(leaf(makesModels, maker), model).othernames)) throw 'from getOtherMakerNames: other names must be arrays';
            if (leaf(leaf(makesModels, maker), model).othernames) {
                otherNames.push([model,[...leaf(leaf(makesModels, maker),model).othernames]]);
            }
        });
    });
    
    return otherNames;  
}

/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function findMakerFromModel
 * @param {String} model model name to search on
 * @param {Object} makesModels JSON-style object of product makers with models
 * @returns {String} - Maker name
 */
const findMakerFromModel = (model, makesModels) => {
    if (!model) throw 'from findMakerFromModel: model parameter is empty';
    if (!makesModels || (Object.keys(makesModels).length === 0 && makesModels.constructor === Object)) throw 'from findMakerFromModel: makesModels parameter is empty';
    
    let foundName;
    const makerList = Object.keys(makesModels);
    
    makerList.map(maker => {      
        Object.keys(leaf(makesModels,maker)).map(makerModel => {
            if (makerModel.toUpperCase() === model.toUpperCase()) {               
                foundName = maker;
            }
        });
    });
    return foundName;
}
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function checkOtherMakerNames
 * @param {String} title the title of the product ad 
 * @param {String} model optional, model if known
 * @returns {String} - Maker name or undefined
 */
const checkOtherMakerNames = (title, model) => {
    if (!title) throw 'from searchOtherNamesArrray: title parameter is empty';
    
    const otherNames = getOtherMakerNames(productMakesModels);  
    let foundName = searchOtherNamesArray(title, otherNames); //business preference to try to parse maker from title before using model to find maker 
    
    if (!foundName && model) foundName = findMakerFromModel(model, productMakesModels);
    
    return foundName;
}
/**
 * Checks other model names if initial model search fails from makers/models JSON-style object
 * @function checkOtherModelNames
 * @param {String} title the title of the product ad
 * @returns {String} - Model name or undefined
 */
const checkOtherModelNames = (title) => {
    if (!title) throw 'from checkOtherModelNames: title parameter is empty';
    
    const otherNames = getOtherModelNames(productMakesModels);
    return searchOtherNamesArray(title, otherNames)
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
    const productKeys = Object.keys(productMakesModels);
    productKeys.map((maker) => {
        if (title.indexOf(maker)>-1) {
            productMaker = maker;
        } 
    });
    if (!productMaker) productMaker = checkOtherMakerNames(title, model);
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
    
    Array.from(getModelList(productMakesModels)).map((model) => {
        if (title.indexOf(model)>-1) {
            productModel = model;
        } 
    });
    if (!productModel) productModel = checkOtherModelNames(title);
    
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
        type = (leaf(leaf(productMakesModels, maker), model).harptype);
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
    console.log('from findProductSize', maker, model)
    let numStrings;
    try{
        numStrings = leaf(leaf(productMakesModels, maker), model).strings;
    } catch (err) {
        return 'not found';
    }
        
    return numStrings;
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
    getOtherModelNames,
    getOtherMakerNames,
    searchOtherNamesArray,
    checkOtherMakerNames,
    checkOtherModelNames,
    findMaker,
    findModel,
    findProductType,
    findProductSize,
    getMakeModelTypeSize
}
