const fs = require('fs');
const request = require('request');
const { shortFileNameFn } = require('./helpers.js');

const download = function(uri, filename, callback) {
    try {
        request.head(uri, function(err, res, body) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
    
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    } catch (err) {
        console.log('Download image fuction:', err.message)
    }    
};

exports.downloadImage = (longFileName, shortFileName) => {    
    if (/^[\w,\s-]+\.[A-Za-z]{3}$/.test(shortFileName)) {
        console.log('Valid filename', shortFileName);  
        const myUrl = `assets/img/${shortFileName}`;       
        fs.stat(myUrl, function(err, stat) {
            console.log('imin')
            if(err == null) {
                console.log('File exists');
            } else if(err.code === 'ENOENT') {
                download(longFileName, myUrl, function(){
                    console.log(`Image saved to ${myUrl}`);
                });
            } else {
                console.log('Error on file download: ', err.message);
            }
        });
    } else {
        console.error('Invalid filename:', shortFileName);
    } 
}
 
// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//   console.log('done');
// });