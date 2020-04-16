// Mocha API
const {describe, it} = require('mocha');

// Assertions module - Chai!
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;
chai.use(chaiAsPromised);

// The code under test
const { 
    getModelList, 
    findMakerFromModel, 
    getMakerAliasArray, 
    getModelAliasArray,
    searchAliasArray,
    checkMakerAliases,
    checkModelAliases,
    findMaker,
    findModel,
    findProductType,
    findProductSize,
    getMakeModelTypeSize
} = require('../helpers/parseProdDetailsHelpers');

const makesModels = [
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
    },
    {
        "sellerAliases": [],
        "sellerName": "Clarke",
        "sellerProducts": []
    },
    {
        "sellerAliases": [],
        "sellerName": "Cunningham",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706267",
                "productTitle": "Cunningham 35",
                "productMaker": "Cunningham",
                "productType": "lever",
                "productSize": 35
            }
        ]
    },
    {
        "sellerAliases": [
            "Dusty"
        ],
        "sellerName": "Dusty Strings",
        "sellerProducts": [
            {
                "productAliases": [
                    "Ravena 26"
                ],
                "_id": "5e8b7deea03397444c706254",
                "productTitle": "Ravenna 26 ",
                "productMaker": "Dusty Strings",
                "productType": "lever",
                "productSize": 26
            },
            {
                "productAliases": [
                    "Ravena 34",
                    "Ravenna",
                    "Ravena"
                ],
                "_id": "5e8b7deea03397444c706255",
                "productTitle": "Ravenna 34",
                "productMaker": "Dusty Strings",
                "productType": "lever",
                "productSize": 34
            },
            {
                "productAliases": [
                    "Serana",
                    "Serrana"
                ],
                "_id": "5e8b7deea03397444c706256",
                "productTitle": "Serrana 34",
                "productMaker": "Dusty Strings",
                "productType": "lever",
                "productSize": 34
            },
            {
                "productAliases": [
                    "Boulevard",
                    "Bolevard 34",
                    "Bolevard"
                ],
                "_id": "5e8b7deea03397444c706257",
                "productTitle": "Boulevard Classic 34",
                "productMaker": "Dusty Strings",
                "productType": "lever",
                "productSize": 34
            },
            {
                "productAliases": [
                    "FH36"
                ],
                "_id": "5e8b7deea03397444c706258",
                "productTitle": "FH36H",
                "productMaker": "Dusty Strings",
                "productType": "lever",
                "productSize": 36
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706259",
                "productTitle": "FH36S",
                "productMaker": "Dusty Strings",
                "productType": "lever",
                "productSize": 36
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70625a",
                "productTitle": "FH26",
                "productMaker": "Dusty Strings",
                "productType": "lever",
                "productSize": 26
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70625b",
                "productTitle": "Allegro 26",
                "productMaker": "Dusty Strings",
                "productType": "lever",
                "productSize": 26
            }
        ]
    },
    {
        "sellerAliases": [],
        "sellerName": "Hayden",
        "sellerProducts": [
            {
                "productAliases": [
                    "Hayden Harp"
                ],
                "_id": "5e8b7deea03397444c706277",
                "productTitle": "Hayden 24",
                "productMaker": "Hayden",
                "productType": "lever",
                "productSize": 24
            }
        ]
    },
    {
        "sellerAliases": [],
        "sellerName": "Heartland",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70626c",
                "productTitle": "Sylvan",
                "productMaker": "Heartland",
                "productType": "lever",
                "productSize": 36
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70626d",
                "productTitle": "Delight",
                "productMaker": "Heartland",
                "productType": "lever",
                "productSize": 38
            }
        ]
    },
    {
        "sellerAliases": [],
        "sellerName": "Horngacher",
        "sellerProducts": []
    },
    {
        "sellerAliases": [
            "Mike Lewis"
        ],
        "sellerName": "Lewis",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70627d",
                "productTitle": "Arie",
                "productMaker": "Lewis",
                "productType": "lever",
                "productSize": 22
            }
        ]
    },
    {
        "sellerAliases": [
            "Lyon Healy",
            "L & H",
            "L&H"
        ],
        "sellerName": "Lyon & Healy",
        "sellerProducts": [
            {
                "productAliases": [
                    "85 concert",
                    "85 concert grand",
                    "85 CG"
                ],
                "_id": "5e8b7deea03397444c706234",
                "productTitle": "85CG",
                "productMaker": "Lyon & Healy",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [
                    " 23 "
                ],
                "_id": "5e8b7deea03397444c706235",
                "productTitle": "Style 23",
                "productMaker": "Lyon & Healy",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [
                    " 30 "
                ],
                "_id": "5e8b7deea03397444c706236",
                "productTitle": "Style 30",
                "productMaker": "Lyon & Healy",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [
                    " 100 "
                ],
                "_id": "5e8b7deea03397444c706237",
                "productTitle": "Style 100",
                "productMaker": "Lyon & Healy",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [
                    "85 E",
                    "85 Extended"
                ],
                "_id": "5e8b7deea03397444c706238",
                "productTitle": "85E",
                "productMaker": "Lyon & Healy",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [
                    "17"
                ],
                "_id": "5e8b7deea03397444c706239",
                "productTitle": "Style 17",
                "productMaker": "Lyon & Healy",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [
                    "Troubadour"
                ],
                "_id": "5e8b7deea03397444c70623a",
                "productTitle": "Troubadour VI",
                "productMaker": "Lyon & Healy",
                "productType": "lever",
                "productSize": 36
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70623b",
                "productTitle": "Troubadour V",
                "productMaker": "Lyon & Healy",
                "productType": "lever",
                "productSize": 36
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70623c",
                "productTitle": "Ogden",
                "productMaker": "Lyon & Healy",
                "productType": "lever",
                "productSize": 34
            },
            {
                "productAliases": [
                    "Prelude"
                ],
                "_id": "5e8b7deea03397444c70623d",
                "productTitle": "Prelude 40",
                "productMaker": "Lyon & Healy",
                "productType": "lever",
                "productSize": 40
            }
        ]
    },
    {
        "sellerAliases": [
            "Newsome"
        ],
        "sellerName": "Newsom",
        "sellerProducts": []
    },
    {
        "sellerAliases": [],
        "sellerName": "Noteworthy",
        "sellerProducts": [
            {
                "productAliases": [
                    "Count Kerry"
                ],
                "_id": "5e8b7deea03397444c70626f",
                "productTitle": "County Kerry",
                "productMaker": "Noteworthy",
                "productType": "lever",
                "productSize": 24
            }
        ]
    },
    {
        "sellerAliases": [],
        "sellerName": "Pilgrim",
        "sellerProducts": []
    },
    {
        "sellerAliases": [],
        "sellerName": "Pratt",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706274",
                "productTitle": "Chamber",
                "productMaker": "Pratt",
                "productType": "lever",
                "productSize": 36
            }
        ]
    },
    {
        "sellerAliases": [],
        "sellerName": "Rees",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706279",
                "productTitle": "Harpsicle",
                "productMaker": "Rees",
                "productType": "lever-free",
                "productSize": 26
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70627a",
                "productTitle": "Aberdeen Meadows",
                "productMaker": "Rees",
                "productType": "lever",
                "productSize": 36
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70627b",
                "productTitle": "Mariposa",
                "productMaker": "Rees",
                "productType": "lever",
                "productSize": 34
            }
        ]
    },
    {
        "sellerAliases": [],
        "sellerName": "Salvi",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706227",
                "productTitle": "Arianna",
                "productMaker": "Salvi",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [
                    "Arora"
                ],
                "_id": "5e8b7deea03397444c706228",
                "productTitle": "Aurora",
                "productMaker": "Salvi",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706229",
                "productTitle": "Apollo",
                "productMaker": "Salvi",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70622a",
                "productTitle": "Diana",
                "productMaker": "Salvi",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70622b",
                "productTitle": "Iris",
                "productMaker": "Salvi",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [
                    "Daphne 47",
                    "Daphne",
                    "Daphne 47EX"
                ],
                "_id": "5e8b7deea03397444c70622c",
                "productTitle": "Daphne 47 EX",
                "productMaker": "Salvi",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70622d",
                "productTitle": "Titan",
                "productMaker": "Salvi",
                "productType": "lever",
                "productSize": 38
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70622e",
                "productTitle": "Mia",
                "productMaker": "Salvi",
                "productType": "lever",
                "productSize": 34
            },
            {
                "productAliases": [
                    "Gia",
                    "Gai",
                    "Giai"
                ],
                "_id": "5e8b7deea03397444c70622f",
                "productTitle": "Gaia",
                "productMaker": "Salvi",
                "productType": "lever",
                "productSize": 38
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706230",
                "productTitle": "Livia",
                "productMaker": "Salvi",
                "productType": "lever",
                "productSize": 36
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706231",
                "productTitle": "Egan",
                "productMaker": "Salvi",
                "productType": "lever",
                "productSize": 38
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706232",
                "productTitle": "Juno",
                "productMaker": "Salvi",
                "productType": "lever",
                "productSize": null
            }
        ]
    },
    {
        "sellerAliases": [
            "Swansen"
        ],
        "sellerName": "Swanson",
        "sellerProducts": [
            {
                "productAliases": [
                    "La Scuala"
                ],
                "_id": "5e8b7deea03397444c706251",
                "productTitle": "La Scuola",
                "productMaker": "Swanson",
                "productType": "pedal",
                "productSize": 47
            }
        ]
    },
    {
        "sellerAliases": [
            "Thormalen"
        ],
        "sellerName": "Thormahlen",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706264",
                "productTitle": "Swan ",
                "productMaker": "Thormahlen",
                "productType": "lever",
                "productSize": 36
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706265",
                "productTitle": "Ceili",
                "productMaker": "Thormahlen",
                "productType": "lever",
                "productSize": 34
            }
        ]
    },
    {
        "sellerAliases": [
            "Tripplett",
            "Triplet",
            "Tripplet"
        ],
        "sellerName": "Triplett",
        "sellerProducts": [
            {
                "productAliases": [
                    "Sierra",
                    "Siera"
                ],
                "_id": "5e8b7deea03397444c70625d",
                "productTitle": "Sierra 34",
                "productMaker": "Triplett",
                "productType": "lever",
                "productSize": 34
            },
            {
                "productAliases": [
                    "Sierra",
                    "Siera"
                ],
                "_id": "5e8b7deea03397444c70625e",
                "productTitle": "Sierra 36",
                "productMaker": "Triplett",
                "productType": "lever",
                "productSize": 36
            },
            {
                "productAliases": [
                    "Signature"
                ],
                "_id": "5e8b7deea03397444c70625f",
                "productTitle": "Signature 36",
                "productMaker": "Triplett",
                "productType": "lever",
                "productSize": 36
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706260",
                "productTitle": "Catalina",
                "productMaker": "Triplett",
                "productType": "lever",
                "productSize": 34
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706261",
                "productTitle": "Celtic II",
                "productMaker": "Triplett",
                "productType": "lever",
                "productSize": 34
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706262",
                "productTitle": "Nino",
                "productMaker": "Triplett",
                "productType": "lever",
                "productSize": 30
            }
        ]
    },
    {
        "sellerAliases": [
            "W&W Harps",
            "W & W Harps"
        ],
        "sellerName": "Venus",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70624a",
                "productTitle": "Diplomat",
                "productMaker": "Venus",
                "productType": "pedal",
                "productSize": 46
            },
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c70624b",
                "productTitle": "Traditional",
                "productMaker": "Venus",
                "productType": "pedal",
                "productSize": 47
            },
            {
                "productAliases": [
                    "Premiere"
                ],
                "_id": "5e8b7deea03397444c70624c",
                "productTitle": "Premier",
                "productMaker": "Venus",
                "productType": "pedal",
                "productSize": 46
            }
        ]
    },
    {
        "sellerAliases": [],
        "sellerName": "Wurlitzer",
        "sellerProducts": []
    },
    {
        "sellerAliases": [
            "Jack Yule"
        ],
        "sellerName": "Yule",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "5e8b7deea03397444c706271",
                "productTitle": "Clarsach",
                "productMaker": "Yule",
                "productType": "lever",
                "productSize": 34
            }
        ]
    },
    {
        "sellerAliases": ['walnut', 'mahogany', 'ebony', 'cherry', 'bubinga', 'natural', 'gold', 'maple', 'other'],
        "sellerName": "finishes",
        "sellerProducts": [
            {
                "productAliases": [],
                "_id": "",
                "productTitle": "",
                "productMaker": "",
                "productType": "",
                "productSize": 0
            }
        ],
    }
];

