const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
dotenv.config({ path: './config.env' });
const app = require('./app');

/************ 
*Connect DB
*************/
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
// const DEVDB = process.env.DEV_DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DEV_DATABASE_PASSWORD
// );

// const PORTDB = process.env.PORTFOLIO_DATABASE.replace(
//     '<PASSWORD>',
//     process.env.PORTFOLIO_DATABASE_PASSWORD
// );

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful'));

/**************
 * Start Server
 *************/
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`findaharp-api running on port: ${port}...`);
});

//#region TEST SENDGRID
var from_email = new helper.Email('tech@take2tech.ca');
var to_email = new helper.Email('tmurv@shaw.ca');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});
//#endregion







//fallback exception handler (will not handle exceptions above this line of code)
process.on('uncaughtException', err => {
    console.log('Uncaught Exception.');
    console.log(err);
    server.close(() => process.exit(1));
});

//fallback rejection handler
process.on('unhandledRejection', err => {
    console.log('Unhandled rejection.');
    console.log(err.name, err.message);
    server.close(() => process.exit(1));
});
 