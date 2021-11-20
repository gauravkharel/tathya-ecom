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

    
});

