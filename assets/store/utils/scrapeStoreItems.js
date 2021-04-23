const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');

const { FINDAHARP_PRODUCTS } = require('../../constants/FindaHarpProducts');
const { HARPSETC_EXTRA } = require('../../constants/HarpsEtcExtra');
const { GERMAINE_STRINGS } = require('../../constants/GermaineStrings');
const { STRUMMED_STRINGS } = require('../../constants/StrummedStrings');
const { MICHIGAN_HARP_CENTER } = require('../../constants/MHCProducts');
const { VIXEN_HARPS_PRODUCTS } = require('../../constants/VixenHarpsProducts');
const origStoreItems = require('../../constants/storeItemsList.json');
// const storeItemsListMusic = require('../../constants/storeItemsListMusic.json');

async function getLinkInfo(url) {
    const response = await axios({url: `https://www.harpsetc.com/bow-brand-natural-gut-1st-octave-set-00g-f.html`, 'strictSSL': false});
    const html = response.data.text;
    const $ = cheerio.load(html);

    const product = {};
    product.id = $('.ty-product-block__left').find('form').attr('name').substring(13);
    product.category = 'strings';
    product.title = $('.ty-product-block-title').text().trim();
    product.price = $('.ty-price-num').text().trim();
    product.description = $('.content-description').text().trim();
    product.image = $('.ty-pict   ').first().attr('src');
    product.newused = 'new';
    return product;
}
function getOrder(title) {
    if (title.includes('#')) return parseInt(title.substr(title.indexOf('#')+1,2))
        
    if (!title.toUpperCase().includes('SET')&&(title.includes('00G')&&(title.includes('00G')||title.includes('OOG')))) return -.5; // Above 1st Octave 00G
    if (!title.toUpperCase().includes('SET')&&(title.includes('0F')||title.includes('OF')||title.includes('0 Octave F'))) return -.3; // Above 1st Octave 0F
    if (title.includes('1st')){
        if (title.toUpperCase().includes('SET')&&!title.includes('OOG')&&!title.includes('00G')) return -1; // 1E-1F
        if (title.toUpperCase().includes('SET')) return -1.5; // OOG-1F
        if (title.includes(' E ')||title.toUpperCase().includes('OCTAVE E')) return 1;
        if (title.includes(' D ')||title.toUpperCase().includes('OCTAVE D')) return 2;
        if (title.includes(' C ')||title.toUpperCase().includes('OCTAVE C')) return 3;
        if (title.includes(' B ')||title.toUpperCase().includes('OCTAVE B')) return 4;
        if (title.includes(' A ')||title.toUpperCase().includes('OCTAVE A')) return 5;
        if (title.includes(' G ')||title.toUpperCase().includes('OCTAVE G')) return 6;
        if (title.includes(' F ')||title.toUpperCase().includes('OCTAVE F')) return 7;
    }
    if (title.includes('2nd')){
        if (title.toUpperCase().includes('SET')) return 7.5;
        if (title.includes(' E ')||title.toUpperCase().includes('OCTAVE E')) return 8;
        if (title.includes(' D ')||title.toUpperCase().includes('OCTAVE D')) return 9;
        if (title.includes(' C ')||title.toUpperCase().includes('OCTAVE C')) return 10;
        if (title.includes(' B ')||title.toUpperCase().includes('OCTAVE B')) return 11;
        if (title.includes(' A ')||title.toUpperCase().includes('OCTAVE A')) return 12;
        if (title.includes(' G ')||title.toUpperCase().includes('OCTAVE G')) return 13;
        if (title.includes(' F ')||title.toUpperCase().includes('OCTAVE F')) return 14;
    }
    if (title.includes('3rd')){
        if (title.toUpperCase().includes('SET')) return 14.5;
        if (title.includes(' E ')||title.toUpperCase().includes('OCTAVE E')) return 15;
        if (title.includes(' D ')||title.toUpperCase().includes('OCTAVE D')) return 16;
        if (title.includes(' C ')||title.toUpperCase().includes('OCTAVE C')) return 17;
        if (title.includes(' B ')||title.toUpperCase().includes('OCTAVE B')) return 18;
        if (title.includes(' A ')||title.toUpperCase().includes('OCTAVE A')) return 19;
        if (title.includes(' G ')||title.toUpperCase().includes('OCTAVE G')) return 20;
        if (title.includes(' F ')||title.toUpperCase().includes('OCTAVE F')) return 21;
    }
    if (title.includes('4th')){
        if (title.toUpperCase().includes('SET')) return 21.5;
        if (title.includes(' E ')||title.toUpperCase().includes('OCTAVE E')) return 22;
        if (title.includes(' D ')||title.toUpperCase().includes('OCTAVE D')) return 23;
        if (title.includes(' C ')||title.toUpperCase().includes('OCTAVE C')) return 24;
        if (title.includes(' B ')||title.toUpperCase().includes('OCTAVE B')) return 25;
        if (title.includes(' A ')||title.toUpperCase().includes('OCTAVE A')) return 26;
        if (title.includes(' G ')||title.toUpperCase().includes('OCTAVE G')) return 27;
        if (title.includes(' F ')||title.toUpperCase().includes('OCTAVE F')) return 28;
    }
    if (title.includes('5th')){
        if (title.toUpperCase().includes('SET')) return 28.5;
        if (title.includes(' E ')||title.toUpperCase().includes('OCTAVE E')) return 29;
        if (title.includes(' D ')||title.toUpperCase().includes('OCTAVE D')) return 30;
        if (title.includes(' C ')||title.toUpperCase().includes('OCTAVE C')) return 31;
        if (title.includes(' B ')||title.toUpperCase().includes('OCTAVE B')) return 32;
        if (title.includes(' A ')||title.toUpperCase().includes('OCTAVE A')) return 33;
        if (title.includes(' G ')||title.toUpperCase().includes('OCTAVE G')) return 34;
        if (title.includes(' F ')||title.toUpperCase().includes('OCTAVE F')) return 35;
    }
    if (title.includes('6th')){
        if (title.toUpperCase().includes('SET')) return 35.5;
        if (title.includes(' E ')||title.toUpperCase().includes('OCTAVE E')) return 36;
        if (title.includes(' D ')||title.toUpperCase().includes('OCTAVE D')) return 37;
        if (title.includes(' C ')||title.toUpperCase().includes('OCTAVE C')) return 38;
        if (title.includes(' B ')||title.toUpperCase().includes('OCTAVE B')) return 39;
        if (title.includes(' A ')||title.toUpperCase().includes('OCTAVE A')) return 40;
        if (title.includes(' G ')||title.toUpperCase().includes('OCTAVE G')) return 41;
        if (title.includes(' F ')||title.toUpperCase().includes('OCTAVE F')) return 42;
    }
    if (title.includes('7th')){
        if (title.includes(' E ')||title.toUpperCase().includes('OCTAVE E')) return 43;
        if (title.includes(' D ')||title.toUpperCase().includes('OCTAVE D')) return 44;
        if (title.includes(' C ')||title.toUpperCase().includes('OCTAVE C')) return 45;
    }
    return 1000;
}
exports.scrapeStoreItems = async (answerArray, url) => {
    console.log("READ INSTRUCTIONS IN COMMENTS BEFORE RUNNING");
    /************
     * INSTRUCTIONS:
     * Run in two batches, Music and then everything else
     * First storeItems is empty, write to file is storeItemsListMusic
     * then spread storeItemsListMusic into storeItems, write to file is storeItemsList
     ************/


    // let storeItems = [...storeItemsListMusic];
    console.log('store', storeItems.length)
    // Music
    // Harps Etc - Music - lever
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/lever-harps/music`,'music', 'lever harp', 'harp solo');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/lever-harps/ensemble`,'music', 'lever harp', 'harp ensemble');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/lever-harps/misc-instruments`,'music', 'lever harp', 'other ensembles');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/lever-harps/methods-and-studies`,'music', 'lever harp', 'Method Books');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/lever-harps/pop-and-collections`,'music', 'lever harp', 'Pop');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/lever-harps/solo-collections`,'music', 'lever harp', 'Collections');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/lever-harps/voice`,'music', 'lever harp', 'voice/harp');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/lever-harps/xmas-and-holiday-music`,'music', 'lever harp', 'Holiday');
    //     console.log('END-Lever storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    
    // // pedal
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/solo-music`,'music', 'pedal harp', 'harp solo');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/solo-collections-en`,'music', 'pedal harp', 'Collections');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/popular`,'music', 'pedal harp', 'pop');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/solo-with-orchestra`,'music', 'pedal harp', 'Concertos');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/methods-and-studies-en`,'music', 'pedal harp', 'Method Books');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/ensemble-en`,'music', 'pedal harp', 'harp ensemble');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/voice-en`,'music', 'pedal harp', 'voice/harp');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/with-flute`,'music', 'pedal harp', 'flute/harp');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/with-flute-and-strings`,'music', 'pedal harp', 'flute/harp');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/orchestral-parts`,'music', 'pedal harp', 'Orchestra Parts');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/ensemble-en`,'music', 'pedal harp', 'harp ensemble');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/with-keyboard`,'music', 'pedal harp', 'other ensembles');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/misc.-instruments`,'music', 'pedal harp', 'other ensembles');
    //     console.log('storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    // try {
    //     storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/sheet-music/pedal-harps/holiday-music`,'music', 'pedal harp', 'Holiday');
    //     console.log('END PEDAL storeItems', storeItems.length);
    // } catch(e) {
    //     console.log('storeItems error', e.message);
    // }
    
    // Books and Videos
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/books`,'music', '', 'Books');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    
    
    // CDs
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/music-cds`,'cds', '', '');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }

    // gifts
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/gifts/`,'gifts');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }

    // #region accessories
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/accessories/covers`,'accessories', '06covers');
        console.log('storeItems-Accessories', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/accessories/electronics`,'accessories', '04electronics');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/accessories/harp-care`,'accessories', '05harpcare');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/accessories/transportation`,'accessories', '07transportation');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/accessories/tuning-keys`,'accessories', '01tuningkeys');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/accessories/music-stands`,'accessories', '03musicstands');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/accessories/benches`,'accessories', '02benches');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/accessories/crowns`,'accessories', '08crowns');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/accessories/for-students`,'accessories', '09forstudent');
        console.log('END Accessories storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    //#endregion
    //#region strings
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/string-sets/?sef_rewrite=1`,'strings', 'z', '21stringsets');
        console.log('storeItems-strings-BB', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-natural-gut/?sef_rewrite=1`,'strings', 'Bow Brand', '01Natural Gut');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-lever-gut/`,'strings','Bow Brand', '04Lever Gut');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-concedo/`,'strings','Bow Brand', '02Concedo');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-burgundy-gut/`,'strings','Bow Brand', '03Burgundy');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-nylon/`,'strings','Bow Brand', '05Nylon');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bass-wire-silver-plated/`,'strings','Bow Brand', '07Silver Plated');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-bass-wire-tarnish-resistant/`,'strings','Bow Brand', '08Tarnish Resistant');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-lever-bass-wire/`,'strings','Bow Brand', '09Lever Base Wire');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-professional-lever-wire/`,'strings','Bow Brand', '10Professional Lever Wire');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bow-brand/bow-brand-lever-nylon/`,'strings','Bow Brand', '06Lever Nylon');
        console.log('storeItems', storeItems.length);
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/artist-nylon-strings/`,'strings', 'z', '11artist nylon');
        console.log('storeItems-Artist Nylon', storeItems.length)
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/bronze-wire-monofilament/`,'strings', 'Bronze Wire Monofilament','14bronze wire mono');
        console.log('storeItems.length', storeItems.length)
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/dusty-strings/`,'strings', 'z','16dusty');
        console.log('storeItems.length', storeItems.length)
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/savarez-kf/`,'strings', 'z','12savarez');
        console.log('storeItems.length', storeItems.length)
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/nylon-monofilament/`,'strings', 'Nylon Wire Monofilament', '13nylon monofilament');
        console.log('storeItems.length', storeItems.length)
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/silkgut/`,'strings', 'z','15silkgut');
        console.log('storeItems.length', storeItems.length)
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/triplett/`,'strings', 'z','17triplett');
        console.log('storeItems.length', storeItems.length)
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/rees/`,'strings', 'z','18rees');
        console.log('storeItems.length', storeItems.length)
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/stoney-end/`,'strings', 'z','19stoney end');
        console.log('storeItems.length', storeItems.length)
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    try {
        storeItems = await scrapeStoreItemsSub(storeItems,`https://www.harpsetc.com/strings/delta/`,'strings', 'z', '20delta');
        console.log('END strings storeItems.length', storeItems.length)
    } catch(e) {
        console.log('storeItems error', e.message);
    }
    // Wire Sets
    storeItems = [...storeItems, ...HARPSETC_EXTRA];
    console.log('storeItems-END HarpsE', storeItems.length)
    //#endregion
    // Find a Harp - music and strings
    storeItems = [...storeItems, ...FINDAHARP_PRODUCTS];
    console.log('storeItems-END FAH', storeItems.length);
    // Germaine Strings
    storeItems = [...storeItems, ...GERMAINE_STRINGS];
    console.log('storeItems-END GERMAINE', storeItems.length);
    // Strummed Strings
    storeItems = [...storeItems, ...STRUMMED_STRINGS];
    console.log('storeItems-END STRUMMED', storeItems.length);
    // Michigan Harp Center
    storeItems = [...storeItems, ...MICHIGAN_HARP_CENTER];
    console.log('storeItems-END MHC', storeItems.length);
    // Vixen Harps
    storeItems = [...storeItems, ...VIXEN_HARPS_PRODUCTS];
    console.log('storeItems-END MHC', storeItems.length);
    
    console.log('END ALL')
    
    //write to music file
    // fs.writeFile('assets/constants/storeItemsListMusic.json', JSON.stringify(storeItems), function (err) {
    //     if (err) console.log('Error writing store-item list function:', err.message);
    // });
    // //write to product file
    // fs.writeFile('assets/constants/storeItemsList.json', JSON.stringify(storeItems), function (err) {
    //     if (err) console.log('Error writing store-item list function:', err.message);
    // });

    // return scrapeStoreItemsSub(answerArray, url);
}

