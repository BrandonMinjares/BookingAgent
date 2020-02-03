const User = require('../models/User');
const Bands = require('../models/Bands');

const ErrorResponse = require('../utils/errorResponse');    
const sendEmail = require('./../utils/email');
const asyncHandler = require('../middleware/async');

// @desc    Create new user
// @route   POST /users/
// @access  Private
exports.createUser = asyncHandler(async (req, res, next) => {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
});

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    const bands = await Bands.find({ user: req.params.id });

    return res.render('profile', {user, bands});
    /*
    res.status(200).json({
      success: true,
      data: user, bands
    }); */
  });

// @desc    Update user
// @route   PUT /users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!user) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user })
    } catch(err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Delete user
// @route   PUT /users/:id
// @access  Private
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} })
    } catch(err) {
        res.status(400).json({ success: false });
    }
};