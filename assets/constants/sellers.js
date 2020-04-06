const { SellerPaths } = require('../classes/SellerPaths');
const { SellerPathsLink } = require('../classes/SellerPathsLink');

//#region VENDORS NOT LINKING TO PRODUCTS
    //#region Harp Connection
    const HarpConnection = new SellerPaths(
        'Harp Connection', //name
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
    //#region Atlanta-odd
    const AtlantaHarpCenter_o = new SellerPaths(
        'Atlanta Harp Center-o', //name
        'USA', //country
        'South', //region
        'https://stores.atlantaharpcenter.com/pre-owned-lever-harps/', //productsUrl
        '.Odd', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.ProductDetails').text().trim(), //titleFn
        ($, item) => $(item).find('.ProductPriceRating').find('em').text().trim(), //priceFn,
        () => "Short Description not available.", //shortDescFn
        () => "Long Description not available", //longDescFn
        ($, item) => $(item).find('img').attr('src'),  //productImageUrlFn
    );
    //#endregion
    //#region Atlanta-even
    const AtlantaHarpCenter_e = new SellerPaths(
        'Atlanta Harp Center-e', //name
        'USA', //country
        'South', //region
        'https://stores.atlantaharpcenter.com/pre-owned-lever-harps/', //productsUrl
        '.Even', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.ProductDetails').text().trim(), //titleFn
        ($, item) => $(item).find('.ProductPriceRating').find('em').text().trim(), //priceFn,
        () => "Short Description not available.", //shortDescFn
        () => "Long Description not available", //longDescFn
        ($, item) => $(item).find('img').attr('src'),  //productImageUrlFn
    );
    //#endregion
    //#region Phoenix Harps
    const PhoenixHarps = new SellerPaths(
        'PhoenixHarps', //name
        'USA', //country
        'West', //region
        'https://phoenixharpcenter.com/harp-sales', //productsUrl
        '[data-field-id="contentCards.headline"]', //mainPathId
        ['specialFileNameFn'], //customFns 
        ($, item) => $(item).parent().find('h4').text().trim(), //titleFn
        ($, item) => {   //priceFn
            const productInfo = $(item).parent().find('[data-field-id="contentCards.description"]').text();
            return productInfo.indexOf('$') > -1 ? productInfo.substring(productInfo.indexOf('$'), productInfo.indexOf('$') + 10) : '';
        }, 
        ($, item) => {   //shortDescFn
            const productInfo = $(item).parent().find('[data-field-id="contentCards.description"]').text();
            return productInfo.substring(0, productInfo.indexOf('.') + 1);
        }, 
        ($, item) => $(item).parent().find('[data-field-id="contentCards.description"]').text(), //longDescFn
        ($, item) => `https:${$(item).parent().find('[data-field-id="contentCards.imageProperties"]').find('img').attr("src")}`  //productImageUrlFn              
    );
    PhoenixHarps.specialFileNameFn = (product) => {
        return {...product, productImageUrl: product.productImageUrl.replace(/%20/g, '_').replace(/%25/g, '_').replace(/%/g, '_')}
    };
    PhoenixHarps.badImages = ['Arianna','85CG', 'Clarsach', 'Celtic II', 'Count Kerry', 'FH36S', 'Ogden', 'Ravenna 34'];
    //#endregion
    //#region Tisha Murvihill, harp services
    const MurvihillHarpServices = new SellerPaths(
        'Tisha Murvihill, harp services', //name
        'Canada', //country
        'West', //region
        'https://harptisha.com/harpSalesRent.php', //productsUrl
        '.productContainer', //mainPathId
        null, //customFns 
        ($, item) => $(item).find('.findaharp-title').text().trim(), // titleFn
        ($, item) => $(item).find('.findaharp-price').text().trim(), // priceFn,
        ($, item) => $(item).find('.findaharp-shortDesc').text().trim(), // shortDescFn
        ($, item) => $(item).find('.findaharp-longDesc').text().trim(), // longDescFn
        ($, item) => `https://www.harptisha.com/${$(item).parent().parent().find('.findaharp-img').find('img').attr('src')}` // productImageUrlFn            
    );
    //#endregion
//#endregion
//#region VENDORS LINKING TO PRODUCTS
    //#region Vanderbilt-even
const VanderbiltMusic_e = new SellerPathsLink(
    'Vanderbilt Music-e', //name
    'USA', //country
    'Mid-West', //region
    'https://vanderbiltmusic.com/harp-sales/used-harps/', //productsurl
    '.Even', //mainPathId
    ['longDescLinkCustom', 'imageFromWebCustom'], //customFns
    ($, item) => $(item).find('a').text().trim(), //titleFn
    ($, item) => $(item).find('em').text().trim(), //priceFn 
    () => 'Short description not available', //shortDescFn
    null, //longDescFn
    ($, item) => $(item).find('.ProductImage').find('img').attr('src'), //imageUrl
    ($, item) => $(item).find('.ProductDetails').find('a').attr('href'), //findLinkUrlFn
    '.ProductMain', //mainPathIdLink
    null, //titleLinkFn
    null, //priceLinkFn
    null, //shortDescLinkFn
    ($, item) => $(item).find('.prodAccordionContent').text(), //longDescLinkFn,
    null //imageUrlLinkFn
);
VanderbiltMusic_e.longDescLinkCustom = (product) => {
    let productLongDesc = product.productLongDesc;
    productLongDesc = productLongDesc.replace(/\n/g,'').replace(/\t/g,'');
    if (productLongDesc.indexOf('HarpsNew') > -1) productLongDesc = productLongDesc.substring(0,productLongDesc.indexOf('HarpsNew'));
    if (productLongDesc.indexOf('HarpsUsed') > -1) productLongDesc = productLongDesc.substring(0,productLongDesc.indexOf('HarpsUsed')).replace('  ', ' ');

    return {...product, productLongDesc }
}
VanderbiltMusic_e.imageFromWebCustom = (product) => product;
//#endregion
    //#region Vanderbilt-odd
const VanderbiltMusic_o = new SellerPathsLink(
    'Vanderbilt Music-o', //name
    'USA', //country
    'Mid-West', //region
    'https://vanderbiltmusic.com/harp-sales/used-harps/', //productsurl
    '.Odd', //mainPathId
    ['longDescLinkCustom', 'imageFromWebCustom'], //customFns
    ($, item) => $(item).find('a').text().trim(), //titleFn
    ($, item) => $(item).find('em').text().trim(), //priceFn 
    () => 'Short description not available', //shortDescFn
    null, //longDescFn
    ($, item) => $(item).find('.ProductImage').find('img').attr('src'), //imageUrl
    ($, item) => $(item).find('.ProductDetails').find('a').attr('href'), //findLinkUrlFn
    '.ProductMain', //mainPathIdLink
    null, //titleLinkFn
    null, //priceLinkFn
    null, //shortDescLinkFn
    ($, item) => $(item).find('.prodAccordionContent').text(), //longDescLinkFn,
    null //imageUrlLinkFn
);
VanderbiltMusic_o.longDescLinkCustom = (product) => {
    let productLongDesc = product.productLongDesc;
    productLongDesc = productLongDesc.replace(/\n/g,'').replace(/\t/g,'');
    if (productLongDesc.indexOf('HarpsNew') > -1) productLongDesc = productLongDesc.substring(0,productLongDesc.indexOf('HarpsNew'));
    if (productLongDesc.indexOf('HarpsUsed') > -1) productLongDesc = productLongDesc.substring(0,productLongDesc.indexOf('HarpsUsed')).replace('  ', ' ');

    return {...product, productLongDesc }
}
VanderbiltMusic_o.imageFromWebCustom = (product) => product;
//#endregion
    //#region Harps Etc.
    const HarpsEtc = new SellerPathsLink(
        'HarpsEtc', //name
        'USA', //country
        'Pacific', //region
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
    HarpsEtc.sellerAxiosResponsePath = '';
    //#endregion
    //#region Virginia Harp Center
    const VirginiaHarpCenter = new SellerPathsLink(
        'Virginia Harp Center', //name
        'USA', //country
        'Eastern', //region
        'https://www.vaharpcenter.com/harps/used-harps/', //productsurl
        '.category', //mainPathId
        null, //customFns
        ($, item) => $(item).find('.manufacturerName').text().trim(), //titleFn
        null, //priceFn
        () => "Short Description not available.", //shortDescFn
        null, //longDescFn
        null, //imageUrlFn
        ($, item) => $(item).attr('data-url'), //findLinkUrlFn
        '.maxwidth', //mainPathIdLink
        null, //titleLinkFn
        ($, item) => {   //priceLinkFn
            let priceString = $(item).find('.subheader').text().trim();
            if(priceString) {   
                const dollarSignIdx = priceString.indexOf('$');
                const nonNumberIndex = priceString.indexOf('\t\t\t\tAdditional Information');
                if (nonNumberIndex) {
                    priceString = priceString.substring(dollarSignIdx, nonNumberIndex).trim();
                } else {
                    priceString = priceString.substring(dollarSignIdx).trim();
                }
                return priceString;
            }
        }, 
        null, //shortDescLinkFn
        ($, item) => {   //longDescLinkFn
            if ($(item).find('.content_container').find('p').text()) {
                return $(item).find('.content_container')
                    .find('p').text()
                    .replace('/n', '').replace('/t','')
                    .replace('\\t', '').replace('\\n', '')
                    .trim();
            }
        }, 
        ($, item) => $(item).find('#fancy_photos_id0').attr('href') //imageUrlLinkFn
    );    
    //#endregion
//#endregion

exports.sellerArray = [
    HarpConnection, 
    AtlantaHarpCenter_o, 
    AtlantaHarpCenter_e,
    MurvihillHarpServices,
    VanderbiltMusic_e, 
    VanderbiltMusic_o,
    VirginiaHarpCenter
    // PhoenixHarps, // crashes program, not sure why
    // HarpsEtc, //removed for SSL violations
];
