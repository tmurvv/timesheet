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
    () => "Long Description not available",
    ($, item) => `https://www.harpconnection.com${$(item).parent().parent().parent().parent().parent().parent().parent().parent().parent().find('.THCHarpImage').attr('src')}`  //longDescFn              
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
    () => "Long Description not available", //longDescription
    ($, item) => $(item).find('img').attr('src'),  //longDescFn
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
    () => "Long Description not available", //longDescription
    ($, item) => $(item).find('img').attr('src'),  //longDescFn
);
//#endregion
//#endregion
//#region VENDORS LINKING TO PRODUCTS
//#region Vanderbilt-even
const VanderbiltMusic_e = new SellerPathsLink(
    'Vanderbilt', //name
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
    'Vanderbilt', //name
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
//#endregion

exports.sellerArray = [HarpConnection, 
    VanderbiltMusic_e, VanderbiltMusic_o,
    AtlantaHarpCenter_o, AtlantaHarpCenter_e];
