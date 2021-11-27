const User = require('../model/user'); // Import User Model Schema

const ErrorHandler = require('../utils/errorHandler'); // Importing ErrorHandler from utils
const { use } = require('../routes/auth'); // Importing route to redirect
const sendToken = require('../utils/jwtToken');  // Importing sendToken from utils
const catchAsyncErrors = require('../middlewares/catchAsyncErrors'); // Importing catchAsyncErrors from middlewares

//registering a new user => POST /api/v1/auth/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({ 
        name, 
        email, 
        password, 
        avatar: {
            public_id: '',
            url: '',
        }, 
        role 
    });

    //send token to client
    sendToken(user, 200, res);
});

//login a user => POST /api/v1/auth/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //1) check if user typed both credentials
    if (!email || !password) {
        return next(new ErrorHandler('Please provide email and password', 400));
    }

    //2) check if email and password exist
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.isPasswordMatch(password, user.password))) {
        return next(new ErrorHandler('Input credentials do not match. ', 401));
    }

    //3) check if password is valid
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Password did not match. Try Again.', 401));
    }

    //4) send the token to the user
    const token = user.getJwtToken();
    res.status(200).json({
        status: 'success',
        token,
    });
});

// logout a user => POST /api/v1/auth/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookies('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        status: 'success',
        message: 'Logged Out'
    });
});

 

