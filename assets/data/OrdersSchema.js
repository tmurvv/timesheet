const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { GERMAINE_STRINGS } = require('../constants/GermaineStrings');

// Orders from harp and merch sellers - for now save ordernum and pdf
const ordersSchema = new mongoose.Schema({
    ordernum: String,
    usernum: String,
    userfirstname: String,
    userlastname: String,
    useradd1: String,
    useradd2: String,
    usercity: String,
    userregion: String,
    userzippostal: String,
    usercountry: String,
    userphone1: String,
    userphonealt: String,
    orderdetail: String
},{ versionKey: false, timestamps: true });

const Orders = mongoose.model('Orders', ordersSchema);


module.exports.Orders = Orders;
