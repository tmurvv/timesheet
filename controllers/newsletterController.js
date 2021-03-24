const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const atob = require('atob');
const bcrypt = require('bcrypt');
const { Agreements } = require('../assets/data/Schemas');
const {emailVerifySend, emailResetPassword} = require('../email');
const { Users } = require('../assets/data/UserSchema');
const express = require('express');
const app = express();
//parser for pug
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

exports.unsubscribe = async (req, res) => {
    console.log('iminunsubscribe')
    console.log(req.query.email)
    try {
        const userInfo = await Users.findOne({email: req.query.email});
        if (!userInfo) throw 'Email not found';
        try {
            await Users.findByIdAndUpdate(userInfo._id, {newsletter: false});
            console.log('success')
            res.status(200).render('newsletter', {
                "Access-Control-Allow-Origin": "*",
                status: 'success',
                message: 'Email has been unsubscribed from newsletter.'
            });
            
        } catch {
            
            console.log('fail500')
            res.status(500).render('newsletter',{
                "Access-Control-Allow-Origin": "*",
                status: 'fail',
                message: 'An error occurred updating your newsletter subscription. Please check your network connection or try again later.'
            });
        }
    } catch {
        console.log('fail400')
        
        res.status(400).render('newsletter', {
            "Access-Control-Allow-Origin": "*",
            status: 'fail',
            message: 'Email not found. Please contact findaharp.com on the contact form if you continue to get newletters.'
        });
    }
}

