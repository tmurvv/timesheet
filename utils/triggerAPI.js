const request = require('request');
request('https://findaharp-api-development.herokuapp.com/api/v1/productads', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML
});