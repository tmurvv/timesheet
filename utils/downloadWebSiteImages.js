const fs = require('fs');
const axios = require('axios');
const request = require('request');
const path = require('path')
const getColors = require('get-image-colors')

/* ============================================================
  Function: Download Image
============================================================ */

exports.downloadImage = (url, image_path) => {
    if (image_path !== undefined && /^(?=[\S])[^\\ \/ : * ? " < > | ]+$/.test(image_path)) {
        const myUrl = `assets/img/${image_path}`;
        axios({
            url,
            responseType: 'stream',
        }).then(
            response =>
            new Promise((resolve, reject) => {
                response.data
                .pipe(fs.createWriteStream(myUrl))
                .on('finish', () => resolve())
                .on('error', e => reject(e));
            }),
        );
    }
}

/* ============================================================
  Download Images in Order
============================================================ */

// (async () => {
//   let example_image_1 = await download_image('https://example.com/test-1.png', 'example-1.png');

//   console.log(example_image_1.status); // true
//   console.log(example_image_1.error); // ''

//   let example_image_2 = await download_image('https://example.com/does-not-exist.png', 'example-2.png');

//   console.log(example_image_2.status); // false
//   console.log(example_image_2.error); // 'Error: Request failed with status code 404'

//   let example_image_3 = await download_image('https://example.com/test-3.png', 'example-3.png');

//   console.log(example_image_3.status); // true
//   console.log(example_image_3.error); // ''
// })();







// const download = function(uri, filename, callback) {
//     try {
//         request.head(uri, function(err, res, body) {
//             console.log('content-type:', res.headers['content-type']);
//             console.log('content-length:', res.headers['content-length']);
//             process.on('uncaughtException', function (error) {
//                 console.log('from download function in downloadWebSiteImages.js:', error.message);
//             });
//             const file = request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//         });
//     } catch (err) {
//         console.log('Image failed to write:', err.message)
//     }    
// };

// exports.downloadImage = (longFileName, shortFileName) => {
    // if (shortFileName !== undefined && /^(?=[\S])[^\\ \/ : * ? " < > | ]+$/.test(shortFileName)) {
    //     const myUrl = `assets/img/${shortFileName}`;
//         fs.stat(myUrl, function(err, stat) {
//             if(err == null) {
//             } else if(err.code === 'ENOENT') {
//                 download(longFileName, myUrl, function(){
//                     console.log(`Image saved to ${myUrl}`);
//                 });
//             } else {
//                 console.log('Error on file download: ', err.message);
//             }
//         });
//     } else {
//         console.error('Invalid filename:', shortFileName);
//     } 
// }
 