const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword } = require('../Controllers/authController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/forgot/password').post(forgotPassword)

module .exports = router;