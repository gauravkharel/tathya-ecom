const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
    registerUser,
    loginUser,
    logoutUser, 
    forgotPassword
    // getUser,
    // updateUser,
    // deleteUser
} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/logout').get(logout);

module.exports = router;


