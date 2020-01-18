const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');


// @desc    Register User
// @route   POST /auth/register
// @access  Public
exports.register = asyncHandler(async(req, res, next) => {
    const { name, email, password } = req.body;

    // Create user
    const user = await User.create({
        name,
        email,
        password
    });

    sendTokenResponse(user, 200, res);
});


// @desc    Login User
// @route   POST /auth/login
// @access  Public
exports.login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;
    console.log('logged in');

    // Validate email and password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials. Either user does not exist or password is incorrect.', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials. Either user does not exist or password is incorrect.', 401));
    }

    // Important to make !user and !isMatch function return same message to ensure that the
    // person who entered the information isn't sure whether the error was an incorrect email
    // or an incorrect password -- Extra Security
    sendTokenResponse(user, 200, res);
});


// Get token from Model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token });
};


// @desc    Get current logged in User
// @route   POST /auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    });
});


exports.forgetPassword = (req, res, next) => {
    
};

exports.resetPassword = (req, res, next) => {

};

