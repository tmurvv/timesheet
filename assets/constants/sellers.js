const { SellerPaths } = require('../classes/SellerPaths');
const { SellerPathsLink } = require('../classes/SellerPathsLink');

//#region VENDORS NOT LINKING TO PRODUCTS
    //#region Find a Harp
    const Findaharp = new SellerPaths(
        'Find a Harp', //name
        'harp@harptisha.com', //email
        'Calgary, Canada', //short location
        'Canada-West', //region
        '51.214380', // lat
        '-114.466894', //long
        'https://harptisha.com/TestArea/harpSalesRent.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').html(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
        // ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
    );
    //#endregion
    //#region 4harpmusic.com
    const FourHarpMusic = new SellerPaths(
        '4HarpMusic', //name
        'txabby@gmail.com', //email
        'Dallas area', //country
        'South', //region
        '33.2148', // lat
        '-97.1331', //long
        'https://harptisha.com/TestArea/FourHarpMusicSales.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').text().trim(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
        // ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
    );
    //#endregion
    //#region Harp Angel
    const HarpAngel = new SellerPaths(
        'Harp Angel', //name
        'harpangelharpist@gmail.com', //email
        'AB, Canada', //country
        'Canada-West', //region
        '51.0900', // lat
        '-115.3442', //long
        'https://harptisha.com/TestArea/nyackSales.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').html(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
        // ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
    );
    //#endregion
    //#region Vavra Harp
    const VavraHarp = new SellerPaths(
        'Vavra Harp', //name
        'vavra@vavraharp.com', //email
        'Upstate South Carolina', // short location
        'Eastern', //region
        '34.5034', // lat
        '-82.6501', //long
        'https://harptisha.com/TestArea/vavraSales.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').html(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
        // ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
    );
    //#endregion
    //#region Vixen Harps
    const VixenHarps = new SellerPaths(
        'Vixen Harps', //name
        'info@vixenharps.com', //email
        'Ottawa, ON, Canada', // short location
        'Canada-East', //region
        '45.4277', // lat
        '-75.6847', //long
        'https://harptisha.com/TestArea/vixenSales.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').html(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
        // ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
    );
    //#endregion
    //#region West Coast Harps
    const WestCoastHarps = new SellerPaths(
        'West Coast Harps', //name
        'alison@westcoastharps.com', //email
        'Vancouver area', //short location
        'Canada-Pacific', //region
        '49.106772', //lat 
        '-123.851779', //long
        'https://www.westcoastharps.com/used-harps.html', //productsUrl
        '.wsite-multicol', //mainPathId
        ['priceCustom', 'imageCustom'], //customFns 
        ($, item) => $(item).parent().prev().text(), // titleFn
        ($, item) => $(item).parent().next().find('span').text(), // priceFn,
        ($, item) => "ShortDescFn", // shortDescFn
        ($, item) => $(item).find('.wsite-multicol-table-wrap').html().replace(/class="wsite-multicol-col" style="width:50%; padding:0 15px;"/g,'class="wsite-multicol-col" style="width:100%; padding: 0"'), // longDescFn
        ($, item) => null // productImageUrlFn
    );
    WestCoastHarps.priceCustom = (product) => {
        if (!product.productPrice || product.productPrice.indexOf('$')===-1) return product;
        return {...product, productPrice: product.productPrice.substr(product.productPrice.indexOf('$')-3,9)};
    };
    WestCoastHarps.imageCustom = (product) => {
        if (product.productModel === 'Athena EX') return {...product, productImageUrl: 'https://findaharp-api.herokuapp.com/assets/img/camac1.jpg'};   
        return product
    };
    //#endregion
    //#region Blevins Harps
    const BlevinsHarps = new SellerPaths(
        'Blevins Harps', //name
        'blevinsharps@gmail.com', //email
        'Western Colorado', //short location
        'West', //region
        '39.082610', //lat 
        '-108.593220', //long
        'https://harptisha.com/TestArea/blevinsSales.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').html(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn
    );
    //#endregion
    //#region Chiara Arpa
    const ChiaraArpa = new SellerPaths(
        'Chiara Arpa', //name
        'chiara_arpa@yahoo.it', //email
        'San Diego area', //short location
        'Pacific', //region
        '32.7157', //lat 
        '-117.1611', //long
        'https://harptisha.com/TestArea/chiaraSales.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').html(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn
    );
    //#endregion
    //#region nova harps
    const NovaHarps = new SellerPaths(
        'nova harps', //name
        'karen@harpmail.com', //email
        'Halifax, NS, Canada', //short location
        'Canada-East', //region
        '44.6488', //lat 
        '-63.5752', //long
        'https://harptisha.com/TestArea/novaSales.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').html(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn
    );
    //#endregion
    //#region Strummed Strings
    const StrummedStrings = new SellerPaths(
        'Strummed Strings', //name
        'julie@normanfamily.org', //email
        'Logan, Utah', //short location
        'West', //region
        '41.7370', //lat 
        '-111.8338', //long
        'https://harptisha.com/TestArea/strummedStringsSales.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').html(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn
    );
    //#endregion
    //#region MarinaHarp
    const MarinaHarp = new SellerPaths(
        'MarinaHarp', //name
        'marinaharp@gmail.com', //email
        'Reno, Nevada', //short location
        'West', //region
        '39.5296', //lat 
        '-119.8138', //long
        'https://harptisha.com/TestArea/osterSales.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').html(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn
    );
    //#endregion
