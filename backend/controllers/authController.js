const User = require('../model/user'); // Import User Model Schema

const ErrorHandler = require('../utils/errorHandler'); // Importing ErrorHandler from utils
const { use } = require('../routes/auth'); // Importing route to redirect
const sendToken = require('../utils/jwtToken');  // Importing sendToken from utils
const catchAsyncErrors = require('../middlewares/catchAsyncErrors'); // Importing catchAsyncErrors from middlewares
const sendEmail = require('../utils/sendEmail'); // Importing sentEmail from utils

//registering a new user => POST /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    //send token to client
    sendToken(user, 200, res);
});

//login a user => POST /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //1) check if user typed both credentials
    if (!email || !password) {
        return next(new ErrorHandler('Please provide email and password', 400));
    }

    //2) check if email and password exist
    const user = await User.findOne({ email }).select('+password');
    if (!user ) {
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

//forget password => POST /api/v1/auth/forget-password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    //1) check if user typed email
    if (!email) {
        return next(new ErrorHandler('Please provide email', 400));
    }

    //2) check if email exist
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler('Email does not exist. Try Again.', 404));
    }

    //3) send the token to the user
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //4) create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;

    //5) send the email to the user
    const message = `You are receiving this email because you have requested the reset of a password. The reset token is \n\n ${resetUrl} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Tathy Shop - Password Recovery Mail',
            message
        });

        res.status(200).json({
            status: true,
            message: `Email is succesfully sent to ${user.email}`,
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler('Email could not be sent. Try Again.', 500));
    }

});


// logout a user => POST /api/v1/auth/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookies('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

});

