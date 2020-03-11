exports.shortFileNameFn = (longUrlPath) => {
    if (longUrlPath) {
        //remove possible url querystring
        if (longUrlPath.lastIndexOf('?')>-1) longUrlPath=longUrlPath.substring(0,longUrlPath.lastIndexOf('?'));
            
        //recursively remove the section after the last '/' until a valid filename occurs
        const idx = longUrlPath.lastIndexOf('/');
        if (/^(?=[\S])[^\\ \/ : * ? " < > | ]+$/.test(longUrlPath.substring(idx + 1))) {         
            const validFileName = longUrlPath.substring(idx + 1);
            console.log(validFileName); //Returns SB_20Detail.jpg
            return validFileName;
        }
        //if name not yet valid, remove last section and call function again
        longUrlPath = longUrlPath.substring(0, idx);
        this.shortFileNameFn(longUrlPath);
    } 
};


const { shortFileNameFn } = require('./toStack');
const longProductImageUrl = 'https://img1.wsimg.com/isteam/ip/7ed83e96-6fb7-4d7c-bfe9-1a34fcbed15e/SB_20Detail.jpg/:/cr=t:31.25_25,l:0_25,w:100_25,h:37.5_25/rs=w:388,h:194,cg:true';
const shortProductImageUrl = shortFileNameFn(longProductImageUrl);
console.log('Short File Name:', shortProductImageUrl); //Returns undefined