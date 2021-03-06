const fs = require('fs');
const request = require('request');
const path = require('path')
const getColors = require('get-image-colors')

const download = function(uri, filename, callback) {
    try {
        request.head(uri, function(err, res, body) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            process.on('uncaughtException', function (error) {
                console.log('from download function in downloadWebSiteImages.js:', error.message);
            });
            const file = request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    } catch (err) {
        console.log('Image failed to write:', err.message)
    }    
};

exports.downloadImage = (longFileName, shortFileName) => {
    if (shortFileName !== undefined && /^(?=[\S])[^\\ \/ : * ? " < > | ]+$/.test(shortFileName)) {
        const myUrl = `assets/img/${shortFileName}`;
        fs.stat(myUrl, function(err, stat) {
            if(err == null) {
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
 