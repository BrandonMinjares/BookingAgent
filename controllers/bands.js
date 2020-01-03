const ErrorResponse = require('../utils/errorResponse');
const Band = require('../models/Bands');
const asyncHandler = require('../middleware/async');


// @desc    Get all bands
// @route   GET /api/v1/bands
// @access  Public
exports.getBands = asyncHandler(async (req, res, next) => {
        const bands = await Band.find();
        res.status(200).json({ success: true, count: bands.length, data: bands});
});

// @desc    Get single band
// @route   GET /api/v1/bands/:id
// @access  Public
exports.getBand = asyncHandler(async (req, res, next) => {
        const band = await Band.findById(req.params.id);

        // If the ID is in the correct format but the band does not exist you get custom error message
        if(!band) {
            return next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
        } 

        res.status(200).json({ success: true, data: band});
});

// @desc    Create new band
// @route   POST /api/v1/bands/
// @access  Private
exports.createBand = asyncHandler(async (req, res, next) => {
        const band = await Band.create(req.body);
        res.status(201).json({
            success: true,
            data: band
        });
});

// @desc    Update band
// @route   PUT /api/v1/bands/:id
// @access  Private
exports.updateBand = asyncHandler(async (req, res, next) => {
        const band = await Band.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!band) {
            return next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
        } 
        res.status(200).json({ success: true, data: band })
});

// @desc    Delete band
// @route   PUT /api/v1/bands/:id
// @access  Private
exports.deleteBand = asyncHandler(async (req, res, next) => {
        const band = await Band.findByIdAndDelete(req.params.id);
        if(!band) {
            return next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
        } 
        res.status(200).json({ success: true, data: {} })
});


// @desc    Get bands within a radius
// @route   GET /api/v1/bands/radius/:zipcode/:distance
// @access  Private
exports.getBandsInRadius = async (req, res, next) => {
    const { zipCode, distance } = req.params;

    // Get lat/lng from geocoder
};