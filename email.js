// var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//#region TEST SENDGRID
const email = () => {
    // using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const msg = {
  to: 'tmurv@shaw.ca',
  from: 'app167126049@heroku.com',
  subject: 'Sending with SendGrid is Fun findaharpapi',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
console.log('email.js00000000000000000000000000000')
sgMail.send(msg);
    
    // sg.API(request, function(error, response) {
    //     console.log('imin0000000000000000000000000000000')
    //     console.log('status', response.statusCode);
    //     console.log('body', response.body);
    //     console.log('body', response.body);
    //     console.log('headers', response.headers);
    // });
}

//#endregion
module.exports = email;