//#endregion
//#region VENDORS LINKING TO PRODUCTS
    //#region Harps Etc. lever
    const HarpsEtcLever = new SellerPathsLink(
        'HarpsEtc', //name
        'harpsetc@gmail.com', //email
        'San Francisco area', //short location
        'Pacific', //region
        '37.900690', // lat 
        '-122.061810', //long
        'https://www.harpsetc.com/harps-en/certified-used-harps/certified-used-lever-harps/', //productsurl
        '.ty-product-list__info', //mainPathId
        null, //customFns
        ($, item) => $(item).find('.ty-product-list__item-name').text().trim(), //titleFn
        ($, item) => $(item).find('.ty-product-list__price').text().trim(), //priceFn 
        ($, item) => $(item).find('.ty-product-list__description').text().trim(), //shortDescFn
        null, //longDescFn
        null, //imageUrl
        ($, item) => $(item).parent().prev().find('a').attr('href'), //findLinkUrlFn
        '.ty-product-block', //mainPathIdLink
        null, //titleLinkFn
        null, //priceLinkFn
        null, //shortDescLinkFn
        ($, item) => {if($(item).find('.content-description').html()) return $(item).find('.content-description').html()}, //longDescLinkFn,
        ($, item) => $(item).find('.ty-pict   ').first().attr('src') //imageUrlLinkFn
    );
    HarpsEtcLever.sellerAxiosResponsePath = '';
    //#endregion
    //#region Harps Etc. Pedal
    const HarpsEtcPedal = new SellerPathsLink(
        'HarpsEtc', //name
        'harpsetc@gmail.com', //email
        'San Francisco area', //short location
        'Pacific', //region
        '37.900690', // lat 
        '-122.061810', //long
        'https://www.harpsetc.com/harps-en/certified-used-harps/certified-used-pedal-harps/', //productsurl
        '.ty-product-list__info', //mainPathId
        null, //customFns
        ($, item) => $(item).find('.ty-product-list__item-name').text().trim(), //titleFn
        ($, item) => $(item).find('.ty-product-list__price').text().trim(), //priceFn 
        ($, item) => $(item).find('.ty-product-list__description').text().trim(), //shortDescFn
        null, //longDescFn
        null, //imageUrl
        ($, item) => $(item).parent().prev().find('a').attr('href'), //findLinkUrlFn
        '.ty-product-block', //mainPathIdLink
        null, //titleLinkFn
        null, //priceLinkFn
        null, //shortDescLinkFn
        ($, item) => {if($(item).find('.content-description').html()) return $(item).find('.content-description').html()}, //longDescLinkFn,
        ($, item) => $(item).find('.ty-pict   ').first().attr('src') //imageUrlLinkFn
    );
    HarpsEtcPedal.sellerAxiosResponsePath = '';
    //#endregion
    //#region Harps Etc. Pedal
    const HarpsEtcPedalP2 = new SellerPathsLink(
        'HarpsEtc', //name
        'harpsetc@gmail.com', //email
        'San Francisco area', //short location
        'Pacific', //region
        '37.900690', // lat 
        '-122.061810', //long
        'https://www.harpsetc.com/harps-en/certified-used-harps/certified-used-pedal-harps/page-2/?sef_rewrite=1', //productsurl
        '.ty-product-list__info', //mainPathId
        null, //customFns
        ($, item) => $(item).find('.ty-product-list__item-name').text().trim(), //titleFn
        ($, item) => $(item).find('.ty-product-list__price').text().trim(), //priceFn 
        ($, item) => $(item).find('.ty-product-list__description').text().trim(), //shortDescFn
        null, //longDescFn
        null, //imageUrl
        ($, item) => $(item).parent().prev().find('a').attr('href'), //findLinkUrlFn
        '.ty-product-block', //mainPathIdLink
        null, //titleLinkFn
        null, //priceLinkFn
        null, //shortDescLinkFn
        ($, item) => {if($(item).find('.content-description').html()) return $(item).find('.content-description').html()}, //longDescLinkFn,
        ($, item) => $(item).find('.ty-pict   ').first().attr('src') //imageUrlLinkFn
    );
    HarpsEtcPedalP2.sellerAxiosResponsePath = '';
    //#endregion
    //#region Harps Etc. Wire
    const HarpsEtcWire = new SellerPathsLink(
        'HarpsEtc', //name
        'harpsetc@gmail.com', //email
        'San Francisco area', //short location
        'Pacific', //region
        '37.900690', // lat 
        '-122.061810', //long
        'https://www.harpsetc.com/harps-en/certified-used-harps/certified-used-wire-harps/', //productsurl
        '.ty-product-list__info', //mainPathId
        null, //customFns
        ($, item) => $(item).find('.ty-product-list__item-name').text().trim(), //titleFn
        ($, item) => $(item).find('.ty-product-list__price').text().trim(), //priceFn 
        ($, item) => $(item).find('.ty-product-list__description').text().trim(), //shortDescFn
        null, //longDescFn
        null, //imageUrl
        ($, item) => $(item).parent().prev().find('a').attr('href'), //findLinkUrlFn
        '.ty-product-block', //mainPathIdLink
        null, //titleLinkFn
        null, //priceLinkFn
        null, //shortDescLinkFn
        ($, item) => {if($(item).find('.content-description').html()) return $(item).find('.content-description').html()}, //longDescLinkFn,
        ($, item) => $(item).find('.ty-pict   ').first().attr('src') //imageUrlLinkFn
    );
    HarpsEtcWire.sellerAxiosResponsePath = '';
    //#endregion
    //#region Harps Etc. Historical
    const HarpsEtcHistorical = new SellerPathsLink(
        'HarpsEtc', //name
        'harpsetc@gmail.com', //email
        'San Francisco area', //short location
        'Pacific', //region
        '37.900690', // lat 
        '-122.061810', //long
        'https://www.harpsetc.com/harps-en/certified-used-harps/certified-used-historical-harps/', //productsurl
        '.ty-product-list__info', //mainPathId
        null, //customFns
        ($, item) => $(item).find('.ty-product-list__item-name').text().trim(), //titleFn
        ($, item) => $(item).find('.ty-product-list__price').text().trim(), //priceFn 
        ($, item) => $(item).find('.ty-product-list__description').text().trim(), //shortDescFn
        null, //longDescFn
        null, //imageUrl
        ($, item) => $(item).parent().prev().find('a').attr('href'), //findLinkUrlFn
        '.ty-product-block', //mainPathIdLink
        null, //titleLinkFn
        null, //priceLinkFn
        null, //shortDescLinkFn
        ($, item) => {if($(item).find('.content-description').html()) return $(item).find('.content-description').html()}, //longDescLinkFn,
        ($, item) => $(item).find('.ty-pict   ').first().attr('src') //imageUrlLinkFn
    );
    HarpsEtcHistorical.sellerAxiosResponsePath = '';
    //#endregion   
    //#region Michigan Harp Center Pedal
    const MichiganHarpCenterPedalHarp = new SellerPathsLink(
        'Michigan Harp Center', //name
        'michiganharpcenter@gmail.com', //email
        'Detroit area', //country
        'Mid-West', //region
        '42.534718', // lat
        '-83.110604', //long
        'https://www.michiganharpcenter.com/pedal-harps-photo-album.html', //productsurl
        '.photoList', //mainPathId
        [ 'ownerException' ], //customFns
        null, //titleFn      
        null, //priceFn 
        null,//($, item) => $(item).find('.ty-product-list__description').text().trim(), //shortDescFn
        null, //longDescFn
        null, //imageUrl
        ($, item) => `https://www.michiganharpcenter.com${$(item).find('a').attr('href')}`, //findLinkUrlFn
        'table', //mainPathIdLink
        ($, item) => $(item).find('h3').text(), //titleLinkFn
        ($, item) => {   //priceLinkFn
            const productInfo = $(item).find('.photoInfo').text();
            let returnIt = productInfo.indexOf('$') > -1 ? productInfo.substring(productInfo.indexOf('$'), productInfo.indexOf('$') + 10) : '';
            if(returnIt.indexOf(' ') !== -1) returnIt = returnIt.substr(0, returnIt.indexOf(' '));
            return returnIt;
        },
        null, //shortDescLinkFn
        ($, item) => {
            const h3Length = $(item).find('.photoInfo').find('h3').text().length;
            return $(item).find('.photoInfo').text().trim().substring(h3Length+1);
        }, //longDescLinkFn,
        ($, item) => `https://michiganharpcenter.com${$(item).find('.photoContainer').find('img').attr('src')}` //imageUrlLinkFn
    );
    MichiganHarpCenterPedalHarp.ownerException = (product) => {
        if (product.productLongDesc.indexOf("|")>-1) return null;
        if (product.productImageUrl.indexOf('orchid')>-1) product.productImageUrl='https://findaharp-api.herokuapp.com/assets/img/genericHarp.png';
        return product;
    }
    //#endregion
    //#region Michigan Harp Center Floor
    const MichiganHarpCenterFloorHarp = new SellerPathsLink(
        'Michigan Harp Center', //name
        'michiganharpcenter@gmail.com', //email
        'Detroit area', //country
        'Mid-West', //region
        '42.534718', // lat
        '-83.110604', //long
        'https://www.michiganharpcenter.com/floor-harps-photo-album-.html', //productsurl
        '.photoList', //mainPathId
        [ 'ownerException' ], //customFns
        null, //titleLinkFn      
        null, //priceFn 
        null,//($, item) => $(item).find('.ty-product-list__description').text().trim(), //shortDescFn
        null, //longDescFn
        null, //imageUrl
        ($, item) => `https://www.michiganharpcenter.com${$(item).find('a').attr('href')}`, //findLinkUrlFn
        'table', //mainPathIdLink
        ($, item) => $(item).find('h3').text(), //titleLinkFn
        ($, item) => {   //priceFn
            const productInfo = $(item).find('.photoInfo').text();
            let returnIt = productInfo.indexOf('$') > -1 ? productInfo.substring(productInfo.indexOf('$'), productInfo.indexOf('$') + 10) : '';
            if(returnIt.indexOf(' ') !== -1) returnIt = returnIt.substr(0, returnIt.indexOf(' '));
            return returnIt;
        }, //priceLinkFn
        null, //shortDescLinkFn
        ($, item) => {
            // long desc formatted '<div class='photoInfo><h3>LH15</h3>LH15 long desc</div>' have to take out h3 or LH15 is repeated twice in a row in result
            const h3Length = $(item).find('.photoInfo').find('h3').text().length;
            return $(item).find('.photoInfo').text().trim().substring(h3Length+1);
        }, //longDescLinkFn,
        ($, item) => `https://michiganharpcenter.com${$(item).find('.photoContainer').find('img').attr('src')}` //imageUrlLinkFn
    );
    MichiganHarpCenterFloorHarp.ownerException = (product) => {
        if (product.productLongDesc.indexOf("|")>-1) return null;
        if (product.title.toUpperCase.startsWith('NEW')) return null;
        return product;
    }
    //#endregion
    //#region Michigan Harp Center Lap
    const MichiganHarpCenterLapHarp = new SellerPathsLink(
        'Michigan Harp Center', //name
        'michiganharpcenter@gmail.com', //email
        'Detroit area', //country
        'Mid-West', //region
        '42.534718', // lat
        '-83.110604', //long
        'https://www.michiganharpcenter.com/lap-harps-photo-album.html', //productsurl
        '.photoList', //mainPathId
        [ 'ownerException' ], //customFns
        null, //titleLinkFn      
        null, //priceFn 
        null,//($, item) => $(item).find('.ty-product-list__description').text().trim(), //shortDescFn
        null, //longDescFn
        null, //imageUrl
        ($, item) => `https://www.michiganharpcenter.com${$(item).find('a').attr('href')}`, //findLinkUrlFn
        'table', //mainPathIdLink
        ($, item) => $(item).find('h3').text(), //titleLinkFn
        ($, item) => {   //priceFn
            const productInfo = $(item).find('.photoInfo').text();
            let returnIt = productInfo.indexOf('$') > -1 ? productInfo.substring(productInfo.indexOf('$'), productInfo.indexOf('$') + 10) : '';
            if(returnIt.indexOf(' ') !== -1) returnIt = returnIt.substr(0, returnIt.indexOf(' '));
            return returnIt;
        }, //priceLinkFn
        null, //shortDescLinkFn
        ($, item) => {
            // long desc formatted '<div class='photoInfo><h3>LH15</h3>LH15 long desc</div>' have to take out h3 or LH15 is repeated twice in a row in result
            const h3Length = $(item).find('.photoInfo').find('h3').text().length;
            return $(item).find('.photoInfo').text().trim().substring(h3Length+1);
        }, //longDescLinkFn,
        ($, item) => `https://michiganharpcenter.com${$(item).find('.photoContainer').find('img').attr('src')}` //imageUrlLinkFn
    );
    MichiganHarpCenterLapHarp.ownerException = (product) => {
        if (product.productLongDesc.indexOf("|")>-1) return null;
        return product;
    }
    //#endregion
