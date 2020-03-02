var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const url = 'https://www.harpconnection.com/storeimages/usedharps/2019/Ogden_3870.jpg';
const myUrl = 'img/Ogden_3870.jpg';
fs.stat(myUrl, function(err, stat) {
    if(err == null) {
        console.log('File exists');
    } else if(err.code === 'ENOENT') {
        download(url, 'img/Ogden_3870.jpg', function(){
            console.log(`Image saved to ${myUrl}`);
        });
    } else {
        console.log('Some other error: ', err.code);
    }
});

// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//   console.log('done');
// });