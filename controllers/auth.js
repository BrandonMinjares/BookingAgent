const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');


// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async(req, res, next) => {
    const { name, email, password } = req.body;

    // Create user
    const user = await User.create({
        name,
        email,
        password
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token: token });
});


// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

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



    // Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token: token });
});