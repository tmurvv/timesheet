const express = require('express');
const router = express.Router();
// const imageController = require('../controllers/imageController');

// router.post('/createuser', userController.createUser);
router.get('/:name', (req, res, next) => {
    const options = {
        root: path.join(__dirname, 'assets/img'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
  
    const fileName = req.params.name
    
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(new AppError(`No image found with the file name '${fileName}'.`, 404))
        } else {
            console.log('Sent:', fileName)
        } 
    });
});
// router.get('/me/:userid', userController.getMe);
// router.patch('/updateuser/:userid', userController.updateUser);
// router.delete('/deleteuser/:userid', userController.deleteUser);

module.exports = router;
