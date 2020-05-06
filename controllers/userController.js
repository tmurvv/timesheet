const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { Users } = require('../assets/data/Schemas');

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
            password: hashPassword, 
            firstname: req.body.firstname, 
            lastname: req.body.lastname, 
            email: req.body.email
        });
        const added = await Users.create(user);
        if (!added) {
            throw new Error();
        } else {
            // send email verification
        }

        res.status(200).json({
            title: 'FindAHarp.com | Create User',
            status: 'success',
            data: {
                added
            }
        });
    } catch (e) {
        res.status(500).json({
            title: 'FindAHarp.com | Create User',
            status: 'fail',
            data: {
                message: `Something went wrong while creating user: ${e.message}`
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
        // check password
        if(!await bcrypt.compare(req.body.password, userInfo.password)) throw new Error('Password incorrect.');
        // remove password from result
        let userCopy = {...userInfo._doc};
        delete userCopy.password;
        // send result to client
        res.status(200).json({
            title: 'FindAHarp.com | Login User',
            status: 'success',
            data: {
                userCopy
            }
        });
    } catch (e) {
        res.status(400).json({
            title: 'FindAHarp.com | Login User',
            status: 'fail',
            data: {
                message: `Something went wrong while logging in user: ${e.message}`
            }
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
    try {
        await Users.findByIdAndUpdate(req.params.userid, req.body);
        const updatedUser = await Users.findById(req.params.userid);
        if (!updatedUser) throw new Error();
        res.status(200).json({
            title: 'FindAHarp.com | Update User',
            status: 'success',
            data: {
                message: 'User updated',
                data: updatedUser
            }
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
exports.deleteUser = async (req, res) => {
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