const { SellerPaths } = require('../classes/SellerPaths');
const { SellerLinkPaths } = require('../classes/SellerLinkPaths');

//-----
const VanderbiltMusic_e = new SellerLinkPaths(
    'Vanderbilt', //name
    'https://vanderbiltmusic.com/harp-sales/used-harps/', //productsurl
    '.Even', //mainPathId
    ($, item) => $(item).find('a').text().trim(), //titleFn
    ['longDescLinkCustomFn'], //customFns
    ($, item) => $(item).find('.ProductDetails').find('a').attr('href'), //link url fn
    '.ProductMain', //mainPathIdLink
    '', //titlelinkfn
    ($, item) => $(item).find('.prodAccordionContent').text() //long desc link fn
);
VanderbiltMusic_e.longDescLinkCustomFn = (product) => {
    let productLongDesc = product.productLongDesc;
    productLongDesc = productLongDesc.replace(/\n/g,'').replace(/\t/g,'');
    if (productLongDesc.indexOf('HarpsNew') > -1) productLongDesc = productLongDesc.substring(0,productLongDesc.indexOf('HarpsNew'));
    if (productLongDesc.indexOf('HarpsUsed') > -1) productLongDesc = productLongDesc.substring(0,productLongDesc.indexOf('HarpsUsed')).replace('  ', ' ');

    return {...product, productLongDesc }
}
//-----
const HarpConnection = new SellerPaths(
        'Harp Connection', //name
        'https://www.harpconnection.com/harpstore/harp-UsedHarps.html', //products Url
        '.plusplus', //mainPathId
        ($, item) => $(item).find('h3').text().trim(), //titleFn
        '' //custom Fns
    );
// console.log(VanderbiltMusic_e);
const sellerArray = [VanderbiltMusic_e, HarpConnection];
console.log('sellers.js', sellerArray);
exports.sellerArray = sellerArray;
