const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const Bands = require('../models/Bands');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');


// @desc    Get all bands
// @route   GET /bands
// @access  Public
exports.getBands = asyncHandler(async (req, res, next) => {
    let query
    let queryStr = req.query;

    query = Bands.find(queryStr);
    const bands = await query;

    // If no req query then all bands get render because none are being filtered
    return res.render('bands', {bands});

    /* We need to be able to process form info in bands view and add it to 
    req query */



    // Below is for JSON
   // return res.status(200).json({ success: true, count: bands.length, data: bands });
});

// @desc    Get single band
// @route   GET bands/:id
// @access  Public
exports.getBand = asyncHandler(async (req, res, next) => {
        
    const bands = await Bands.findById(req.params.id);

    //const band = await Band.findById(req.user.id);
        // If the ID is in the correct format but the band does not exist you get custom error message
        if(!bands) {
            return next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
        } 
    return res.render('show', {bands});
    //return res.status(200).json({ success: true, data: test});
});

// @desc    Create new band
// @route   POST bands/
// @access  Private
exports.createBand = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id;
    // Checks if a band has already been created
    const publishedBand = await Bands.findOne({ user: req.user.id });

    /*
    if(publishedBand && req.user.role !== 'admin') {
        return next(new ErrorResponse(`The user with ID ${req.user.id} has already published a band`, 400));
    }*/
    const band = await Bands.create(req.body);
    console.log(band);
    res.status(201).json({
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
    if(band.user.toString() !== req.user.id && req.user.role != 'admin') {
        return next(
            new ErrorResponse(`User ${req.user.id} is not allowed to access this route`, 401)
        );
    }

    band = await Bands.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });


    return res.status(200).json({ success: true, data: band })
});

// @desc    Delete band
// @route   PUT bands/:id
// @access  Private
exports.deleteBand = asyncHandler(async (req, res, next) => {
        const band = await Bands.findByIdAndDelete(req.params.id);
        if(!band) {
            return next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
        } 

        band.remove();
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

    const bands = await Bands.find({
        location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] } }
    });

    res.status(200).json({
        success: true,
        count: bands.length,
        data: bands
    });
});


// @desc    Upload photo
// @route   PUT bands/:id/photo
// @access  Private
exports.bandPhotoUpload = asyncHandler(async (req, res, next) => {
    const band = await Bands.findById(req.params.id);
    if(!band) {
        return next(new ErrorResponse(`Band not found with id of ${req.params.id}`, 404));
    } 

    if(!req.files) {
        return next(new ErrorResponse('Please upload a file', 400));

    }

    const file = req.files.file;

    // Make sure the image is a photo
    if(!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse('Please upload an image file', 400));
    }

    // Check filesize
    if(file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image size less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom file name
    file.name = `photo_${band._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Bands.findByIdAndUpdate(req.params.id, { photo: file.name });
    });

    res.status(200).json({ success: true, data: file.name })
});