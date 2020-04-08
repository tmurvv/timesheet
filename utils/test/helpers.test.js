const cheerio = require('cheerio');

// Testing packages
const {describe, it} = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(chaiAsPromised);

//to be tested
const {
    leaf,
    linkFn,
    cleanText,
    cleanUrlText,
    shortFileNameFn,
    checkBadImages,
    parseStoreSecondaryInfo
} = require('../helpers/helpers');

const { sellerArray } = require('./data/sellersForTesting');
const html = require('./data/htmlForTesting');
describe('Helper functions', () => {
    describe('linkFn - link to secondary product page', () => {
        it('should throw error when no seller passed in.', async function() {
            expect(linkFn(null)).to.be.rejectedWith(/missing/);
            expect(linkFn(undefined)).to.be.rejectedWith(/missing/);
        });
        it('should throw error when no url passed in.', async function() {
            expect(linkFn('Seller', null)).to.be.rejectedWith(/missing/);
            expect(linkFn('Seller', undefined)).to.be.rejectedWith(/missing/);
        });
        // it('should throw error when axios times out.', async function() {
        //     expect(linkFn('Seller', 'sdummyinvdsfalidurl')).to.be.rejectedWith(/timed/);
        // }); // NOT YET IMPLEMENTED -- test also works when negated
    });
    describe('cleanText function', () => {
        it('should throw error when no text passed in.', () => {
            expect(() => cleanText(null)).to.throw();
            expect(() => cleanText(undefined)).to.throw();
        });
        it('text should be properly cleaned.', () => {
            expect(cleanText('here')).to.equal('here'); 
            expect(cleanText('/nhere')).to.equal('here');
            expect(cleanText('/nhereAdd to Cart')).to.equal('here');
            expect(cleanText('/nheaddtoCartre')).to.equal('here');
            expect(cleanText('headd to Cartre')).to.equal('here');
            expect(cleanText('/nhere/t/t                  /t/t/t')).to.equal('here ');
            expect(cleanText('/nhere/t/t/t/t/t')).to.equal('here');
            expect(cleanText('/nhere/n/n/n           /n/n/n/t/t          /t/t/t')).to.equal('here ');
            expect(cleanText('/nhere\n\n\n\n\t\t\t\t\taddTOCART/n/n/n/n/n/n/t/t/t/t/t')).to.equal('here ');
        });
    });
    describe('cleanUrlText function', () => {
        it('should throw error when no url passed in.', () => {
            expect(() => cleanUrlText(null)).to.throw();
            expect(() => cleanUrlText(undefined)).to.throw();
        });
        it('url should be properly cleaned.', () => {
            expect(cleanUrlText('https://%20%25hsdflk.com')).to.eql('https://__hsdflk.com');
            expect(cleanUrlText('https://mysite.com/Clarsach%201%20full%20harp.jpg')).to.eql('https://mysite.com/Clarsach_1_full_harp.jpg');
            expect(cleanUrlText('https://mysite.com/Clarsach%201%25full%25harp.jpg')).to.eql('https://mysite.com/Clarsach_1_full_harp.jpg');
            expect(cleanUrlText('https://mysite.com/Clarsach%201%20fu%%ll%20harp.jpg')).to.eql('https://mysite.com/Clarsach_1_fu__ll_harp.jpg');
            expect(cleanUrlText('https://mysite.com/Clarsach%201%20full%20harp.jpg     ')).to.eql('https://mysite.com/Clarsach_1_full_harp.jpg');
            expect(cleanUrlText('     https://mysite.com/Clarsach%201%20full%20harp.jpg')).to.eql('https://mysite.com/Clarsach_1_full_harp.jpg');
            expect(cleanUrlText('https://mysite.com/Clarsach%201%20full%20harp.jpg')).to.eql('https://mysite.com/Clarsach_1_full_harp.jpg');
            expect(cleanUrlText('mysite.com/Clarsach1.full.harp.jpg')).to.eql('mysite.com/Clarsach1_full_harp.jpg');
            expect(cleanUrlText('https://mysite.com/Clarsach1.full.harp.jpg')).to.eql('https://mysite.com/Clarsach1_full_harp.jpg');
        });
    });
    describe('short file name function', () => {
        it('should throw error when no url passed in.', () => {
            expect(() => shortFileNameFn(null)).to.throw();
            expect(() => shortFileNameFn(undefined)).to.throw();
        });
        it('url should be properly cleaned.', () => {
            expect(shortFileNameFn('https://myfilename.com')).to.equal('myfilename.com');
            expect(shortFileNameFn('https://mysite.com/myfilename.com')).to.equal('myfilename.com');
            expect(shortFileNameFn('https://mysite.com/myfilename.com?fjk3oivn=asdfke,jfk')).to.equal('myfilename.com');
            expect(shortFileNameFn('https://img1.wsimg.com/isteam/ip/myfilename.com/:/')).to.equal('myfilename.com');
            expect(shortFileNameFn('https://res.cloudinary.com/demo/image/fetch/w_300,h_300,c_fill,g_face,r_max,f_auto/https://upload.wikimedia.org/wikipedia/commons/1/13/myfilename.com')).to.equal('myfilename.com');
            expect(shortFileNameFn('https://https://res.cloudinary.com/demo/image/fetch/w_300,h_300,c_fill,g_face,r_max,f_auto/https://upload.wikimedia.org/wikipedia/commons/1/13/myfilename.com?dflkj-dkwlj=sdfjke:83&')).to.equal('myfilename.com');
        });
    });
    describe('check bad images function', () => {
        it('should throw error when no seller passed in.', () => {
            expect(() => checkBadImages(null)).to.throw();
            expect(() => checkBadImages(undefined)).to.throw();
        });
        it('should throw error when no badImageArray passed in.', () => {
            expect(() => checkBadImages('Store Name', null)).to.throw();
            expect(() => checkBadImages('Store Name', undefined)).to.throw();
        });
        it('bad images should be found on list and correct stock url returned', () => {
            expect(checkBadImages('Arianna', ['Arianna'])).to.equal('AriannaSTOCK.jpg');
            expect(checkBadImages('Clarsach', ['Arianna','85CG', 'Clarsach', 'Celtic II', 'Count Kerry'])).to.equal('ClarsachSTOCK.jpg');
            expect(checkBadImages('Style 30', ['Arianna','85CG', 'Clarsach', 'Celtic II', 'Count Kerry'])).to.equal(undefined);
            expect(checkBadImages('Celtic III', ['Arianna','85CG', 'Clarsach', 'Celtic II', 'Count Kerry'])).to.equal(undefined);
            expect(checkBadImages('Celtic I', ['Arianna','85CG', 'Clarsach', 'Celtic II', 'Count Kerry'])).to.equal(undefined);
            expect(checkBadImages('Celtic II', ['Arianna','85CG', 'Clarsach', 'Celtic II', 'Count Kerry'])).to.equal('CelticIISTOCK.jpg');
        });
    });
    describe('parseStoreSecondaryInfo function', () => {
        it('should throw error when no seller passed in.', () => {
            expect(() => parseStoreSecondaryInfo(null)).to.throw();
            expect(() => parseStoreSecondaryInfo(undefined)).to.throw();
        });
        it('should throw error when no html data passed in.', () => {
            expect(() => parseStoreSecondaryInfo('seller object', null)).to.throw();
            expect(() => parseStoreSecondaryInfo('seller object', undefined)).to.throw();
        });

        beforeEach(() => {
            const seller = {
                id: '24757684-7c5a-48c8-8df3-e386ab6fd613',
                name: 'Vanderbilt Music-o',
                country: 'USA',
                region: 'Mid-West',
                productsUrl: 'https://vanderbiltmusic.com/harp-sales/used-harps/',
                mainPathId: '.Odd',
                customFns: [ 'longDescLinkCustom', 'imageFromWebCustom' ],
                titleFn: ($, item) => $(item).find('a').text().trim(), //titleFn,
                priceFn: ($, item) => $(item).find('a').text().trim(), //titleFn,
                shortDescFn: () => 'Short description not available', //shortDescFn
                longDescFn: null,
                imageUrlFn: ($, item) => $(item).find('.ProductImage').find('img').attr('src'), //imageUrl,
                findLinkUrlFn: ($, item) => $(item).find('.ProductDetails').find('a').attr('href'), //findLinkUrlFn
                mainPathIdLink: '.ProductMain',
                titleLinkFn: null,
                priceLinkFn: null,
                shortDescLinkFn: null,
                longDescLinkFn: ($, item) => $(item).find('.prodAccordionContent').text(), //longDescLinkFn,,
                imageUrlLinkFn: () => "Dummy Property",
                longDescLinkCustom: [Function],
                imageFromWebCustom: [Function] 
            }
        
            it('should call functions where property exists', function() {                
                const testProperty1 = sinon.spy(seller, 'longDescLinkFn');
                const testProperty2 = sinon.spy(seller, 'imageUrlLinkFn');
              
                parseStoreSecondaryInfo(seller, function() { });
              
                getInfo.restore();
                sinon.assert.calledOnce(testProperty1);
                sinon.assert.calledOnce(testProperty2);
            });
        });
        //  //NOT YET IMPLEMENTED, not sure how to test
    });
});
