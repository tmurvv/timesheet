// Mocha API
const {describe, it} = require('mocha');

// Assertions module - Chai!
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;
chai.use(chaiAsPromised);

const { 
    linkFn,
    cleanText,
    cleanUrlText
} = require('../helpers/helpers');

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
        it('should throw error when axios times out.', async function() {
            expect(linkFn('Seller', 'sdummyinvdsfalidurl')).to.be.rejectedWith(/timed/);
        }); // NOT YET IMPLEMENTED -- test also works when negated
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
            expect(cleanText('/nhere/t/t/t/t/t')).to.equal('here');
            expect(cleanText('/nhere/t/t/t/t/t')).to.equal('here');
            expect(cleanText('/nher/n/n/n/n/n/ne/t/t/t/t/t')).to.equal('here');
            expect(cleanText('/nher\n\n\n\n\t\t\t\t\taddTOCART/n/n/n/n/n/ne/t/t/t/t/t')).to.equal('here');
        });
    });
    describe('cleanUrlText function', () => {
        it('should throw error when no url passed in.', () => {
            expect(() => cleanUrlText(null)).to.throw();
            expect(() => cleanUrlText(undefined)).to.throw();
        });
        it('url should be properly cleaned.', () => {
            expect(cleanUrlText('https://%20%25hsdflk.com')).to.equal('https://__hsdflk.com');
            expect(cleanUrlText('https://mysite.com/Clarsach%201%20full%20harp.jpg')).to.equal('https://mysite.com/Clarsach_1_full_harp.jpg');
            expect(cleanUrlText('https://mysite.com/Clarsach%201%25full%25harp.jpg')).to.equal('https://mysite.com/Clarsach_1_full_harp.jpg');
            expect(cleanUrlText('https://mysite.com/Clarsach%201%20fu%%ll%20harp.jpg')).to.equal('https://mysite.com/Clarsach_1_fu__ll_harp.jpg');
            expect(cleanUrlText('https://mysite.com/Clarsach%201%20full%20harp.jpg     ')).to.equal('https://mysite.com/Clarsach_1_full_harp.jpg');
            expect(cleanUrlText('     https://mysite.com/Clarsach%201%20full%20harp.jpg')).to.equal('https://mysite.com/Clarsach_1_full_harp.jpg');
        });
    });
});