const stubMakesModels = [
    {
        "sellerAliases": ['ayama', 'aoyam'],
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
        "sellerAliases": ['Blevin'],
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
        "sellerAliases": ["C-mac"],
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
    describe('Get Maker Aliases Helper Function', () => {
        it('should throw error when no Maker/Model list passed in.', () => {
            expect(() => getMakerAliasArray(null)).to.throw();
            expect(() => getMakerAliasArray(undefined)).to.throw();
            expect(() => getMakerAliasArray([])).to.throw();
        });
        it('Generates correct other name list when stub variable entered', () => {
            expect(Array.from(getMakerAliasArray(stubMakesModels))).to.eql([
                [ "Aoyama", ["ayama","aoyam"]],
                ["Blevins",["Blevin"]],
                ["Camac", ["C-mac"]]
            ]);
        });
    });
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
        describe('search Alias array function -> checkOtherMakers and Models', () => {
            it('checks that Alias array is type array', () => {
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
    describe('check Maker Aliases function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => checkMakerAliases(null)).to.throw();
            expect(() => checkMakerAliases(undefined)).to.throw();
        });
        
        it('Finds corrected maker name', () => {
            expect(checkMakerAliases('Swansen La Scuola', 'ModelName', makesModels)).to.equal('Swanson');
            expect(checkMakerAliases('W & W Harps Premiere', 'ModelName', makesModels)).to.equal('Venus');
        });
        it('Finds corrected maker name when maker not in product ad title, but model known', () => {
            //model validation takes place in calling function
            expect(checkMakerAliases('Beautiful La Scuola for sale', 'La Scuola', makesModels)).to.equal('Swanson');
            expect(checkMakerAliases('Primiere (misspelled) Harp priced to sell', 'Premier', makesModels)).to.equal('Venus');
        });
        it('returns undefined if model parameter is missing', () => {
            expect(checkMakerAliases('Premiere (misspelled) Harp priced to sell', '', makesModels)).to.eql(undefined);
        });        
    });
    describe('check Other Model Names function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => checkModelAliases(null, makesModels)).to.throw();
            expect(() => checkModelAliases(undefined, makesModels)).to.throw();
        });
        it('Finds corrected model name', () => {
            expect(checkModelAliases('Aoyama Delphy Harp', makesModels)).to.equal('Delphi');
            expect(checkModelAliases('W & W Harps Premiere', makesModels)).to.equal('Premier');
        });
    });
    describe('find maker function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => findMaker(null, makesModels)).to.throw();
            expect(() => findMaker(undefined, makesModels)).to.throw();
        });
        it('Finds maker name', () => {
            expect(findMaker('Swanson La Scuola', 'La Scuola', makesModels)).to.equal('Swanson');
            expect(findMaker('Venus Premiere', 'Premier', makesModels)).to.equal('Venus');
        });
        it('Finds maker when misspelled', () => {
            expect(findMaker('Swansen La Scuola', 'La Scuola', makesModels)).to.equal('Swanson');
            expect(findMaker('W&W Harps Premiere', 'Premier', makesModels)).to.equal('Venus');
        });
        it('Finds maker when no maker in title', () => {
            expect(findMaker('Beautiful La Scuola', 'La Scuola', makesModels)).to.equal('Swanson');
            expect(findMaker('Premiere priced to sell', 'Premier', makesModels)).to.equal('Venus');
        });
        it('returns undefined if model parameter is missing', () => {
            expect(findMaker('Premiere (misspelled) Harp priced to sell', '', makesModels)).to.equal(undefined);
        });
    });
    describe('find model function', () => {
        it('should throw error when no title passed in.', () => {
            expect(() => findModel(null, makesModels)).to.throw();
            expect(() => findModel(undefined, makesModels)).to.throw();
        });
        it('Finds model name', () => {
            expect(findModel('Swanson La Scuola', makesModels)).to.equal('La Scuola');
            expect(findModel('Venus Premier', makesModels)).to.equal('Premier');
        });
        it('Finds model when misspelled', () => {
            expect(findModel('Swansen La Scuala', makesModels)).to.equal('La Scuola');
            expect(findModel('W&W Harps Premiere', makesModels)).to.equal('Premier');
        });
    });
    describe('find product type function', () => {
        it('should throw error when no maker passed in.', () => {
            expect(() => findProductType(null, 'Ogden', makesModels)).to.throw();
            expect(() => findProductType(undefined, 'Ogden', makesModels)).to.throw();
        });
        it('should throw error when no model passed in.', () => {
            expect(() => findProductType('Salvi', null, makesModels)).to.throw();
            expect(() => findProductType('Salvi', undefined, makesModels)).to.throw();
        });
        it('Finds correct product type', () => {
            expect(findProductType('Swanson', 'La Scuola', makesModels)).to.equal('pedal');
            expect(findProductType('Blevins', 'Encore 34', makesModels)).to.equal('lever');
            expect(findProductType('Blevins', 'Blahblah', makesModels)).to.equal('not found');
            expect(findProductType('BlahBlah', 'Encore 34', makesModels)).to.equal('not found');
        });
    });
    describe('find product size function', () => {
        it('should throw error when no maker passed in.', () => { // NOT YET IMPLEMENTED -- restore when makesModels written to it's own files
            expect(() => findProductSize(null, 'Ogden', makesModels)).to.throw();
            expect(() => findProductSize(undefined, 'Ogden', makesModels)).to.throw();
        });
        it('should throw error when no model passed in.', () => {
            expect(() => findProductSize('Salvi', null, makesModels)).to.throw();
            expect(() => findProductSize('Salvi', undefined, makesModels)).to.throw();
        });
        it('Finds correct product size', () => {
            expect(findProductSize('Swanson', 'La Scuola', makesModels)).to.eql(47);
            expect(findProductSize('Blevins', 'Encore 34', makesModels)).to.equal(34);
            expect(findProductSize('Blevins', 'Blahblah', makesModels)).to.equal('not found');
            expect(findProductSize('BlahBlah', 'Encore 34', makesModels)).to.equal('not found');
        });
    });
    describe('#getMakeModelSizeType function', function() {
        it('should throw error when no title passed in.', async function() {
            expect(getMakeModelTypeSize(null)).to.be.rejectedWith();
            expect(getMakeModelTypeSize(undefined)).to.be.rejectedWith();
        });
        
        it('responds with matching records', async function() {
            let detailArray = await getMakeModelTypeSize("Salvi Iris for sale");
            expect(detailArray).to.eql(['Salvi', 'Iris', 'pedal', 47, undefined]);
            detailArray = await getMakeModelTypeSize("Tripplett Sierra 36 now available - maple");
            expect(detailArray).to.eql(['Triplett', 'Sierra 36', 'lever', 36, 'maple']);
            detailArray = await getMakeModelTypeSize("Triplett Sierra Maple 36 now available");
            expect(detailArray).to.eql(['Triplett', 'Sierra 36', 'lever', 36, 'maple']);
            detailArray = await getMakeModelTypeSize('L&H 17 the best I have seen');
            expect(detailArray).to.eql(['Lyon & Healy', 'Style 17', 'pedal', 47, undefined]);
        });
    });
});
