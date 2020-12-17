const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');

router.get('/harpsetc', partnerController.viewAgreement);
router.post('/harpsetcagree', partnerController.createAgreement);
// router.get('/', authController.protect, authController.restrictTo('admin'), partnerController.getAll);
// router.get('/me/:partnerid', partnerController.getMe);
// router.patch('/updatepartner/:partnerid', partnerController.updatepartner);
// router.patch('/updatepassword/:partnerid', partnerController.updatePassword);
// router.get('/sendresetemail/:partneremail', partnerController.sendResetEmail);
// router.get('/verifypartner/:partneremail', partnerController.verifypartner);
// router.delete('/deletepartner/:partnerid', partnerController.deletepartner);

module.exports = router;
