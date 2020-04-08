// Mocha API
const {describe, it} = require('mocha');

// Assertions module - Chai!
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;
chai.use(chaiAsPromised);
 
const {makesModels} = require('../../assets/constants/makesModels');

// The code under test
const { 
    getModelList, 
    findMakerFromModel, 
    getMakerArray, 
    getModelArray,
    searchAliasArray,
    checkMakerAliases,
    checkModelAliases,
    findMaker,
    findModel,
    findProductType,
    findProductSize,
    getMakeModelTypeSize
} = require('../helpers/parseProdDetailsHelpers');

const stubMakesModelsV1 = {
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
const stubMakesModels = [
    {
        "sellerAliases": [],
        "sellerName": "Aoyama",
        "sellerProducts": [
            {
                "productAliases": [
                    "Delphy"
                ],
                "_id": "5e8b7deea03397444c70624e",
                "productTitle": "Delphi",
                "productMaker": "Aoyama",
                "productType": "pedal",
                "productSize": 46
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70624f",
                "productTitle": "Irish 34",
                "productMaker": "Aoyama",
                "productType": "lever",
                "productSize": 34
            }
        ]
    },
    {
        "sellerAliases": [],
        "sellerName": "Blevins",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706269",
                "productTitle": "Encore 34",
                "productMaker": "Blevins",
                "productType": "lever",
                "productSize": 34
            }
        ]
    },
    {
        "sellerAliases": [],
        "sellerName": "Camac",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70623f",
                "productTitle": "Vendome",
                "productMaker": "Camac",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [
                    "Corrigan"
                ],
                "_id": "5e8b7deea03397444c706240",
                "productTitle": "Korrigan",
                "productMaker": "Camac",
                "productType": "lever",
                "productSize": 38
            },
            {
                "productAliases": [
                    "Hermine"
                ],
                "_id": "5e8b7deea03397444c706241",
                "productTitle": "Hermine",
                "productMaker": "Camac",
                "productType": "lever",
                "productSize": 34
            },
            {
                "productAliases": [
                    "Musaleen"
                ],
                "_id": "5e8b7deea03397444c706242",
                "productTitle": "Musaline",
                "productMaker": "Camac",
                "productType": "lever",
                "productSize": 38
            },
            {
                "productAliases": [
                    "Ulyses",
                    "Ulisses",
                    "Ulises"
                ],
                "_id": "5e8b7deea03397444c706243",
                "productTitle": "Ulysses",
                "productMaker": "Camac",
                "productType": "lever",
                "productSize": 34
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706244",
                "productTitle": "Isolde",
                "productMaker": "Camac",
                "productType": "lever",
                "productSize": 38
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706245",
                "productTitle": "Clio",
                "productMaker": "Camac",
                "productType": "lever",
                "productSize": 44
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706246",
                "productTitle": "DHC 32",
                "productMaker": "Camac",
                "productType": "lever",
                "productSize": 32
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706247",
                "productTitle": "DHC 36",
                "productMaker": "Camac",
                "productType": "lever",
                "productSize": 36
            }
        ]
    }
]
describe('Get Product Details Helper Functions', () => {
    describe('Get Model List Helper Function', () => {
        it('should throw error when no Maker/Model list passed in.', () => {
            expect(() => getModelList(null)).to.throw();
            expect(() => getModelList(undefined)).to.throw();
            expect(() => getModelList({})).to.throw();
        });
        it('Generates correct list when stub variable entered', () => {
            expect(Array.from(getModelList(stubMakesModels))).to.eql([ 
                "Clio",
                "DHC 32",
                "DHC 36",
                'Delphi',
                "Encore 34",
                "Hermine",
                'Irish 34',
                "Isolde",
                "Korrigan",
                "Musaline",
                "Ulysses",
                "Vendome"
            ]);
        });
    });
    // describe('Get Other Maker Name Helper Function', () => {
    //     it('should throw error when no Maker/Model list passed in.', () => {
    //         expect(() => getMakerArray(null)).to.throw();
    //         expect(() => getMakerArray(undefined)).to.throw();
    //         expect(() => getMakerArray({})).to.throw();
    //     });
    //     it('Generates correct other name list when stub variable entered', () => {
    //         expect(Array.from(getMakerArray(stubMakesModels))).to.eql([
    //             ["Venus", ["W&W Harps","W & W Harps"]],
    //             ["Swanson", ["Swansen"]]
    //         ]);
    //     });
    // });
    // describe('Get Other Model Name Helper Function', () => {
    //     it('should throw error when no Maker/Model list passed in.', () => {
    //         expect(() => getModelArray(null)).to.throw();
    //         expect(() => getModelArray(undefined)).to.throw();
    //         expect(() => getModelArray({})).to.throw();
    //     });
    //     it('Generates correct other name list when stub variable entered', () => {
    //         expect(Array.from(getModelArray(stubMakesModels))).to.eql([
    //             ["Traditional", ["Trad"]],
    //             ["Premier", ["Premiere", "Premeire"]], 
    //             ["Delphi", ["Delphy"]]
    //         ]);
    //     });
    // });
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
            expect(findMakerFromModel("Encore 34", makesModels)).to.equal('Blevins');
            expect(findMakerFromModel("85CG", makesModels)).to.equal('Lyon & Healy');
            expect(findMakerFromModel("Swan ", makesModels)).to.equal('Thormahlen');
            expect(findMakerFromModel("La Scuola", makesModels)).to.equal('Swanson');
            // expect(findMakerFromModel("Troubadour V", productMakesModels)).to.equal('Lyon & Healy'); // NOT YET IMPLEMENTED first need to fix find spaces after harps
        });
    });
    describe('search other name array function', () => {
        it('should throw error when no search item passed in', () => {
            expect(() => searchAliasArray(null, ['1',['1','2']])).to.throw();
            expect(() => searchAliasArray(undefined ['1',['1','2']])).to.throw();
        });
        it('should throw error when no other name array passed in.', () => {
            expect(() => searchAliasArray('Salvi')).to.throw();
            expect(() => searchAliasArray('Salvi', null)).to.throw();
            expect(() => searchAliasArray('Ogden', undefined)).to.throw();
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

            expect(searchAliasArray('Swansen La Scuola', makerArray)).to.equal('Swanson');
            expect(searchAliasArray('W&W Harps Premiere', makerArray)).to.equal('Venus');      
            expect(searchAliasArray('Venus Trad', modelArray)).to.equal('Traditional');      
            expect(searchAliasArray('Venus Premiere', modelArray)).to.equal('Premier');      
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
                
                expect(() => searchAliasArray('Beautiful harp', makerArray)).to.throw();
                expect(() => searchAliasArray('Beautiful harp', modelArray)).to.throw();  
            });
        });
    });
    describe('check Other Maker Names function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => checkMakerAliases(null)).to.throw();
            expect(() => checkMakerAliases(undefined)).to.throw();
        });
        
        it('Finds corrected maker name', () => {
            expect(checkMakerAliases('Swansen La Scuola', 'ModelName')).to.equal('Swanson');
            expect(checkMakerAliases('W & W Harps Premiere', 'ModelName')).to.equal('Venus');
        });
        it('Finds corrected maker name when maker not in product ad title, but model known', () => {
            //model validation takes place in calling function
            expect(checkMakerAliases('Beautiful La Scuola for sale', 'La Scuola')).to.equal('Swanson');
            expect(checkMakerAliases('Primiere (misspelled) Harp priced to sell', 'Premier')).to.equal('Venus');
        });
        it('returns undefined if model parameter is missing', () => {
            expect(checkMakerAliases('Premiere (misspelled) Harp priced to sell')).to.equal(undefined);
        });        
    });
    describe('check Other Model Names function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => checkModelAliases(null)).to.throw();
            expect(() => checkModelAliases(undefined)).to.throw();
        });
        it('Finds corrected model name', () => {
            expect(checkModelAliases('Aoyama Delphy Harp')).to.equal('Delphi');
            expect(checkModelAliases('W & W Harps Premiere')).to.equal('Premier');
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
            expect(findModel('Venus Premier')).to.equal('Premier');
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
            expect(findProductType('Blevins', 'Blahblah')).to.equal('not found');
            expect(findProductType('BlahBlah', 'Encore 34')).to.equal('not found');
        });
    });
    describe('find product size function', () => {
        it('should throw error when no maker passed in.', () => { // NOT YET IMPLEMENTED -- restore when makesModels written to it's own files
            expect(() => findProductSize(null, 'Ogden')).to.throw();
            expect(() => findProductSize(undefined, 'Ogden')).to.throw();
        });
        it('should throw error when no model passed in.', () => {
            expect(() => findProductSize('Salvi', null)).to.throw();
            expect(() => findProductSize('Salvi', undefined)).to.throw();
        });
        it('Finds correct product size', () => {
            expect(findProductSize('Swanson', 'La Scuola')).to.eql(47);
            expect(findProductSize('Blevins', 'Encore 34')).to.equal(34);
            expect(findProductSize('Blevins', 'Blahblah')).to.equal('not found');
            expect(findProductSize('BlahBlah', 'Encore 34')).to.equal('not found');
        });
    });
    describe('#getMakeModelSizeType function', function() {
        it('should throw error when no title passed in.', async function() {
            expect(getMakeModelTypeSize(null)).to.be.rejectedWith();
            expect(getMakeModelTypeSize(undefined)).to.be.rejectedWith();
        });
        
        it('responds with matching records', async function() {
            let detailArray = await getMakeModelTypeSize("Salvi Iris for sale");
            expect(detailArray).to.eql(['Salvi', 'Iris', 'pedal', 47]);
            detailArray = await getMakeModelTypeSize("Tripplett Sierra 36 now available");
            expect(detailArray).to.eql(['Triplett', 'Sierra 36', 'lever', 36]);
            detailArray = await getMakeModelTypeSize("Triplett Sierra 36 now available");
            expect(detailArray).to.eql(['Triplett', 'Sierra 36', 'lever', 36]);
            detailArray = await getMakeModelTypeSize('L&H 17 the best I have seen');
            expect(detailArray).to.eql(['Lyon & Healy', 'Style 17', 'pedal', 47]);
        });
    });
});
