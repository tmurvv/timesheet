// Mocha API
const {describe, it, beforeEach, afterEach, before, after} = require('mocha');
// Assertions module - chai!
const {expect} = require('chai');
// Sinon for fakes, stubs, and spies
const {sinon} = require('sinon');

const {productMakesModels} = require('../../assets/constants/makerArray');

// The code under test
const { getModelList, findMakerFromModel, getOtherMakerModelNames } = require('../helpers/parseProdDetailsHelpers');

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
const stubMakesModelsMissingArray = {
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
            'othernames': ['Premiere, Premeire']
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
        'othernames': 'Swansen'
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
    describe('Get Other Maker/Model Name Helper Function', () => {
        it('should throw error when no type passed in.', () => {
            expect(() => getOtherMakerModelNames(null, {"Salvi": "Iris"})).to.throw();
            expect(() => getOtherMakerModelNames(undefined, {"Salvi": "Iris"})).to.throw();
        });
        it('should throw error when no Maker/Model list passed in.', () => {
            expect(() => getOtherMakerModelNames('model', null)).to.throw();
            expect(() => getOtherMakerModelNames('model', undefined)).to.throw();
            expect(() => getOtherMakerModelNames('model', {})).to.throw();
        });
        it('Generates correct list when stub variable entered and type = model', () => {
            expect(Array.from(getOtherMakerModelNames('model', stubMakesModels))).to.eql([
                ["Traditional", ["Trad"]],
                ["Premier", ["Premiere", "Premeire"]], 
                ["Delphi", ["Delphy"]]
            ]);
        });
        it('Generates correct list when stub variable entered and type = maker', () => {
            expect(Array.from(getOtherMakerModelNames('maker', stubMakesModels))).to.eql([
                ["Venus", ["W&W Harps","W & W Harps"]],
                ["Swanson", ["Swansen"]]
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
});
