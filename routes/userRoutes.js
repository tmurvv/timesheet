const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/createuser', userController.createUser);
router.get('/', userController.getAll);
router.get('/me/:userid', userController.getMe);
router.patch('/updateuser/:userid', userController.updateUser);
router.delete('/deleteuser/:userid', userController.deleteUser);

module.exports = router;
