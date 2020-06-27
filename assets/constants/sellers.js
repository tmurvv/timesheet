const { SellerPaths } = require('../classes/SellerPaths');
const { SellerPathsLink } = require('../classes/SellerPathsLink');

const getMichiganHarpImage = ($, item) => {
    const prodTitle = $(item).text().trim();
    console.log('inMHI', prodTitle)
    const adjust = prodTitle.substr(0,1);
    console.log(adjust)
    switch(adjust) {
        case '1':
            return `https://www.michiganharpcenter.com${$(item).parent().find('.photoContainer').find('.photoList').find('img').attr('src')}`
        case '2':
            return `https://www.michiganharpcenter.com${$(item).parent().find('.photoContainer').find('.photoList').next().find('img').attr('src')}`
        case '3':
            return `https://www.michiganharpcenter.com${$(item).parent().find('.photoContainer').find('.photoList').next().next().find('img').attr('src')}`
        case '4':
            return `https://www.michiganharpcenter.com${$(item).parent().find('.photoContainer').find('.photoList').next().next().next().find('img').attr('src')}`
        case '5':
            return `https://www.michiganharpcenter.com${$(item).parent().find('.photoContainer').find('.photoList').next().next().next().next().find('img').attr('src')}`
        case '6':
            return `https://www.michiganharpcenter.com${$(item).parent().find('.photoContainer').find('.photoList').next().next().next().next().next().find('img').attr('src')}`
        case '7':
            return `https://www.michiganharpcenter.com${$(item).parent().find('.photoContainer').find('.photoList').next().next().next().next().next().next().find('img').attr('src')}`
        case '8':
            return `https://www.michiganharpcenter.com${$(item).parent().find('.photoContainer').find('.photoList').next().next().next().next().next().next().next().find('img').attr('src')}`
        case '9':
            return `https://www.michiganharpcenter.com${$(item).parent().find('.photoContainer').find('.photoList').next().next().next().next().next().next().next().next().find('img').attr('src')}`
        
    }
    return `https://www.michiganharpcenter.com${$(item).parent().find('.photoContainer').find('.photoList').find('img').attr('src')}`
    return {...product, productImageUrl: product.productImageUrl.replace(/%20/g, '_').replace(/%25/g, '_').replace(/%/g, '_')}
};
//#region VENDORS NOT LINKING TO PRODUCTS
    //#region Harp Connection needs LAT/LONG
    const HarpConnection = new SellerPaths(
        'Harp Connection', //name
        'harp@harptisha.com', //email
        'USA', //country
        'North-East', //region
        'https://www.harpconnection.com/harpstore/harp-UsedHarps.html', //productsUrl
        '.plusplus', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('h3').text().trim(), //titleFn
        ($, item) => $(item).parent().parent().find('.THCsmall').text().trim(), //priceFn,
        () => "Short Description not available.", //shortDescFn
        () => "Long Description not available", //longDescFn
        ($, item) => `https://www.harpconnection.com${$(item).parent().parent().parent().parent().parent().parent().parent().parent().parent().find('.THCHarpImage').attr('src')}` //productImageUrlFn              
    );
    //#endregion 
    //#region Tisha Murvihill, harp services
    const MurvihillHarpServices = new SellerPaths(
        'Find a Harp', //name
        'tisha@findaharp.com', //email
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
    //#region HarpAngel
    const HarpAngel = new SellerPaths(
        'Harp Angel', //name
        'tisha@findaharp.com', //email
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
        'harp@harptisha.com', //email
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
        if (product.productModel === 'Feather') return {...product, productImageUrl: 'https://findaharp-api-staging.herokuapp.com/assets/img/Feather.jpg'};
        if (product.productModel === 'Paraguayan Harp') return {...product, productImageUrl: 'https://findaharp-api-staging.herokuapp.com/assets/img/Paraguayan.jpg'};   
    };
    //#endregion
    //#endregion
//#region VENDORS LINKING TO PRODUCTS
    //#region Harps Etc. lever
    const HarpsEtcLever = new SellerPathsLink(
        'HarpsEtc', //name
        'harp@harptisha.com', //email
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
        'harp@harptisha.com', //email
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
        'harp@harptisha.com', //email
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
        'harp@harptisha.com', //email
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
        'Mid-west', //region
        '42.534718', // lat
        '-83.110604', //long
        'https://www.michiganharpcenter.com/pedal-harps-photo-album.html', //productsurl
        '.photoList', //mainPathId
        [ 'getPrice' ], //customFns
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
        ($, item) => $(item).find('.photoInfo').text().trim(), //longDescLinkFn,
        ($, item) => `https://michiganharpcenter.com${$(item).find('.photoContainer').find('img').attr('src')}` //imageUrlLinkFn
    );
    //#endregion
    //#region Michigan Harp Center Floor
    const MichiganHarpCenterFloorHarp = new SellerPathsLink(
        'Michigan Harp Center', //name
        'michiganharpcenter@gmail.com', //email
        'USA', //country
        'Mid-west', //region
        '42.534718', // lat
        '-83.110604', //long
        'https://www.michiganharpcenter.com/floor-harps-photo-album-.html', //productsurl
        '.photoList', //mainPathId
        [ 'getPrice' ], //customFns
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
        ($, item) => $(item).find('.photoInfo').text().trim(), //longDescLinkFn,
        ($, item) => `https://michiganharpcenter.com${$(item).find('.photoContainer').find('img').attr('src')}` //imageUrlLinkFn
    );
    //#endregion
    //#region Michigan Harp Center Lap
    const MichiganHarpCenterLapHarp = new SellerPathsLink(
        'Michigan Harp Center', //name
        'michiganharpcenter@gmail.com', //email
        'USA', //country
        'Mid-west', //region
        '42.534718', // lat
        '-83.110604', //long
        'https://www.michiganharpcenter.com/lap-harps-photo-album.html', //productsurl
        '.photoList', //mainPathId
        [ 'getPrice' ], //customFns
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
        ($, item) => $(item).find('.photoInfo').text().trim(), //longDescLinkFn,
        ($, item) => `https://michiganharpcenter.com${$(item).find('.photoContainer').find('img').attr('src')}` //imageUrlLinkFn
    );
    //#endregion
    
//#endregion

exports.sellerArray = [
    MichiganHarpCenterPedalHarp,
    MichiganHarpCenterFloorHarp,
    MichiganHarpCenterLapHarp,
    WestCoastHarps,
    // HarpConnection, 
    MurvihillHarpServices,
    HarpAngel,
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
        // ($, item) => {   //priceFn
        //     const productInfo = $(item).parent().find('[data-field-id="contentCards.description"]').text();
        //     return productInfo.indexOf('$') > -1 ? productInfo.substring(productInfo.indexOf('$'), productInfo.indexOf('$') + 10) : '';
        // }, 
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