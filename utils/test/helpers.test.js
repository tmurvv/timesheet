// Mocha API
const {describe, it, beforeEach, afterEach, before, after} = require('mocha');
// Assertions module - chai!
const {expect} = require('chai');
// Sinon for fakes, stubs, and spies
const {sinon} = require('sinon');

// The code under test
const helpers = require('../helpers/helpers');
// const getModelList = (makesModels) => {
//     console.log('makemods', makesModels);
//     // return 'here';
//     if (!makesModels) throw (Error);
//     // leaf function helps find nested object keys,
//     const leafHelper = (obj, path) => (path.split('.').reduce((value, el) => value[el], obj)); // from StackOverflow
//     const productKeys = [];

//     Object.keys(makesModels).map((maker) => {
//         productKeys.push(...Object.keys(leafHelper(makesModels, maker)));
//     });

//     return new Set(productKeys);
// };
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
        describe('MakerModel Variable absent throws error', () => {
            it('should throw error when no make/model list passed in.', () => {
                stubMakesModels = null;
                expect(() => helpers.getModelList(stubMakesModels)).to.throw();
            });
        });
        describe('MakerModel Variable present does not throw error', () => {
            it('should throw error when no make/model list passed in.', () => {
                expect(() => helpers.getModelList(stubMakesModels)).to.throw();
            });
        });
    });
});
