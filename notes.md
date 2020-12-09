Ordering stuff:

Inventory = {
    Strings: { 
        Material: {
            Gut: {
                Bow Brand: {
                    Pedal: {
                        0: ['G','F']
                        1: ['E','D','C','B','A','G','F'],
                        2: ['E','D','C','B','A','G','F'],
                        3: ['E','D','C','B','A','G','F'],
                        4: ['E','D','C','B','A','G','F'],
                        5: ['E','D','C','B','A']
                    },
                    Concedo: {
                        0: ['G','F']
                        1: ['E','D','C','B','A','G','F'],
                        2: ['E','D','C','B','A','G','F'],
                        3: ['E','D','C','B','A','G','F'],
                        4: ['E','D','C','B','A','G','F'],
                        5: ['E','D','C','B','A']
                    },
                    Burgundy: {
                        0: ['G','F']
                        1: ['E','D','C','B','A','G','F'],
                        2: ['E','D','C','B','A','G','F'],
                        3: ['E','D','C','B','A','G','F'],
                        4: ['E','D','C','B','A','G','F'],
                        5: ['E','D','C','B','A']
                    },
                }
            },
            Nylon: {
                Bow Brand: {
                    Pedal: {
                        0: ['G','F']
                        1: ['E','D','C','B','A','G','F'],
                        2: ['E','D','C','B','A','G','F'],
                        3: ['E','D','C','B','A','G','F'],
                        4: ['E','D','C','B','A','G','F'],
                        5: ['E','D','C','B','A']
                    },
                    Lever: {
                        1: ['E','D','C','B','A','G','F'],
                        2: ['E','D','C','B','A','G','F'],
                        3: ['E','D','C','B','A','G','F'],
                        4: ['E','D','C','B','A','G','F'],
                        5: ['E','D','C','B','A']
                    }
                }
            },
            Wire: {
                Bow Brand: {
                    PedalSilver: {
                        5: ['G','F'],
                        6: ['E','D','C','B','A','G','F'],
                        7: ['E','D','C']
                    },
                    PedalResistant: {
                        5: ['G','F'],
                        6: ['E','D','C','B','A','G','F'],
                        7: ['E','D','C']
                    },
                    Lever: {
                        5: ['E','D','C','B','A','G','F'],
                        6: ['E','D','C','B','A']
                    },
                    LeverProfessional: {
                        5: ['E','D','C','B','A','G','F'],
                        6: ['E','D','C','B','A']
                    }
                }
            },
            Synthetic: {
                Savarez:{
                    KFComposite: {}
                }
            }
        },
        HarpMaker: {
            DustyStrings: {},
            Triplett: {},
            Rees: {},
            StoneyEnd: {},
            Salvi: {
                Delta: {}
            }
        }

        
    }
    
        
    .Brand
        100 Bow Brand
        105 Pedal
        110 Lever
        115 Concedo 
        
    .Octave
    .Note
200 Music
300 Accessories
400 Gifts
500 Harps
600 Other




list of all color edit possibilities https://code.visualstudio.com/api/references/theme-color#editor-colors

DataMuse npm maybe to find similar sounds to harp name

https://harp.fandom.com/wiki/Harp_Makers_and_Vendors_in_North_America

summerhaysmusic

https://vanderbiltmusic.com/strings-guide/

hillnotemusic.com

Lots of harp stores   https://www.lyonhealy.com/find-a-dealer-harps/

/**
 * Rarely used and not tested or tracked, 
 * basic array sorting algo from StackOverflow
 */
exports.sellerSort = () => sellerArray.sort(function(a, b) {
    var nameA = a.sellerName.toUpperCase(); // ignore upper and lowercase
    var nameB = b.sellerName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
       return 1;
    }
  
    // names must be equal
    return 0;
});

OLD SENDGRID DATA:
SENDGRID_USERNAME=apikey
SENDGRID_PASSWORD=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
HEROku kEY: SENDGRID_API_KEY=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
SENDGRID_USERNAME=app167126049@heroku.com
SENDGRID_PASSWORD=zmeu9kez9259