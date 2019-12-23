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
exports.getBand = async (req, res, next) => {
    try { 
        const band = await Band.findById(req.params.id);

        // If the band does not exist you also get an error message
        if(!band) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: band});
    } catch(err) {
        res.status(200).json({ success: false});
    }
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
exports.updateBand = async (req, res, next) => {
    try {
        const band = await Band.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!band) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: band })
    } catch(err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Delete band
// @route   PUT /api/v1/bands/:id
// @access  Private
exports.deleteBand = async (req, res, next) => {
    try {
        const band = await Band.findByIdAndDelete(req.params.id);
        if(!band) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} })
    } catch(err) {
        res.status(400).json({ success: false });
    }
};