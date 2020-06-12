const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { Users } = require('../assets/data/Schemas');
const {emailVerifySend, emailResetPassword} = require('../email');

exports.getMe = async (req, res) => {
    try {
        const user = await Users.findById(req.params.userid);
        if (!user) throw new Error();
        res.status(200).json({
            title: 'FindAHarp.com | Get User',
            status: 'success',
            data: {
                user
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Get User',
            status: 'fail',
            data: {
                message: `Something went wrong finding your account: ${e.message}`
            }
        });
    }
}

exports.createUser = async (req, res) => {
    try {
        const saltRounds=10;
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = Object.assign({ 
            contactId: uuid(), 
            usertype: 'user',
            firstname: req.body.firstname, 
            lastname: req.body.lastname, 
            email: req.body.email,
            password: hashPassword,
            distanceunit: req.body.distanceunit,
            emailverified: false,
            _date_created: Date.now()
        });
        const addeduser = await Users.create(user);
        if (addeduser) {
            try{
                emailVerifySend(user);
            } catch(e) {
                throw new Error('There was a problem sending verification email. Please try again.');
            }
            
        } else {
            throw new Error();
        }

        res.status(200).json({
            title: 'FindAHarp.com | Create User',
            status: 'success',
            addeduser
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Create User',
            status: 'fail',
            data: {
                message: e.message
            }
        });
    }
}
exports.loginUser = async (req, res) => {
    try {
        // find User
        const userInfo = await Users.findOne({email: req.body.email});
        // check user exists
        if (!userInfo) throw new Error('Email not found.');
        // check if email is verified:
        if (!userInfo.emailverified) throw new Error(`The email ${userInfo.email} is not yet verified. Please check your inbox for a verification email from Findaharp.com.`);
        // check password
        if(!await bcrypt.compare(req.body.password, userInfo.password)) throw new Error('Password incorrect.');
        // remove password from result
        let userCopy = {...userInfo._doc};
        delete userCopy.password;
        // send result to client
        res.status(200).json({
            title: 'FindAHarp.com | Login User',
            status: 'success',
            user: userCopy
        });
    } catch (e) {
        res.status(400).json({
            title: 'FindAHarp.com | Login User',
            status: 'fail',
            message: e.message
        });
    }
}
exports.getAll = async (req, res) => {
    try {
        const allUsers = await Users.find();
        if (!allUsers) throw new Error();

        res.status(200).json({
            title: 'FindAHarp.com | Get All Users',
            status: 'success',
            data: {
                allUsers
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Get All Users',
            status: 'fail',
            data: {
                message: `Something went wrong getting all users: ${e.message}`
            }
        });
    }
}
exports.updateUser = async (req, res) => {
    // get user  
    const userInfo = await Users.findById(req.params.userid);
    // error if no user
    if (!userInfo) {
        return res.status(500).json({
            title: 'FindAHarp.com | Update User',
            status: 'fail',
            message: `User not found.`
        });
    }
    // check password
    if(!await bcrypt.compare(req.body.password, userInfo.password)) {
        return res.status(500).json({
            title: 'FindAHarp.com | Update User',
            status: 'fail',
            message: `Password incorrect.`
        });
    }
    // create new updateUser object
    const updateUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        distanceunit: req.body.distanceunit,
    }
    // update the user
    try {
        await Users.findByIdAndUpdate(userInfo._id, updateUser);
        const updatedUser = await Users.findById(userInfo._id);
        if (!updatedUser) throw new Error();
        let userCopy = {...updatedUser._doc};
        delete userCopy.password;
        res.status(200).json({
            title: 'FindAHarp.com | Update User',
            status: 'success',
            message: 'User updated',
            userCopy
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Update User',
            status: 'fail',
            data: {
                message: `Something went wrong while updating user: ${e.message}`
            }
        });
    }
}
exports.updatePassword = async (req, res) => {
    console.log('imin', req.params.userid)
    console.log('imin', req.body)
    
    if (req.body.resetpassword) {
        console.log('imin reset', req.params.userid)
        try {
            const saltRounds=10;
            const hashPassword = await bcrypt.hash(req.body.resetpassword, saltRounds);
            console.log('password', hashPassword)
            console.log('above', req.params.userid)
            const changedUser = await Users.findOneAndUpdate({email: req.params.userid}, {password: hashPassword});
            console.log('changeduser', changedUser)
            // if (!changedUser) throw new Error;
            
            console.log('below')
            res.status(200).json({
                title: 'FindAHarp.com | Update Password',
                status: 'success',
                data: {
                    message: 'Password Updated'
                }
            });
        } catch (e) {
            res.status(500).json({
                title: 'FindAHarp.com | Update Password',
                status: 'fail',
                data: {
                    message: `Something went wrong while updating password: ${e.message}`
                }
            });
        }
    } else {
        try {
            console.log('imin try update', req.params, req.body)
            const userInfo = await Users.findById(req.params.userid);
            // check password
            if(!await bcrypt.compare(req.body.oldpassword, userInfo.password)) {
                return res.status(500).json({
                    title: 'FindAHarp.com | Update Password',
                    status: 'fail',
                    message: `Old Password incorrect.`
                });
            }
            // hash password
            const saltRounds=10;
            const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
            // update password
            const changedUser = await Users.findByIdAndUpdate(req.params.userid, {password: hashPassword});
            if (!changedUser) throw new Error;
            // return result
            res.status(200).json({
                title: 'FindAHarp.com | Update Password',
                status: 'success',
                data: {
                    message: 'Password updated'
                }
            });
        } catch(e) {
            res.status(500).json({
                title: 'FindAHarp.com | Update Password',
                status: 'fail',
                data: {
                    message: `Something went wrong while updating password: ${e.message}`
                }
            });
        }
    }   
}
exports.sendResetEmail = async (req, res) => {
    console.log('imin', req.params.useremail)
    try {
        const user = await Users.find({email: req.params.useremail});
        if (!user) throw new Error();
        console.log(user)
        try{
            emailResetPassword(user[0]);
        } catch(e) {
            throw new Error('There was a problem sending reset email. Please try again.');
        }
        console.log('below')
        res.status(200).json({
            title: 'FindAHarp.com | Reset Password',
            status: 'success',
            data: {
                message: 'Reset Email Sent',
                useremail: user.email
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Send Reset Email',
            status: 'fail',
            data: {
                message: `Something went wrong while sending reset email: ${e.message}`
            }
        });
    }
}
exports.deleteUser = async (req, res) => {
    console.log('imin', req.params)
    try {
        const user = await Users.findByIdAndDelete(req.params.userid);
        if (!user) throw new Error();
        res.status(200).json({
            title: 'FindAHarp.com | Delete User',
            status: 'success',
            data: {
                message: 'User deleted',
                user
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Delete User',
            status: 'fail',
            data: {
                message: `Something went wrong while deleting user: ${e.message}`
            }
        });
    }
}
