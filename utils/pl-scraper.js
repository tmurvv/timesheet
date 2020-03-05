const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');
const { downloadImage } = require('../utils/downloadWebSiteImages');
const { shortFileName } = require('./helpers.js');

const usedHarpsNorthAmerica = [];
let url = 'https://www.harpconnection.com/harpstore/harp-UsedHarps.html';

//Tisha Murvihill Harp Services
usedHarpsNorthAmerica.push({
    id: uuid(),
    seller: "Tisha Murvihill Harp Services",
    sellerCountry: "Canada",
    harpTitle: 'Sierra 36 by Triplett',
    harpShortDesc: 'Purchased 2011 Maple',
    harpPrice: '$4300',
    harpLongDesc: 'Excellent condition, lightly used, beautiful Triplett sound. This one is a winner!',
    harpImageUrl: 'triplettSierra36Maple.jpg',
    divider: 'OOOOOOOOOOOOOOOOOOOOOOO'
})

// Harp Connection
axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const usedHarpTable = $('.plusplus');
        usedHarpTable.each(function () {
            const id=uuid();
            const seller = 'Harp Connection';
            const sellerCountry = 'Eastern USA';
            const harpTitle = $(this).find('h3').text();
            const harpShortDesc = $(this).parent().parent().find('p').first().text();
            const harpPrice = $(this).parent().parent().find('.THCsmall').text();
            const harpLongDesc = $(this).parent().parent().find('p:nth-child(2)').text();
            const harpImageUrl = shortFileName($(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().find('.THCHarpImage').attr('src'));
            downloadImage('https://www.harpconnection.com', harpImageUrl);
            usedHarpsNorthAmerica.push({
                id,
                seller,
                sellerCountry,
                harpTitle,
                harpShortDesc,
                harpPrice,
                harpLongDesc,
                harpImageUrl,
                divider: 'OOOOOOOOOOOOOOOOOOOOOO'
            });
        });       
    })
    .catch(console.error);

//Atlanta Harp Center .Odd class
url = "https://stores.atlantaharpcenter.com/pre-owned-lever-harps/"
axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const usedHarpTable = $('.Odd');

        console.log(usedHarpTable.length);

        usedHarpTable.each(function () {
            const id=uuid();
            const seller = 'Atlanta Harp Center';
            const sellerCountry = 'Eastern USA';
            const harpTitle = $(this).find('ProductDetail').text();
            const harpShortDesc = "Short Description not available.";
            const harpPrice = $(this).find('.ProductPriceRating').find('em').text();
            const harpLongDesc = "Long Description not available";
            // const harpImageUrl = "https://cdn1.bigcommerce.com/n-yp39j5/ygaj12w/products/5336/images/10682/IMG_3719__80332.1582829290.220.290.jpg?c=2";
            const harpImageUrl = $(this).find('img').attr('src');
            downloadImage("", harpImageUrl);
            usedHarpsNorthAmerica.push({
                id,
                seller,
                sellerCountry,
                harpTitle,
                harpShortDesc,
                harpPrice,
                harpLongDesc,
                harpImageUrl,
                divider: 'OOOOOOOOOOOOOOOOOOOOOOOOO'
            });
        });       
    })
    .catch(console.error);
//Atlanta Harp Center .Even class
url = "https://stores.atlantaharpcenter.com/pre-owned-lever-harps/"
axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const usedHarpTable = $('.Even');

        console.log(usedHarpTable.length);

        usedHarpTable.each(function () {
            const id=uuid();
            const seller = 'Atlanta Harp Center';
            const sellerCountry = 'Eastern USA';
            const harpTitle = $(this).find('ProductDetail').text();
            const harpShortDesc = "Short Description not available.";
            const harpPrice = $(this).find('.ProductPriceRating').find('em').text();
            const harpLongDesc = "Long Description not available";
            // const harpImageUrl = "https://cdn1.bigcommerce.com/n-yp39j5/ygaj12w/products/5336/images/10682/IMG_3719__80332.1582829290.220.290.jpg?c=2";
            const harpImageUrl = $(this).find('img').attr('src');
            downloadImage("", harpImageUrl);
            usedHarpsNorthAmerica.push({
                id,
                seller,
                sellerCountry,
                harpTitle,
                harpShortDesc,
                harpPrice,
                harpLongDesc,
                harpImageUrl,
                divider: 'OOOOOOOOOOOOOOOOOOOOOOOOO'
            });
        });       
    })
    .catch(console.error);

module.exports = usedHarpsNorthAmerica;