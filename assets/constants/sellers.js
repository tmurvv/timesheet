const { SellerPaths } = require('../classes/SellerPaths');
const { SellerPathsLink } = require('../classes/SellerPathsLink');

//#region VENDORS NOT LINKING TO PRODUCTS
    //#region Tisha Murvihill, harp services
    const MurvihillHarpServices = new SellerPaths(
        'Find a Harp', //name
        'harp@harptisha.com', //email
        'Canada-West', //country
        'Canada-West', //region
        '51.214380', // lat
        '-114.466894', //long
        'https://harptisha.com/harpSalesRent.php', //productsUrl
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
    //#region 4harpmusic.com
    const FourHarpMusic = new SellerPaths(
        '4HarpMusic', //name
        'txabby@gmail.com', //email
        'South', //country
        'South', //region
        '33.2148', // lat
        '-97.1331', //long
        'https://harptisha.com/FourHarpMusicSales.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        () => 'contact seller', // priceFn
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').text().trim(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
        // ($, item) => `https://www.harptisha.com/${$(item).find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
    );
    //#endregion
    //#region HarpAngel
    const HarpAngel = new SellerPaths(
        'Harp Angel', //name
        'harpangelharpist@gmail.com', //email
        'Canada-West', //country
        'Canada-West', //region
        '51.0900', // lat
        '-115.3442', //long
        'https://harptisha.com/nyackSales.php', //productsUrl
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
    //#region West Coast Harps
    const WestCoastHarps = new SellerPaths(
        'West Coast Harps', //name
        'alison@westcoastharps.com', //email
        'Canada-West', //country
        'Canada-West', //region
        '49.106772', //lat 
        '-123.851779', //long
        'https://www.westcoastharps.com/used-harps.html', //productsUrl
        '.wsite-multicol', //mainPathId
        ['priceCustom', 'imageCustom'], //customFns 
        ($, item) => $(item).parent().prev().text(), // titleFn
        ($, item) => $(item).parent().next().find('span').text(), // priceFn,
        ($, item) => "ShortDescFn", // shortDescFn
        ($, item) => $(item).text(), // longDescFn
        ($, item) => null // productImageUrlFn
    );
    WestCoastHarps.priceCustom = (product) => {
        if (!product.productPrice || product.productPrice.indexOf('$')===-1) return product;
        return {...product, productPrice: product.productPrice.substr(product.productPrice.indexOf('$')-3,9)};
    };
    WestCoastHarps.imageCustom = (product) => {
        if (product.productModel === 'Feather') return {...product, productImageUrl: 'https://findaharp-api.herokuapp.com/assets/img/Feather.jpg'};
        if (product.productModel === 'Paraguayan Harp') return {...product, productImageUrl: 'https://findaharp-api.herokuapp.com/assets/img/Paraguayan.jpg'};   
        return product
    };
    //#endregion
//#endregion
//#region VENDORS LINKING TO PRODUCTS
    //#region Harps Etc. lever
    const HarpsEtcLever = new SellerPathsLink(
        'HarpsEtc', //name
        'info@harpsetc.com', //email
        'USA', //country
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
        ($, item) => {if($(item).find('.content-description').find('p').text().trim()) return $(item).find('p').text().trim()}, //longDescLinkFn,
        ($, item) => $(item).find('.ty-pict   ').first().attr('src') //imageUrlLinkFn
    );
    HarpsEtcLever.sellerAxiosResponsePath = '';
    //#endregion
    //#region Harps Etc. Pedal
    const HarpsEtcPedal = new SellerPathsLink(
        'HarpsEtc', //name
        'info@harpsetc.com', //email
        'USA', //country
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
        ($, item) => {if($(item).find('.content-description').find('p').text().trim()) return $(item).find('p').text().trim()}, //longDescLinkFn,
        ($, item) => $(item).find('.ty-pict   ').first().attr('src') //imageUrlLinkFn
    );
    HarpsEtcPedal.sellerAxiosResponsePath = '';
    //#endregion
    //#region Harps Etc. Wire
    const HarpsEtcWire = new SellerPathsLink(
        'HarpsEtc', //name
        'info@harpsetc.com', //email
        'USA', //country
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
        ($, item) => {if($(item).find('.content-description').find('p').text().trim()) return $(item).find('p').text().trim()}, //longDescLinkFn,
        ($, item) => $(item).find('.ty-pict   ').first().attr('src') //imageUrlLinkFn
    );
    HarpsEtcWire.sellerAxiosResponsePath = '';
    //#endregion
    //#region Harps Etc. Historical
    const HarpsEtcHistorical = new SellerPathsLink(
        'HarpsEtc', //name
        'info@harpsetc.com', //email
        'USA', //country
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
        ($, item) => {if($(item).find('.content-description').find('p').text().trim()) return $(item).find('p').text().trim()}, //longDescLinkFn,
        ($, item) => $(item).find('.ty-pict   ').first().attr('src') //imageUrlLinkFn
    );
    HarpsEtcHistorical.sellerAxiosResponsePath = '';
    //#endregion   
    //#region Michigan Harp Center Pedal
    const MichiganHarpCenterPedalHarp = new SellerPathsLink(
        'Michigan Harp Center', //name
        'michiganharpcenter@gmail.com', //email
        'USA', //country
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
        return product;
    }
    //#endregion
    //#region Michigan Harp Center Floor
    const MichiganHarpCenterFloorHarp = new SellerPathsLink(
        'Michigan Harp Center', //name
        'michiganharpcenter@gmail.com', //email
        'USA', //country
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
        return product;
    }
    //#endregion
    //#region Michigan Harp Center Lap
    const MichiganHarpCenterLapHarp = new SellerPathsLink(
        'Michigan Harp Center', //name
        'michiganharpcenter@gmail.com', //email
        'USA', //country
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
    WestCoastHarps, 
    MurvihillHarpServices,
    HarpAngel,
    FourHarpMusic,
    HarpsEtcLever, //removed for SSL violations
    HarpsEtcPedal, //removed for SSL violations
    HarpsEtcWire, //removed for SSL violations
    HarpsEtcHistorical //removed for SSL violations
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