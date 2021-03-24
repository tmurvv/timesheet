const express = require('express');

const newsletterController = require('./../controllers/newsletterController');

//const authController = require('./../controllers/authController');

const router = express.Router();

//router.use(authController.isLoggedIn);
router.get('/unsubscribe', newsletterController.unsubscribe);
// router.post('/uploadlisting', productController.uploadlisting);


// router.get('/productads', (req, res) => {
//     // send results 
//     res.status(200).json({
//         title: 'OneStopHarpShop | Used Harps',
//         status: 'success',
//         // harpMakesModels: productMakesModels,
//         harpData: usedHarps  
//     });
// });
// router.get('/productads', viewController.getUsedHarp);

module.exports = router;