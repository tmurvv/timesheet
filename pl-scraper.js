const axios = require('axios');
const cheerio = require('cheerio');
const uuid = require('uuid');

const usedHarpsNorthAmerica = [];
const url = 'https://www.harpconnection.com/harpstore/harp-UsedHarps.html';

//Tisha Murvihill Harp Services
usedHarpsNorthAmerica.push({
    id: uuid(),
    seller: "Tisha Murvihill",
    sellerCountry: "Canada",
    harpTitle: 'Sierra 36 by Triplett',
    harpShortDesc: 'Purchased 2011 Maple',
    harpPrice: '$4600',
    harpLongDesc: 'Excellent condition, lightly used, beautiful Triplett sound. This one is a winner!',
    harpPhotoUrl: 'photo goes here'
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
            const sellerCountry = 'USA';
            const harpTitle = $(this).find('h3').text();
            const harpShortDesc = $(this).parent().parent().find('p').first().text();
            const harpPrice = $(this).parent().parent().find('.THCsmall').text();
            const harpLongDesc = $(this).parent().parent().find('p:nth-child(2)').text();
            const harpImage = $(this).parent().parent().find('.THCHarpImage').attr('src');
            
            console.log(harpImage);
            usedHarpsNorthAmerica.push({
                id,
                seller,
                sellerCountry,
                harpTitle,
                harpShortDesc,
                harpPrice,
                harpLongDesc,
                harpImage
            });
        });
        
    })
    .catch(console.error);

    module.exports = usedHarpsNorthAmerica;