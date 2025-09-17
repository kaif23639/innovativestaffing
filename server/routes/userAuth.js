const express = require('express');
const router = express.Router();

const { login } = require('../controllers/userController');
const userController = require('../controllers/userController');

router.post('/signup/request-otp', userController.requestSignupOtp);
router.post('/signup/verify-otp', userController.verifySignupOtp);
router.post('/password-reset/request',userController.requestPasswordReset);
router.post('/password-reset/reset', userController.resetPassword);
router.post('/login', login);


module.exports = router;
 
