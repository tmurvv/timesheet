const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const atob = require('atob');
const bcrypt = require('bcrypt');
const { Agreements } = require('../assets/data/Schemas');
const {emailVerifySend, emailResetPassword} = require('../email');

const express = require('express');
const app = express();
//parser for pug
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

exports.viewAgreement = async (req, res) => {
    console.log(req.body)
    res.status(200).render('base', {
        seller: 'Harps Etc.',
        startDate: 'January 7, 2021',
        fee: '3%'
    });
}

exports.createAgreement = async (req, res) => {
    if (!(req.body.feecheck&&req.body.feecheck==='on'&&req.body.termscheck&&req.body.termscheck==='on')) {
        return res.status(404).render('base', {
            agreement: 'fail',
            seller: req.body.seller,
            startDate: 'January 7, 2021',
            fee: '3%'
        });
    }
    try {
        const uploadagreement = Object.assign({ 
            seller: req.body.seller,
            startdate: req.body.startdate,
            fee: req.body.fee,
            scheduletext: req.body.scheduletext
        });
        // console.log('top', uploadlisting)
        const addedagreement = await Agreements.create(uploadagreement);
        // console.log('bottom', addeduploadlisting)
        // res.redirect('https://findaharp.com?uploadlisting=yes');
        // res.redirect('https://findaharp-testing.take2tech.ca?uploadlisting=yes');
        // res.redirect('http://localhost:3006?uploadlisting=yes');
        // res.status(200).json({
        //     title: 'FindAHarp.com | Upload Listing',
        //     status: 'success',
        //     addeduploadlisting 
        // });
        return res.status(200).render('base', {
            agreement: 'success',
            seller: req.body.seller
        });
    } catch (e) {
        // res.redirect('http://localhost:3006?uploadlisting=no');
        // res.redirect('https://findaharp.com?uploadlisting=no');
        // res.redirect('https://findaharp-testing.take2tech.ca?uploadlisting=no');
        return res.status(500).json({
            imin: 'error',
            message: e.message
        });
    }
    
}
exports.loginpartner = async (req, res) => {
    try {
        // find partner
        let partnerInfo;
        // if not cookie check
        if (req.body.email) {
            partnerInfo = await partners.findOne({email: req.body.email});
            // check if email is verified:
            if (!partnerInfo.emailverified) throw new Error(`The email ${partnerInfo.email} is not yet verified. Please check your inbox for a verification email from Findaharp.com.`);
            // check password
            if(!await bcrypt.compare(req.body.password, partnerInfo.password)) throw new Error('Password incorrect.');
        }
        // if cookie check
        if (req.body.cookieId) partnerInfo = await partners.findById(req.body.cookieId);
        // check partner found
        if (!partnerInfo) throw new Error('partner not found.');
        // remove password from result
        let partnerCopy = {...partnerInfo._doc};
        delete partnerCopy.password;
        // add JWT and send
        createSendToken(partnerCopy, 200, res);    
    } catch (e) {
        if (!req.body.cookieId) res.status(400).json({
            title: 'FindAHarp.com | Login partner',
            status: 'fail',
            message: e.message,
            partneremail: req.body.email
        });
        if (req.body.cookieId) res.status(400).json({
            title: 'FindAHarp.com | Login partner',
            status: 'fail',
            message: "JWT cookie login failed"
        });
    }
}
exports.getAll = async (req, res) => {
    try {
        const allpartners = await partners.find();
        if (!allpartners) throw new Error();

        res.status(200).json({
            title: 'FindAHarp.com | Get All partners',
            status: 'success',
            data: {
                allpartners
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Get All partners',
            status: 'fail',
            data: {
                message: `Something went wrong getting all partners: ${e.message}`
            }
        });
    }
}
