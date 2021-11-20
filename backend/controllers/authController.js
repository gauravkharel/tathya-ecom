const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = ErrorHandler.catchAsyncError;

//registering a new user => POST /api/v1/auth/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
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

    //send the token to the user
    const token = user.getJwtToken();
    res.status(201).json({
        status: 'success',
        token,
    });
});

//login a user => POST /api/v1/auth/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
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
 

