const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

//%^%^%^%^^%^%^%^%^%^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//Sub Docs

// refreshMakesModels();

// const go = (async () => {
//     const result = await MakesModels.find(); 
//     console.log(JSON.stringify(result));
// });
// go();
// console.log(MakesModels.find());

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
        useFindAndModify: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful'));

/**************
 * Start Server
 *************/
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`onestopharpshop-api running on port: ${port}...`);
});

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
 