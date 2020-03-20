const { SellerPaths } = require('../classes/SellerPaths');
const { SellerPathsLink } = require('../classes/SellerPathsLink');

//-----
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

// () => 'https://onestop-api-staging.herokuapp.com/assets/img/Prelude_62530.jpg',
VanderbiltMusic_e.longDescLinkCustom = (product) => {
    let productLongDesc = product.productLongDesc;
    productLongDesc = productLongDesc.replace(/\n/g,'').replace(/\t/g,'');
    if (productLongDesc.indexOf('HarpsNew') > -1) productLongDesc = productLongDesc.substring(0,productLongDesc.indexOf('HarpsNew'));
    if (productLongDesc.indexOf('HarpsUsed') > -1) productLongDesc = productLongDesc.substring(0,productLongDesc.indexOf('HarpsUsed')).replace('  ', ' ');

    return {...product, productLongDesc }
}
VanderbiltMusic_e.imageFromWebCustom = (product) => product;
//-----
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
// console.log(VanderbiltMusic_e);
exports.sellerArray = [HarpConnection, VanderbiltMusic_e];
// console.log('sellers.js', sellerArray);
// exports.sellerArray = sellerArray;
