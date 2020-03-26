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
 * @function
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
 * Gets a list of all misspellings and colloquialisms of maker or model names from maker/model JSON-style object
 * @function
 * @param {String} type either 'maker' or 'model'
 * @param {Object} makesModels JSON-style object of product makers with models
 * @returns {Array} - Array of Arrays containing [correctMakerName, [othernames]] or [correctModelName, [othernames]]
 */
const getOtherMakerModelNames = (type, makesModels) => {
    if (!type) throw 'from getOtherMakerModelNames: type parameter is empty';
    if (!makesModels || (Object.keys(makesModels).length === 0 && makesModels.constructor === Object)) throw 'from getOtherMakerModelNames: type parameter is empty';
    const otherNames = [];
    const makerList = Object.keys(makesModels);
    
    if (type === 'maker') {
        Object.keys(makesModels).map(maker => {
            if (leaf(makesModels,maker).othernames) {
                otherNames.push([maker,[...leaf(makesModels,maker).othernames]]);
            }
        }); 
    } else if (type==='model') {
        makerList.map(maker => {      
            Object.keys(leaf(makesModels, maker)).map(model => {
                if (leaf(leaf(makesModels, maker), model).othernames) {
                    otherNames.push([model,[...leaf(leaf(makesModels, maker),model).othernames]]);
                }
            });
        });
    }
    return otherNames;  
}

/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function
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


function checkOtherNames(title, type, model) {
    const othernames = getOtherMakerModelNames(type, productMakesModels);
    let foundName;
    if (othernames) {
        othernames.map(name => {
            name[1].map(altName => {
                if (title.toUpperCase().indexOf(altName.toUpperCase()) > -1) foundName = name[0]; 
            });                     
        });
    } else {
        console.log("Other names not found.");
    }
    if (!foundName || type === 'maker') foundName = findMakerFromModel(model, productMakesModels);
    return foundName;
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
    if (!productMaker) productMaker = checkOtherNames(title, 'maker', model);
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
    
    if (!productModel) productModel = checkOtherNames(title, 'model');
    
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
exports.getOtherMakerModelNames = getOtherMakerModelNames;