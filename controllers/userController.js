const uuid = require('uuid');
const atob = require('atob');
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
            newsletter: req.body.newsletter,
            distanceunit: req.body.distanceunit,
            currency: req.body.currency,
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
            message: e.message,
            useremail: req.body.email
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
exports.verifyUser = async (req, res) => {
    // get user  
    const userInfo = await Users.find({email: req.params.useremail});
    // error if no user
    if (!userInfo || userInfo.length === 0) {
        res.redirect('https://findaharp-staging.take2tech.ca?activateemail=notfound')
    }
    // update the user
    try {
        const updatedUser = await Users.findOneAndUpdate({email: req.params.useremail}, {emailverified: true}, {new: true});
        if (!updatedUser) throw new Error();
        
        res.redirect('https://findaharp-staging.take2tech.ca?activateemail=yes')

    } catch (e) {
        res.redirect('https://findaharp-staging.take2tech.ca?activateemail=no')
    }
};
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
        newsletter: req.body.newsletter,
        distanceunit: req.body.distanceunit,
        currency: req.body.currency
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
    const useremail = req.params.userid;
    // if call is from password reset email
    if (req.body.resetpassword) {
        try {
            // hash password
            const saltRounds=10;
            const hashPassword = await bcrypt.hash(req.body.resetpassword, saltRounds);
            // update user
            const result = await Users.findOneAndUpdate({email: useremail}, {password: hashPassword});
            // return result
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
    // else call is from user profile change password
    } else {
        try {
            // find user
            const userInfo = await Users.findById(userid);
            
            // check old password
            if(!await bcrypt.compare(req.body.oldpassword, userInfo.password)) {
                return res.status(500).json({
                    title: 'FindAHarp.com | Update Password',
                    status: 'fail',
                    message: `Old Password incorrect.`
                });
            }
            // hash new password
            const saltRounds=10;
            const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
            // update user password
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
    try {
        // find user
        const user = await Users.find({email: req.params.useremail});
        if (!user) throw new Error();
        // send reset email
        try{
            emailResetPassword(user[0]);
        } catch(e) {
            throw new Error('There was a problem sending reset email. Please try again.');
        }
        // return result
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
    try {
        if(!await bcrypt.compare(req.query.editpassword, userInfo.password)) {
            return res.status(500).json({
                title: 'FindAHarp.com | Update User',
                status: 'fail',
                message: `Password incorrect.`
            });
        }
    } catch(e) {
        return res.status(500).json({
            title: 'FindAHarp.com | Delete User',
            status: 'fail',
            data: {
                message: `Something went wrong while deleting user: ${e.message}`
            }
        });
    }
    
    try {
        // find and delete user
        const user = await Users.findByIdAndDelete(req.params.userid);
        // throw error if not successful
        if (!user) throw new Error();
        // return result
        return res.status(200).json({
            title: 'FindAHarp.com | Delete User',
            status: 'success',
            data: {
                message: 'User deleted',
                user
            }
        });
    } catch (e) {
        return res.status(500).json({
            title: 'FindAHarp.com | Delete User',
            status: 'fail',
            data: {
                message: `Something went wrong while deleting user: ${e.message}`
            }
        });
    }
}
