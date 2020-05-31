// packages
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');
const path = require('path')
const getColors = require('get-image-colors')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// internal
const AppError = require('./AppError');
const sellerArrayObject = require('../assets/constants/sellers');
const { downloadImage } = require('../utils/downloadWebSiteImages.js');
const {getMakeModelTypeSize} = require('./helpers/parseProdDetailsHelpers');
const { 
    shortFileNameFn, 
    checkBadImages,
    linkFn,
    cleanText, 
    leaf
 } = require('./helpers/helpers.js');

let mainProductList;
const parseStoreInfo = async (seller, data) => {
    const html = seller.hasOwnProperty('sellerAxiosResponsePath') ? data.text : data;
    const $ = cheerio.load(html);
    const productTable = $(seller.mainPathId);
    console.log('Seller', seller.name)
    console.log('# of Products:', productTable.length);
    // console.log(productTable[11])
    productTable.each(async function (item) {
        const id=uuid();
        // five main product data points
        let productTitle = seller.hasOwnProperty('titleFn')&&seller.titleFn ? cleanText(seller.titleFn($, this)) : '';
        let productPrice = seller.hasOwnProperty('priceFn')&&seller.priceFn ? cleanText(seller.priceFn($, this)) : '';
        let productShortDesc = seller.hasOwnProperty('shortDescFn')&&seller.shortDescFn ? cleanText(seller.shortDescFn($, this)) : '';
        let productLongDesc = seller.hasOwnProperty('longDescFn')&&seller.longDescFn ? cleanText(seller.longDescFn($, this)) : '';
        let productImageUrl = seller.hasOwnProperty('imageUrlFn')&&seller.imageUrlFn ? seller.imageUrlFn($, this) : '';
        //if website links to secondary product detail page
        if (seller.hasOwnProperty('findLinkUrlFn')&&seller.findLinkUrlFn) {  
            const secondaryUrl = seller.findLinkUrlFn($, this);
            const secondaryUrlData = await linkFn(seller, secondaryUrl);
            if (secondaryUrlData) {
                if (!productTitle && secondaryUrlData.productTitle) productTitle = cleanText(secondaryUrlData.productTitle);
                if (!productShortDesc && secondaryUrlData.productShortDesc) productShortDesc = cleanText(secondaryUrlData.productShortDesc);
                if (!productPrice && secondaryUrlData.productPrice) productPrice = cleanText(secondaryUrlData.productPrice);
                if (!productLongDesc && secondaryUrlData.productLongDesc) productLongDesc = cleanText(secondaryUrlData.productLongDesc);
                if (!productImageUrl && secondaryUrlData.productImageUrl) productImageUrl = secondaryUrlData.productImageUrl;
            }          
        }

        // Parse out search fields from product details
        const makeModelTypeSize = await getMakeModelTypeSize(productTitle); //product details array, order as name implies
        
        console.log('mmts', makeModelTypeSize)
        // handle image specifics
        if (!productImageUrl) productImageUrl = 'genericHarp.png';
        let shortProductImageUrl;
        // grab stock photo url if bad image
        if (seller.hasOwnProperty('badImages') && makeModelTypeSize[1]) {
            if (checkBadImages(makeModelTypeSize[1], seller.badImages)) shortProductImageUrl = checkBadImages(makeModelTypeSize[1], seller.badImages);
        }
        
        //download image if not from web or stock
        if (!shortProductImageUrl) shortProductImageUrl = shortFileNameFn(productImageUrl);       
        if (shortProductImageUrl && !shortProductImageUrl.includes("STOCK")) downloadImage(productImageUrl, shortProductImageUrl);
        productImageUrl = seller.hasOwnProperty('imageFromWebCustom')?productImageUrl:`https://${process.env.DEPLOY_SITE_PARTIAL}.herokuapp.com/assets/img/${shortProductImageUrl}`;
        
        // get thin image border color
        const productImageBestColors = await getColors(path.join(__dirname, `../assets/img/${shortProductImageUrl}`));
        
        let bestColor = ['#eeeeee', 0]
        productImageBestColors.map((color, idx) => {
            const colorArray = [color.hex(), color.luminance()];
            if (colorArray && colorArray.length > 0 && colorArray[1] < .80 && colorArray[1] > .40) {     
                bestColor = colorArray
            }
            else if (colorArray && colorArray.length > 0 && colorArray[1] > bestColor[1] && colorArray[1] < .80 && colorArray[1] > .40) {  
                bestColor = colorArray
            }
            //else {console.log('else', colorArray[1], bestColor[1]); bestColor = colorArray};
        });
        const productImageBestColor = bestColor[0];
        //create product
        let product;
        if (makeModelTypeSize[1]) product = {
            id,
            sellerName: seller.name,
            sellerCountry: seller.country,
            sellerRegion: seller.region,
            productTitle,
            productPrice,
            productShortDesc,               
            productLongDesc,
            productMaker: makeModelTypeSize[0],
            productModel: makeModelTypeSize[1],
            productType: makeModelTypeSize[2],
            productSize: makeModelTypeSize[3],
            productFinish: makeModelTypeSize[4],
            productImageUrl,
            productImageBestColor,
            divider: '00000000000000000000000'
        } 
        
        // console.log('0000000000000000000000000', product)      
        // check for vendor custom functions
        if (seller.hasOwnProperty('customFns') && seller.customFns) {
            seller.customFns.map(customFuncString => {
                try {
                    customFunc = leaf(seller, customFuncString);
                    product = customFunc(product);
                } catch (err) {
                    new AppError('Error executing custom functions:', err.message)
                }              
            });
        }
        //write to product file
        // console.log('116', mainProductList)
        if (product) mainProductList.push(product);
        fs.writeFile('assets/constants/usedHarpList.json', JSON.stringify(mainProductList), function (err) {
            if (err) console.log('Error writing used-harp list function:', err.message);
        });
        // console.log(mainProductList)
        return mainProductList;
    });         
}

exports.scrapeAds = async () => {
    mainProductList = [];
    const sellerArray = sellerArrayObject.sellerArray;
    
    sellerArray.map(async seller => {
        try {
            const response = await axios({url: seller.productsUrl, 'strictSSL': false});
            parseStoreInfo(seller, response.data);
        } catch (err) {
            console.log("Error from scrapeAds:", err.message);
        }
    });
};
