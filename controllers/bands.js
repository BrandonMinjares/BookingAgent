const Band = require('../models/Bands');

// @desc    Get all bands
// @route   GET /api/v1/bands
// @access  Public
exports.getBands = async (req, res, next) => {
    try {
        const bands = await Band.find();
        res.status(200).json({ success: true, data: bands});
    } catch(err) {
        res.status(200).json({ success: false});
    }
};

// @desc    Get single band
// @route   GET /api/v1/bands/:id
// @access  Public
exports.getBand = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: `Show band ${req.params.id}`});
};

// @desc    Create new band
// @route   POST /api/v1/bands/
// @access  Private
exports.createBand = async (req, res, next) => {
    try {
        const band = await Band.create(req.body);
        res.status(201).json({
            success: true,
            data: band
        });
    } catch(err) {
        res.status(400).json({ success: false })
    }
};

// @desc    Update band
// @route   PUT /api/v1/bands/:id
// @access  Private
exports.updateBand = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: `Update band ${req.params.id}`});
};

// @desc    Delete band
// @route   PUT /api/v1/bands/:id
// @access  Private
exports.deleteBand = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: `Delete band ${req.params.id}`});
};