const User = require('../models/User');
              
// @desc    Create new user
// @route   POST /api/v1/users/
// @access  Private
exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    } catch(err) {
        res.status(400).json({ success: false })
    }
};

// @desc    Update user
// @route   PUT /api/v1/users/:id
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
// @route   PUT /api/v1/users/:id
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