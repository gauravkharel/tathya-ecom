const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser, 
    forgotPassword
    // getUser,
    // updateUser,
    // deleteUser
} = require('../controllers/authController');

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/password/forgot').post(forgotPassword);
// router.route('/password/reset/:token').put(resetPassword)

module.exports = router;


