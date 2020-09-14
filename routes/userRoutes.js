const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/createuser', userController.createUser);
router.post('/loginuser', userController.loginUser);
router.get('/', authController.protect, authController.restrictTo('admin'), userController.getAll);
router.get('/me/:userid', userController.getMe);
router.patch('/updateuser/:userid', userController.updateUser);
router.patch('/updatepassword/:userid', userController.updatePassword);
router.get('/sendresetemail/:useremail', userController.sendResetEmail);
router.get('/verifyuser/:useremail', userController.verifyUser);
router.delete('/deleteuser/:userid', userController.deleteUser);

module.exports = router;
