// Mocha API
const {describe, it, beforeEach, afterEach, before, after} = require('mocha');
// Assertions module - chai!
const {expect} = require('chai');
// Sinon for fakes, stubs, and spies
const {sinon} = require('sinon');

// The code under test
const { getModelList, findMakerFromModel } = require('../helpers/parseProdDetailsHelpers');
// const helpers = require('../helpers/helpers');
// function getModelList(makesModels) {
//     if (!makesModels) throw 'makesModels variable is null/undefined';
//     //leaf function helps find nested object keys,
//     const leafHelper = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)) //from StackOverflow
//     const productKeys = [];

//     Object.keys(makesModels).map(maker => {
//         productKeys.push(...Object.keys(leafHelper(makesModels, maker)));
//     });
   
//     return new Set(productKeys);
// }

let stubMakesModels = {
    'Venus': {
        'Diplomat': {
            'harptype': 'pedal',
            'strings': '46'
        },
        'Traditional': {
            'harptype': 'pedal',
            'strings': '47'
        },
        'Premier': {
            'harptype': 'pedal',
            'strings': '46',
            'othernames': ['Premiere']
        },
        'othernames': ['W&W Harps', 'W & W Harps']
    },
    'Aoyama': {
        'Delphi': {
            'harptype': 'pedal',
            'strings': '46'
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
        }
    }
};
describe('Get Product Details Helper Functions', () => {
    describe('Get Model List Helper Function', () => {
        it('should throw error when no make/model list passed in.', () => {
            expect(() => getModelList(null)).to.throw();
            expect(() => getModelList(undefined)).to.throw();
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
    describe('Find Maker From Model Function', () => {
        it('should throw error when no model passed in.', () => {
            expect(() => findMakerFromModel(null)).to.throw();
            expect(() => findMakerFromModel(undefined)).to.throw();
        });

        // model is already validated in calling function
        it('Generates correct Maker when model variable entered', () => {
            expect(findMakerFromModel("Encore 34")).to.equal('Blevins');
            expect(findMakerFromModel("85CG")).to.equal('Lyon & Healy');
            expect(findMakerFromModel("Swan ")).to.equal('Thormahlen');
            expect(findMakerFromModel("La Scuola")).to.equal('Swanson');
            expect(findMakerFromModel("Troubadour V ")).to.equal('Lyon & Healy');
        });
    });
});