//#endregion

exports.sellerArray = [
    MichiganHarpCenterPedalHarp,
    MichiganHarpCenterFloorHarp,
    MichiganHarpCenterLapHarp,
    Findaharp,
    VavraHarp,
    VixenHarps,
    HarpAngel,
    FourHarpMusic,
    BlevinsHarps,
    ChiaraArpa,
    NovaHarps,
    StrummedStrings,
    HarpsEtcLever,
    HarpsEtcPedal,
    HarpsEtcPedalP2,
    HarpsEtcWire,
    HarpsEtcHistorical,
    MarinaHarp
];

// EXAMPLE OF CUSTOM FUNCTION
    //#region Phoenix Harps
    // const PhoenixHarps = new SellerPaths(
    //     'PhoenixHarps', //name
    //     'harp@harptisha.com', //email
    //     'USA', //country
    //     'West', //region
    //     'https://phoenixharpcenter.com/harp-sales', //productsUrl
    //     '[data-field-id="contentCards.headline"]', //mainPathId
    //     ['specialFileNameFn'], //customFns 
    //     ($, item) => $(item).parent().find('h4').text().trim(), //titleFn
    //     ($, item) => {   //priceFn
    //       const productInfo = $(item).parent().find('[data-field-id="contentCards.description"]').text();
    //       return productInfo.indexOf('$') > -1 ? productInfo.substring(productInfo.indexOf('$'), productInfo.indexOf('$') + 10) : '';
    //     }, 
    //     ($, item) => {   //shortDescFn
    //         const productInfo = $(item).parent().find('[data-field-id="contentCards.description"]').text();
    //         return productInfo.substring(0, productInfo.indexOf('.') + 1);
    //     }, 
    //     ($, item) => $(item).parent().find('[data-field-id="contentCards.description"]').text(), //longDescFn
    //     ($, item) => `https:${$(item).parent().find('[data-field-id="contentCards.imageProperties"]').find('img').attr("src")}`  //productImageUrlFn              
    // );
    // PhoenixHarps.specialFileNameFn = (product) => {
    //     return {...product, productImageUrl: product.productImageUrl.replace(/%20/g, '_').replace(/%25/g, '_').replace(/%/g, '_')}
    // };
    // PhoenixHarps.badImages = ['Arianna','85CG', 'Clarsach', 'Celtic II', 'Count Kerry', 'FH36S', 'Ogden', 'Ravenna 34'];
    // //#endregion

    //#region The Harp Place
    // const TheHarpPlace = new SellerPaths(
    //     'The Harp Place', //name
    //     'harpgal1@gmail.com', //email
    //     'Albany, New York area', //country
    //     'Northeast', //region
    //     '42.5715', // lat
    //     '-73.6206', //long
    //     'https://harptisha.com/TestArea/TheHarpPlace.php', //productsUrl
    //     '.productContainer', //mainPathId
    //     null, //customFns 
    //     ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
    //     ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
    //     ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
    //     ($, item) => $(item).find('.findaharp-longDesc').text().trim(), // longDescFn
    //     ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
    //     // ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
    // );
    //#endregion