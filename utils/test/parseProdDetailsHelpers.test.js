// Mocha API
const {describe, it} = require('mocha');
// Assertions module - Chai!
const {expect} = require('chai');
// Sinon for fakes, stubs, and spies
const {sinon} = require('sinon');

const {productMakesModels} = require('../../assets/constants/makerArray');

// The code under test
const { 
    getModelList, 
    findMakerFromModel, 
    getOtherMakerNames, 
    getOtherModelNames,
    searchOtherNamesArray,
    checkOtherMakerNames,
    checkOtherModelNames
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
            expect(findMakerFromModel("Troubadour V ", productMakesModels)).to.equal('Lyon & Healy');
        });
    });
    describe('search other name array function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => findMakerFromModel(null)).to.throw();
            expect(() => findMakerFromModel(undefined)).to.throw();
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
});
