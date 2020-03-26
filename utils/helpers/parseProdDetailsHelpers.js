const { productMakesModels } = require('../../assets/constants/makerArray');

/**
 * Traverses an object parsing out an object from the next levelfrom maker/model JSON-style object
 * @function
 * @param {Object} makesModels JSON-style object of product makers with models
 * @returns {Set} - Set of Models
 */
const leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
    
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
        name[1].map(altName => {
            if (title.toUpperCase().indexOf(altName.toUpperCase()) > -1) foundName = name[0]; 
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
    if (!foundName) foundName = null;
    return foundName;
}
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function checkOtherMakerNames
 * @param {String} title the title of the product ad 
 * @param {String} model optional, model if known
 * @returns {String} - Maker name
 */
const checkOtherMakerNames = (title, model) => {
    if (!title) throw 'from searchOtherNamesArrray: title parameter is empty';
    
    const otherNames = getOtherMakerNames(productMakesModels);  
    let foundName = searchOtherNamesArray(title, otherNames); //business preference to try to parse maker from title before using model to find maker 
    if (!foundName) foundName = findMakerFromModel(model, productMakesModels);
    
    return foundName;
}
const checkOtherModelNames = (title) => {
    const otherNames = getOtherModelNames(productMakesModels);
    return searchOtherNamesArray(title, otherNames)
}

function findMaker(title, model) {
    let productMaker;
    const productKeys = Object.keys(productMakesModels);
    if (title) {
        productKeys.map((maker) => {
            if (title.indexOf(maker)>-1) {
                productMaker = maker;
            } 
        });
    } else {
        console.log('no title')
    }
    if (!productMaker) productMaker = checkOtherMakerNames(title, model);
    return productMaker;
}

function findModel(title) {
    if (!title) return null;
    let productModel;
    
    Array.from(getModelList(productMakesModels)).map((model) => {
        if (title.indexOf(model)>-1) {
            productModel = model;
        } 
    });
    
    if (!productModel) productModel = checkOtherModelNames(title);
    
    return productModel;
}

function findProductType(maker, model) {
    //short circuit
    if (!model||!maker) return null;
    //leaf function helps find nested object keys,
    const leafHelper = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow

    const makerHarps = leafHelper(productMakesModels, maker);
    if (leafHelper(makerHarps, model)&&leafHelper(makerHarps, model).harptype) {
        return leafHelper(makerHarps, model).harptype;
    } else {
        return null;
    }
}
function findProductSize(maker, model) {
    //short circuit
    if (!model||!maker) return null;
    //leaf function helps find nested object keys,
    const leafHelper = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
  
    const makerHarps = leafHelper(productMakesModels, maker);
    if (leafHelper(makerHarps, model)&&leafHelper(makerHarps, model).strings) {
        return leafHelper(makerHarps, model).strings;
    } else {
        return null;
    }
}

const getMakeModelTypeSize = async (title) => {
    const model = await findModel(title);
    const maker = await findMaker(title, model);
    const type = findProductType(maker, model);
    const size = findProductSize(maker, model);
    
    return [maker, model, type, size];  
}

exports.leaf = leaf;
exports.getModelList = getModelList;
exports.findMakerFromModel = findMakerFromModel;
exports.getMakeModelTypeSize = getMakeModelTypeSize;
exports.getOtherModelNames = getOtherModelNames;
exports.getOtherMakerNames = getOtherMakerNames;
exports.searchOtherNamesArray = searchOtherNamesArray;
exports.checkOtherMakerNames = checkOtherMakerNames;
exports.checkOtherModelNames = checkOtherModelNames;