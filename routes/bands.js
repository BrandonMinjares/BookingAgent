const express = require('express');
const router = express.Router();
const { authorize }  = require('../middleware/auth');

 const { 
    getBands,
    getBand,
    getUserBands,
    createBand,
    updateBand,
    deleteBand,
    getBandsInRadius,
    bandPhotoUpload
 } = require('../controllers/bands');

const Band = require('../models/Bands');

 router.route('/radius/:zipcode/:distance').get(getBandsInRadius);

 // Connects specific methods in Bands controller with a specific HTTP Request 
router
    .route('/')
    .get(getBands)
    .post(authorize('user', 'paidUser', 'admin'), createBand);

router
    .route('/:id')
    .get(getBand)
    .put(updateBand)
    .delete(authorize('user', 'paidUser', 'admin'), deleteBand);

/*
router
    .route('/userbands')
    .get(getUserBands);
*/

router
    .route('/:id/photo')
    .put(bandPhotoUpload);

module.exports = router;