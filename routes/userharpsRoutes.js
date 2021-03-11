const express = require('express');
const router = express.Router();
const userharpsController = require('../controllers/userharpsController');
const authController = require('../controllers/authController');

router.post('/createuserharp', userharpsController.createUserharps);
router.get('/loginuserharp', userharpsController.loginUserharps);
// router.post('/loginuserharp', userharpsController.loginUserharps);
router.post('/', userharpsController.getOne);
router.post('/getuserharplist', userharpsController.getUserharpsList);
router.patch('/updateuserharp', userharpsController.updateUserharps);
router.post('/deleteuserharps', userharpsController.deleteUserharps);

module.exports = router;