const scrapeStoreItemsSub = async (answerArray, url, category, subcategory, subsubcategory) => {
    const response = await axios({url, 'strictSSL': false});
    const html = response.data.text;
    const $ = cheerio.load(html);
    let productTable = $('.ty-product-list').toArray();
    
    // await Promise.all(productTable.map(async item => {  
    await productTable.map(async item => {  
        const product = {};
        const secondaryUrl = $(item).find('.ty-product-list__image').find('a').attr('href');
        
        try {
            const response = await axios({url: `${secondaryUrl}`, 'strictSSL': false});
            const html = response.data.text;
            // console.log(response.data.text)
            const $S = cheerio.load(html);
            // get description
            const description = $S('.content-description').html();
            const descriptionText = $S('.content-description').text();
            let title = $S('.ty-product-block-title').text().trim();
            // NOT YET IMPLEMENTED -- skip item if Digital Download
            if (title.toUpperCase().includes('PDF')) return;
            const product = {};
            product.id = $S('.ty-product-block__left').find('form').attr('name').substring(13);
            product.category = category;
            product.subcategories = []
            if (subcategory) {product.subcategory=subcategory; product.subcategories.push(subcategory);}
            if (subsubcategory) product.subsubcategory = subsubcategory;
            product.store = 'harpsetc';
            product.title = title;
            if (title.toUpperCase().includes('PDF')) category = 'Digital Downloads'; // NOT YET IMPLEMENTED this line nullified by shortcut above
            product.price = $S('.ty-price-num').text().trim();
            product.description = (description&&description)||'';
            product.descriptiontext = descriptionText&&descriptionText;
            product.image = $S('.ty-pict   ').first().attr('src');
            product.newused = 'new';
            // Merchant has two names for tarnish resitant
            if (product.title.includes('Pedal Bass Wire (Tarnish-Resistant Nickle-Plated)')) product.title=title.replace('Pedal Bass Wire (Tarnish-Resistant Nickle-Plated)','Pedal Bass Wire (Tarnish-Resistant)')
            if (product.title.includes('Pedal Bass Wire(Tarnish-Resistant Nickle-Plated)')) product.title=title.replace('Pedal Bass Wire(Tarnish-Resistant Nickle-Plated)','Pedal Bass Wire (Tarnish-Resistant)')
            // Merchant does not include Dusty Strings or Triplett in title
            if (subsubcategory&&subsubcategory.toLowerCase().includes('dusty')) {product.title = `Dusty Strings ${product.title}`;product.subcategories.push['Dusty Strings'];product.image='img/golden_harp_full_grey_dusty.png';}
            if (subsubcategory&&subsubcategory.toLowerCase().includes('triplett')) {product.title = `Triplett ${product.title}`;product.subcategories.push['Triplett'];product.image='img/golden_harp_full_grey_triplett.png';}
            if (subsubcategory&&subsubcategory.toLowerCase().includes('rees')) {product.title = `Rees ${product.title}`;product.subcategories.push['Rees'];product.image='img/golden_harp_full_grey_rees.png';}
            if (subsubcategory&&subsubcategory.toLowerCase().includes('stoney')) {product.title = `Stoney End ${product.title}`;product.subcategories.push['Stoney End'];product.image='img/golden_harp_full_grey_stoney.png';}
            if (subsubcategory&&subsubcategory.toLowerCase().includes('delta')) {product.title = `Delta ${product.title}`; product.subcategories.push['Delta'];product.image='img/golden_harp_full_grey_delta.png';}
            
            //To order strings 'EDCBAGF'
            if (category==='strings') product.order = getOrder(String(product.title));
            // To get gut, wire, etc... and pedal, lever, wire harp, etc...
            if (category==='strings') {
                if (title.toUpperCase().includes('GUT')) product.subcategories.push('Gut');
                if (title.toUpperCase().includes('WIRE')) product.subcategories.push('Wire');
                if (title.toUpperCase().includes('NYLON')) product.subcategories.push('Nylon');
                if (title.toUpperCase().includes('PEDAL')) product.subcategories.push('Pedal');
                if (title.toUpperCase().includes('LEVER')) product.subcategories.push('Lever');
                if (title.toUpperCase().includes('SET')) product.subcategories.push('Set');
                if (title.toUpperCase().includes('SET')&&title.toUpperCase().includes('WIRE')) product.subcategories.push('Wire Set');
                if (title.toUpperCase().includes('BRONZE WIRE')) product.subcategories.push('Bronze Wire Monofilament');
                if (title.toUpperCase().includes('NYLON')&&title.toUpperCase().includes('MONO')) product.subcategories.push('Nylon Monofilament');
            }
             //To get level & categories
            if (category==='music') {
                if (subcategory) product.harptype=subcategory;
                if (subsubcategory) product.subcategories.push(subsubcategory);
                if (title.toUpperCase().includes('PDF')) product.title=`PDF downloads coming soon. ${title}`;
                if (description&&(description.toUpperCase().includes('BEGINNER')||description.toUpperCase().includes('BEGINNING'))) product.level = 'beginner';
                if (description&&description.toUpperCase().includes('EASY')) product.level = 'beginner';
                if (description&&(description.toUpperCase().includes('INTERMEDIATE')||description.toUpperCase().includes('MEDIUM'))) product.level = 'intermediate';
                if (description&&description.toUpperCase().includes('ADVANCED')) product.level = 'advanced';
                if (description&&(description.toUpperCase().includes('BEGINNER')||description.toUpperCase().includes('BEGINNING'))&&(description.toUpperCase().includes('INTERMEDIATE')||description.toUpperCase().includes('MEDIUM'))) product.level = 'beg-int';
                if (description&&description.toUpperCase().includes('EASY')&&(description.toUpperCase().includes('INTERMEDIATE')||description.toUpperCase().includes('MEDIUM'))) product.level = 'beg-int';
                if (description&&(description.toUpperCase().includes('INTERMEDIATE')||description.toUpperCase().includes('MEDIUM'))&&description.toUpperCase().includes('ADVANCED')) product.level = 'int-adv';
            }
            answerArray.push(product);
        } catch(e) {
            console.log('nextUrl', url)
            console.log('error', e.message)
        }        
    });
    
    // get next button href
    const nextUrl =$('.ty-pagination__selected').next().attr('href');
    
    // const nextUrl = $('.ty-pagination').find('a').last().attr('href'); // Does not work on more that 8ish pages

    // console.log(answerArray.length)
    if (nextUrl===undefined||!nextUrl) return answerArray

    // return answerArray;
    return scrapeStoreItemsSub(answerArray, nextUrl, category, subcategory, subsubcategory);
}
