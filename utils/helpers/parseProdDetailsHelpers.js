const { productMakesModels } = require('../../assets/constants/makerArray');

//helper for findModel function
const getModelList = makesModels => {
    if (!makesModels) throw 'makesModels parameter is empty';
    //leaf function helps find nested object keys,
    const leafHelper = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
    const productKeys = [];

    Object.keys(makesModels).map(maker => {
        productKeys.push(...Object.keys(leafHelper(makesModels, maker)));
    });
   
    return new Set(productKeys);
}

//helper of findMaker function in case maker name is spelled differently
const findMakerFromModel = (model) => {
    if (!model) throw 'model parameter is empty';
    const leafHelper = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
    
    let foundName;
    const makerList = Object.keys(productMakesModels);
    
    makerList.map(maker => {      
        Object.keys(leafHelper(productMakesModels,maker)).map(makerModel => {
            if (makerModel.toUpperCase() === model.toUpperCase()) {               
                foundName = maker;
            }
        });
    });
    if (!foundName) foundName = null;
    return foundName;
}
// function findOtherMakerNames() {
//     const leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
//     const otherNames = [];
    
//     Object.keys(productMakesModels).map(maker => {
//         if (leaf(productMakesModels,maker).othernames) {
//             otherNames.push([maker,[...leaf(productMakesModels,maker).othernames]]);
//         }
//     });   
//     return otherNames;  
// }
function findOtherMakerModelNames(type) {
    const leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
    const otherNames = [];
    const makerList = Object.keys(productMakesModels);
    
    if (type === 'maker') {
        Object.keys(productMakesModels).map(maker => {
            if (leaf(productMakesModels,maker).othernames) {
                otherNames.push([maker,[...leaf(productMakesModels,maker).othernames]]);
            }
        }); 
    } else if (type==='model') {
        makerList.map(maker => {      
            Object.keys(leaf(productMakesModels, maker)).map(model => {
                if (leaf(leaf(productMakesModels, maker), model).othernames) {
                    otherNames.push([model,[...leaf(leaf(productMakesModels, maker),model).othernames]]);
                }
            });
        });
    } else {
        throw 'From findOtherMakerModelNames, type variable is invalid.'
    }

    return otherNames;  
}

function checkOtherNames(title, type, model) {
    const othernames = findOtherMakerModelNames(type);
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
    if (!foundName || type === 'maker') foundName = findMakerFromModel(model);
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

exports.getModelList = getModelList;
exports.findMakerFromModel = findMakerFromModel;
exports.getMakeModelTypeSize = getMakeModelTypeSize;