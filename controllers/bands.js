const ErrorResponse = require('../utils/errorResponse');
const Band = require('../models/Bands');

// @desc    Get all bands
// @route   GET /api/v1/bands
// @access  Public
exports.getBands = async (req, res, next) => {
    try {
        const bands = await Band.find();
        res.status(200).json({ success: true, count: bands.length, data: bands});
    } catch(err) {
        next(err);
    }
};

// @desc    Get single band
// @route   GET /api/v1/bands/:id
// @access  Public
exports.getBand = async (req, res, next) => {
    try { 
        const band = await Band.findById(req.params.id);

        // If the ID is in the correct format but the band does not exist you get custom error message
        if(!band) {
            return next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
        } 

        res.status(200).json({ success: true, data: band});
    } catch(err) {
        // If the ID is in the incorrect format you get custom error message
        
        next(err);
        //next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
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
        next(err);
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
        next(err);
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
        next(err);
    }
};


// @desc    Get bands within a radius
// @route   GET /api/v1/bands/radius/:zipcode/:distance
// @access  Private
exports.getBandsInRadius = async (req, res, next) => {
    const { zipCode, distance } = req.params;

    // Get lat/lng from geocoder
};