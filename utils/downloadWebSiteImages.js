const fs = require('fs');
const request = require('request');
const { shortFileName } = require('./helpers.js');

const download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

exports.downloadImage = (domain, url) => {    
    const fullHarpPath = `${domain}${url}`;
    console.log('urldownload')
    console.log(url);

    const myUrl = `img/${shortFileName(url)}`;
    console.log(myUrl)
    fs.stat(myUrl, function(err, stat) {
        if(err == null) { 
            console.log('File exists');
        } else if(err.code === 'ENOENT') {
            download(fullHarpPath, myUrl, function(){
                console.log(`Image saved to ${myUrl}`);
            });
        } else {
            console.log('Some other error: ', err.code);
        }
    }); 
} 
 

// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//   console.log('done');
// });