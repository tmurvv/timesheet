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

exports.downloadImage = (url) => {
    
    // const myUrl = shortFileName(url);
    // const myUrl = new URL('Ogden_3870.jpg', 'https://onestopharpshop-api.herokuapp.com/');
     
    const myUrl = 'img/fh36s_16868.jpg';
    console.log(myUrl, url)
    fs.stat(myUrl, function(err, stat) {
        console.log(err)
        if(err == null) {
            console.log('File exists');
        } else if(err.code === 'ENOENT') {
            download(url, myUrl, function(){
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