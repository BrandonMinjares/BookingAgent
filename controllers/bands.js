  
// @desc    Get all bands
// @route   GET /api/v1/bands
// @access  Public
exports.getBands = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: `Show all bands`});
}

// @desc    Get single band
// @route   GET /api/v1/bands/:id
// @access  Public
exports.getBand = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: `Show band ${req.params.id}`});
}

// @desc    Create new band
// @route   POST /api/v1/bands/
// @access  Private
exports.createBand = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: 'Create new band'});
}

// @desc    Update band
// @route   PUT /api/v1/bands/:id
// @access  Private
exports.updateBand = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: `Update band ${req.params.id}`});
}

// @desc    Delete band
// @route   PUT /api/v1/bands/:id
// @access  Private
exports.deleteBand = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: `Delete band ${req.params.id}`});
}