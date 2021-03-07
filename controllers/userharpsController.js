const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const atob = require('atob');
const bcrypt = require('bcrypt');
const { Userharps } = require('../assets/data/HarpSchema');
const {emailVerifySend, emailResetPassword} = require('../email');

const signToken = userharpId => jwt.sign({ id: userharpId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
});

const createSendToken = (userharp, login, statusCode, res) => {
    console.log('intoken')
    // console.log('token', userharp, login, statusCode)
    const harpToken = signToken(userharp._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*5000*1000),
        httpOnly: true,
        data: userharp
    }
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt-userharp', harpToken, cookieOptions);
    console.log('send status')
    res.status(statusCode).json({
        "Access-Control-Allow-Origin": "*",
        status: 'success',
        harpToken,
        userharp,
        login
    });
}

exports.createUserharps = async (req, res) => {
    console.log('in create', req.body)
    try {
        const foundHarp = await Userharps.findOne({ email: req.body.oldemail, harpname: req.body.oldharpname })
        console.log('found', foundHarp)
        if (foundHarp) throw new Error('This harp name and email combination already exists.') ;
        const userharp = Object.assign({ 
            harpname: req.body.oldharpname,
            email: req.body.oldemail,
            stringform: req.body.stringform
        });
        try {
            let harplist;
            let addeduserharp = await Userharps.create(userharp);
            if (addeduserharp) harplist = await Userharps.find({email: req.body.oldemail})
            console.log('harplist', harplist)
            addedCopy = {...addeduserharp._doc, harplist}
            // addeduserharp.harplist = harplist;
            console.log('added', addedCopy)
            try {
                console.log('incookietry')
                createSendToken(addedCopy, false, 201, res);
            } catch(e) {
                
                // just continue NYI send error to web master
                console.log('error sending userharp cookie', e.message)
            }
            
        } catch (e) {
            console.log('error', e.message)
            res.status(500).json({
                title: 'FindAHarp.com | Create Userharp',
                status: 'fail',
                data: {
                    message: `Something went wrong creating harp profile. ${e.message}`
                }
            });
        }
    } catch(e) {
        res.status(500).json({
            title: 'FindAHarp.com | Create Harp',
            status: 'fail',
            message: `Something went wrong creating harp profile. ${e.message}`
        });
    }       
}  

