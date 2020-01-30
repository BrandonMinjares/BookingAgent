const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const sendEmail = require('../utils/email');
const asyncHandler = require('../middleware/async');
const passport = require('passport');

// @desc    Register User
// @route   POST /auth/register
// @access  Public
exports.register = asyncHandler(async(req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

});


// @desc    Login User
// @route   POST /auth/login
// @access  Public
exports.login = ((req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    })(req, res, next);
    console.log('loggedin');
});

// @desc    Log user out / clear cookie
// @route   GET /auth/logout
// @access  Private
exports.logout = ( (req, res) => {
    console.log('testing in lougout');
    req.logout();
    
    req.session.destroy(function (err) {
        if (err) { return next(err); }
        // The response should indicate that the user is no longer authenticated.
        return res.send({ authenticated: req.isAuthenticated() });
      });
      
    res.redirect('/login');
});


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


// @desc    Forgot Password
// @route   POST /auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email });

    if(!user) {
        return next(new ErrorResponse('There is no user with that email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you or someone else has requested 
                    the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        });

        return res.status(200).json({ success: true, data: `Email sent to ${user.email}`});
    } catch(err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse('Email could not be sent', 500));
    }

    res.status(200).json({
        success:true,
        data:user
    });
});