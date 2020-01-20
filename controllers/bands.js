const ErrorResponse = require('../utils/errorResponse');
const Band = require('../models/Bands');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');


// @desc    Get all bands
// @route   GET /bands
// @access  Public
exports.getBands = asyncHandler(async (req, res, next) => {
        const bands = await Band.find();
        res.status(200).json({ success: true, count: bands.length, data: bands});
});

// @desc    Get single band
// @route   GET bands/:id
// @access  Public
exports.getBand = asyncHandler(async (req, res, next) => {
        const band = await Band.findById(req.user.id);

        // If the ID is in the correct format but the band does not exist you get custom error message
        if(!band) {
            return next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
        } 

        res.status(200).json({ success: true, data: band});
});

// @desc    Create new band
// @route   POST bands/
// @access  Private
exports.createBand = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id;

    // Checks if a band has already been created
    const publishedBand = await Band.findOne({ user: req.user.id });

    if(publishedBand) {
        return next(new ErrorResponse('The user has already published this band', 400));
    }

    const band = await Band.create(req.body);
    
    res.status(200).json({
        success: true,
        data: band
    }); 
});

// @desc    Update band
// @route   PUT bands/:id
// @access  Private
exports.updateBand = asyncHandler(async (req, res, next) => {
    let band = await Band.findById(req.params.id);

    if(!band) {
        return next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
    } 

    // Make sure user is band owner
    if(band.user.toString() != res.user.id && req.user.role != 'admin') {
        return next(
            new ErrorResponse(`User ${req.params.id} is not allowed to access this route`, 401)
        );
    }

    band = await Band.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });


    res.status(200).json({ success: true, data: band })
});

// @desc    Delete band
// @route   PUT bands/:id
// @access  Private
exports.deleteBand = asyncHandler(async (req, res, next) => {
        const band = await Band.findByIdAndDelete(req.params.id);
        if(!band) {
            return next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
        } 
        res.status(200).json({ success: true, data: {} })
});


// @desc    Get bands within a radius
// @route   GET bands/radius/:zipcode/:distance
// @access  Private
exports.getBandsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide distance by radius of Earth
    // Earth Radius = 3963 miles = 6378 kilometers
    //const EarthDistance = 3963;
    const radius = distance / 3963;

    const bands = await Band.find({
        location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] } }
    });

    res.status(200).json({
        success: true,
        count: bands.length,
        data: bands
    });
});