exports.loginUserharps = async (req, res) => {
    console.log('login', req.body)
    if (req.body.oldharpname&&req.body.oldharpname==='get list') {
        try {
            // find Userharps
            let harplist;
            // if not cookie check
            if (req.body.oldemail) {
                harplist = await Userharps.find({email: req.body.oldemail})
            } else {
                throw new Error('Email not provided.');
            }
            // console.log('login harplist', harplist)
            // console.log(userharpsInfo)
            // if cookie check
            // if (req.body.cookieId) userharpsInfo = await Userharps.findById(req.body.cookieId);
            // check userharps found
            if (!harplist) throw new Error('No harps found for this email.');
        
           // add JWT and send
            createSendToken(harplist, true, 200, res);
            console.log('success')
        } catch (e) {
            console.log('login error', e.message)
            if (!req.body.cookieId) res.status(400).json({
                title: 'FindAHarp.com | Login Userharps',
                status: 'fail',
                message: e.message,
                userharpsemail: req.body.email
            });
            if (req.body.cookieId) res.status(400).json({
                title: 'FindAHarp.com | Login Userharps',
                status: 'fail',
                message: "JWT cookie login failed"
            });
        }
    } else {
        try {
            // find Userharps
            let userharpsInfo;
            let harplist;
            // if not cookie check
            if (req.body.oldemail&&req.body.oldharpname) {
                userharpsInfo = await Userharps.findOne({email: req.body.oldemail, harpname: req.body.oldharpname});
                harplist = await Userharps.find({email: req.body.oldemail})
            } else {
                throw new Error('Harpname or email not found.');
            }
            // console.log('login harplist', harplist)
            // console.log(userharpsInfo)
            // if cookie check
            // if (req.body.cookieId) userharpsInfo = await Userharps.findById(req.body.cookieId);
            // check userharps found
            if (!userharpsInfo) throw new Error('Harp not found.');
            // remove password from result
            let userharpsCopy = {...userharpsInfo._doc};
            if (harplist) userharpsCopy.harplist = harplist;
        
           // add JWT and send
            createSendToken(userharpsCopy, true, 200, res);
            console.log('success')
        } catch (e) {
            console.log('login error', e.message)
            if (!req.body.cookieId) res.status(400).json({
                title: 'FindAHarp.com | Login Userharps',
                status: 'fail',
                message: e.message,
                userharpsemail: req.body.email
            });
            if (req.body.cookieId) res.status(400).json({
                title: 'FindAHarp.com | Login Userharps',
                status: 'fail',
                message: "JWT cookie login failed"
            });
        }
    }
    
}
exports.getAll = async (req, res) => {
    try {
        const allUserharps = await Userharps.find();
        if (!allUserharps) throw new Error();

        res.status(200).json({
            title: 'FindAHarp.com | Get All Userharps',
            status: 'success',
            data: {
                allUserharps
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Get All Userharps',
            status: 'fail',
            data: {
                message: `Something went wrong getting all userharps: ${e.message}`
            }
        });
    }
}
exports.getUserharpsList = async (req, res) => {
    console.log('here', req.body)
    try {
        const allUserharps = await Userharps.find({email: req.body.email});
        if (!allUserharps) throw new Error();
        console.log('foundNowNow', allUserharps)
        res.status(200).json({
            title: 'FindAHarp.com | Get All Userharps',
            status: 'success',
            harplist: allUserharps
        });
    } catch (e) {
        console.log('errornownow', e.message)
        res.status(500).json({
            title: 'FindAHarp.com | Get All Userharps',
            status: 'fail',
            data: {
                message: `Something went wrong getting all userharps: ${e.message}`
            }
        });
    }
}

exports.updateUserharps = async (req, res) => {
    console.log('update harp', req.body)
    // console.log('update body', req.body)
    // get userharps  
    const userharpInfo = await Userharps.findOne({harpname: req.body.oldharpname, email: req.body.oldemail});
    // error if no userharps
    if (!userharpInfo) {
        console.log('nouserharps')
        return res.status(500).json({
            title: 'FindAHarp.com | Update Userharps',
            status: 'fail',
            message: `User harp not found.`
        });
    }
    // create new updateUserharps object
    const updateUserharp = {
        harpname: req.body.harpname,
        email: req.body.email
    }
    // update the userharps
    try {
        await Userharps.findByIdAndUpdate(userharpInfo._id, updateUserharp);
        const updatedUserharp = await Userharps.findById(userharpInfo._id);
        if (!updatedUserharp) throw new Error();
        res.status(200).json({
            title: 'FindAHarp.com | Update Userharps',
            status: 'success',
            message: 'Userharps updated',
            updatedUserharp
        });
    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            title: 'FindAHarp.com | Update Userharps',
            status: 'fail',
            data: {
                message: `Something went wrong while updating userharps: ${e.message}`
            }
        });
    }
}
exports.getOne = async (req, res) => {
    // get userharps  
    const userharp = await Userharps.findOne({harpname: req.body.harpname, email: req.body.email});
    // error if no userharps
    if (!userharp) {
        console.log('nouserharps')
        return res.status(500).json({
            title: 'FindAHarp.com | Update Userharps',
            status: 'fail',
            message: `User harp not found.`
        });
    }

    res.status(200).json({
        title: 'FindAHarp.com | Find Userharp',
        status: 'success',
        message: 'Userharp found',
        userharp
    });
}

exports.deleteUserharps = async (req, res) => {
    // get userharps  
    const userharpsInfo = await Userharps.findById(req.params.userharpsid);
    // error if no userharps
    if (!userharpsInfo) {
        return res.status(500).json({
            title: 'FindAHarp.com | Update Userharps',
            status: 'fail',
            message: `Userharps not found.`
        });
    }
    // check password
    try {
        if(!await bcrypt.compare(req.query.editpassword, userharpsInfo.password)) {
            return res.status(500).json({
                title: 'FindAHarp.com | Update Userharps',
                status: 'fail',
                message: `Password incorrect.`
            });
        }
    } catch(e) {
        return res.status(500).json({
            title: 'FindAHarp.com | Delete Userharps',
            status: 'fail',
            data: {
                message: `Something went wrong while deleting userharps: ${e.message}`
            }
        });
    }
    
    try {
        // find and delete userharps
        const userharps = await Userharps.findByIdAndDelete(req.params.userharpsid);
        // throw error if not successful
        if (!userharps) throw new Error();
        // return result
        return res.status(200).json({
            title: 'FindAHarp.com | Delete Userharps',
            status: 'success',
            data: {
                message: 'Userharps deleted',
                userharps
            }
        });
    } catch (e) {
        return res.status(500).json({
            title: 'FindAHarp.com | Delete Userharps',
            status: 'fail',
            data: {
                message: `Something went wrong while deleting userharps: ${e.message}`
            }
        });
    }
}
