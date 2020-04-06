// Mocha API
const {describe, it} = require('mocha');

// Assertions module - Chai!
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;
chai.use(chaiAsPromised);
 
const {productMakesModels} = require('../../assets/constants/makerArray');

// The code under test
const { 
    getModelList, 
    findMakerFromModel, 
    getOtherMakerNames, 
    getOtherModelNames,
    searchOtherNamesArray,
    checkOtherMakerNames,
    checkOtherModelNames,
    findMaker,
    findModel,
    findProductType,
    findProductSize,
    getMakeModelTypeSize
} = require('../helpers/parseProdDetailsHelpers');

const stubMakesModels = {
    'Venus': {
        'Diplomat': {
            'harptype': 'pedal',
            'strings': '46'
        },
        'Traditional': {
            'harptype': 'pedal',
            'strings': '47',
            'othernames': ['Trad']
        },
        'Premier': {
            'harptype': 'pedal',
            'strings': '46',
            'othernames': ['Premiere', 'Premeire']
        },
        'othernames': ['W&W Harps', 'W & W Harps']
    },
    'Aoyama': {
        'Delphi': {
            'harptype': 'pedal',
            'strings': '46',
            'othernames': ['Delphy']
        },
        'Irish 34': {
            'harptype': 'lever',
            'strings': '34'
        }
    },
    'Swanson': {
        'La Scuola': {
            'harptype': 'pedal',
            'strings': '47'
        },
        'othernames': ['Swansen']
    }
};
describe('Get Product Details Helper Functions', () => {
    describe('Get Model List Helper Function', () => {
        it('should throw error when no Maker/Model list passed in.', () => {
            expect(() => getModelList(null)).to.throw();
            expect(() => getModelList(undefined)).to.throw();
            expect(() => getModelList({})).to.throw();
        });
        it('Generates correct list when stub variable entered', () => {
            expect(Array.from(getModelList(stubMakesModels))).to.eql([ 'Diplomat',
            'Traditional',
            'Premier',
            'othernames',
            'Delphi',
            'Irish 34',
            'La Scuola' ]);
        });
    });
    describe('Get Other Maker Name Helper Function', () => {
        it('should throw error when no Maker/Model list passed in.', () => {
            expect(() => getOtherMakerNames(null)).to.throw();
            expect(() => getOtherMakerNames(undefined)).to.throw();
            expect(() => getOtherMakerNames({})).to.throw();
        });
        it('Generates correct other name list when stub variable entered', () => {
            expect(Array.from(getOtherMakerNames(stubMakesModels))).to.eql([
                ["Venus", ["W&W Harps","W & W Harps"]],
                ["Swanson", ["Swansen"]]
            ]);
        });
    });
    describe('Get Other Model Name Helper Function', () => {
        it('should throw error when no Maker/Model list passed in.', () => {
            expect(() => getOtherModelNames(null)).to.throw();
            expect(() => getOtherModelNames(undefined)).to.throw();
            expect(() => getOtherModelNames({})).to.throw();
        });
        it('Generates correct other name list when stub variable entered', () => {
            expect(Array.from(getOtherModelNames(stubMakesModels))).to.eql([
                ["Traditional", ["Trad"]],
                ["Premier", ["Premiere", "Premeire"]], 
                ["Delphi", ["Delphy"]]
            ]);
        });
    });
    describe('Find Maker From Model Function', () => {
        it('should throw error when no model passed in.', () => {
            expect(() => findMakerFromModel(null, {"Salvi": "Iris"})).to.throw();
            expect(() => findMakerFromModel(undefined, {"Salvi": "Iris"})).to.throw();
        });
        it('should throw error when no Maker/Model list passed in.', () => {
            expect(() => findMakerFromModel('harpModel', null)).to.throw();
            expect(() => findMakerFromModel('harpModel', undefined)).to.throw();
            expect(() => findMakerFromModel('harpModel', {})).to.throw();
        });

        // model is already validated in calling function
        it('Generates correct Maker when model variable entered', () => {
            expect(findMakerFromModel("Encore 34", productMakesModels)).to.equal('Blevins');
            expect(findMakerFromModel("85CG", productMakesModels)).to.equal('Lyon & Healy');
            expect(findMakerFromModel("Swan ", productMakesModels)).to.equal('Thormahlen');
            expect(findMakerFromModel("La Scuola", productMakesModels)).to.equal('Swanson');
            // expect(findMakerFromModel("Troubadour V", productMakesModels)).to.equal('Lyon & Healy'); // NOT YET IMPLEMENTED first need to fix find spaces after harps
        });
    });
    describe('search other name array function', () => {
        it('should throw error when no search item passed in', () => {
            expect(() => searchOtherNamesArray(null, ['1',['1','2']])).to.throw();
            expect(() => searchOtherNamesArray(undefined ['1',['1','2']])).to.throw();
        });
        it('should throw error when no other name array passed in.', () => {
            expect(() => searchOtherNamesArray('Salvi')).to.throw();
            expect(() => searchOtherNamesArray('Salvi', null)).to.throw();
            expect(() => searchOtherNamesArray('Ogden', undefined)).to.throw();
        });
        it('Finds corrected maker and model names', () => {
            const makerArray = [
                ["Venus", ["W&W Harps","W & W Harps"]],
                ["Swanson", ["Swansen"]]
            ];
            const modelArray = [
                ["Traditional", ["Trad"]],
                ["Premier", ["Premiere", "Premeire"]]
            ];

            expect(searchOtherNamesArray('Swansen La Scuola', makerArray)).to.equal('Swanson');
            expect(searchOtherNamesArray('W&W Harps Premiere', makerArray)).to.equal('Venus');      
            expect(searchOtherNamesArray('Venus Trad', modelArray)).to.equal('Traditional');      
            expect(searchOtherNamesArray('Venus Premiere', modelArray)).to.equal('Premier');      
        });
        describe('search other name array function -> checkOtherMakers and Models', () => {
            it('checks that othername is type array', () => {
                const makerArray = [
                    ["Venus", ["W&W Harps","W & W Harps"]],
                    ["Swanson", "Swansen"] // element[1] should be an array
                ];
                const modelArray = [
                    ["Traditional", "Trad"], // element[1] should be an array
                    ["Premier", ["Premiere", "Premeire"]]
                ];
                
                expect(() => searchOtherNamesArray('Beautiful harp', makerArray)).to.throw();
                expect(() => searchOtherNamesArray('Beautiful harp', modelArray)).to.throw();  
            });
        });
    });
    describe('check Other Maker Names function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => checkOtherMakerNames(null)).to.throw();
            expect(() => checkOtherMakerNames(undefined)).to.throw();
        });
        
        it('Finds corrected maker name', () => {
            expect(checkOtherMakerNames('Swansen La Scuola', 'ModelName')).to.equal('Swanson');
            expect(checkOtherMakerNames('W & W Harps Premiere', 'ModelName')).to.equal('Venus');
        });
        it('Finds corrected maker name when maker not in product ad title, but model known', () => {
            //model validation takes place in calling function
            expect(checkOtherMakerNames('Beautiful La Scuola for sale', 'La Scuola')).to.equal('Swanson');
            expect(checkOtherMakerNames('Primiere (misspelled) Harp priced to sell', 'Premier')).to.equal('Venus');
        });
        it('returns undefined if model parameter is missing', () => {
            expect(checkOtherMakerNames('Premiere (misspelled) Harp priced to sell')).to.equal(undefined);
        });        
    });
    describe('check Other Model Names function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => checkOtherModelNames(null)).to.throw();
            expect(() => checkOtherModelNames(undefined)).to.throw();
        });
        it('Finds corrected model name', () => {
            expect(checkOtherModelNames('Aoyama Delphy Harp')).to.equal('Delphi');
            expect(checkOtherModelNames('W & W Harps Premiere')).to.equal('Premier');
        });
    });
    describe('find maker function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => findMaker(null)).to.throw();
            expect(() => findMaker(undefined)).to.throw();
        });
        it('Finds maker name', () => {
            expect(findMaker('Swanson La Scuola', 'La Scuola')).to.equal('Swanson');
            expect(findMaker('Venus Premiere', 'Premier')).to.equal('Venus');
        });
        it('Finds maker when misspelled', () => {
            expect(findMaker('Swansen La Scuola', 'La Scuola')).to.equal('Swanson');
            expect(findMaker('W&W Harps Premiere', 'Premier')).to.equal('Venus');
        });
        it('Finds maker when no maker in title', () => {
            expect(findMaker('Beautiful La Scuola', 'La Scuola')).to.equal('Swanson');
            expect(findMaker('Premiere priced to sell', 'Premier')).to.equal('Venus');
        });
        it('returns undefined if model parameter is missing', () => {
            expect(findMaker('Premiere (misspelled) Harp priced to sell')).to.equal(undefined);
        });
    });
    describe('find model function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => findModel(null)).to.throw();
            expect(() => findModel(undefined)).to.throw();
        });
        it('Finds model name', () => {
            expect(findModel('Swanson La Scuola')).to.equal('La Scuola');
            expect(findModel('Venus Premiere')).to.equal('Premier');
        });
        it('Finds model when misspelled', () => {
            expect(findModel('Swansen La Scuala')).to.equal('La Scuola');
            expect(findModel('W&W Harps Premiere')).to.equal('Premier');
        });
    });
    describe('find product type function', () => {
        it('should throw error when no maker passed in.', () => {
            expect(() => findProductType(null, 'Ogden')).to.throw();
            expect(() => findProductType(undefined, 'Ogden')).to.throw();
        });
        it('should throw error when no model passed in.', () => {
            expect(() => findProductType('Salvi', null)).to.throw();
            expect(() => findProductType('Salvi', undefined)).to.throw();
        });
        it('Finds correct product type', () => {
            expect(findProductType('Swanson', 'La Scuola')).to.equal('pedal');
            expect(findProductType('Blevins', 'Encore 34')).to.equal('lever');
        });
    });
    describe('find product size function', () => {
        it('should throw error when no maker passed in.', () => {
            expect(() => findProductSize(null, 'Ogden')).to.throw();
            expect(() => findProductSize(undefined, 'Ogden')).to.throw();
        });
        it('should throw error when no model passed in.', () => {
            expect(() => findProductSize('Salvi', null)).to.throw();
            expect(() => findProductSize('Salvi', undefined)).to.throw();
        });
        it('Finds correct product size', () => {
            expect(findProductSize('Swanson', 'La Scuola')).to.equal('47');
            expect(findProductSize('Blevins', 'Encore 34')).to.equal('34');
        });
    });
    describe('#getMakeModelSizeType function', function() {
        // it('should throw an error when no user ID is provided', () => {
        //     expect(Client.getUserRecommendations(null, {})).be.rejectedWith(/Missing/);
        //   });
        
        it('should throw error when no title passed in.', async function() {
            expect(getMakeModelTypeSize(null)).to.be.rejectedWith();
            expect(getMakeModelTypeSize(undefined)).to.be.rejectedWith();
        });
        
        it('responds with matching records', async function() {
            let detailArray = await getMakeModelTypeSize("Salvi Iris for sale");
            expect(detailArray).to.eql(['Salvi', 'Iris', 'pedal', '47']);
            detailArray = await getMakeModelTypeSize("Tripplett Siera 36 now available");
            expect(detailArray).to.eql(['Triplett', 'Sierra 36', 'lever', '36']);
            detailArray = await getMakeModelTypeSize('L&H 17 the best I have seen');
            expect(detailArray).to.eql(['Lyon & Healy', 'Style 17', 'pedal', '47']);
        });
    });
});
