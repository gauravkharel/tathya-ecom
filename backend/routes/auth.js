const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
    registerUser,
    loginUser,
    logoutUser
    // getUser,
    // updateUser,
    // deleteUser
} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

module.exports = router;


