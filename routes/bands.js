const express = require('express');
const router = express.Router();
 const { protect, authorize }  = require('../middleware/auth');

const { 
    getBands,
    getBand,
    createBand,
    updateBand,
    deleteBand,
    getBandsInRadius
 } = require('../controllers/bands');

 router.route('/radius/:zipcode/:distance').get(getBandsInRadius);

 // Connects specific methods in Bands controller with a specific HTTP Request 
router
    .route('/')
    .get(getBands)
    .post(protect, authorize('user', 'paidUser', 'admin'), createBand);

router
    .route('/:id')
    .get(getBand)
    .put(protect, authorize('user', 'paidUser', 'admin'), updateBand)
    .delete(protect, authorize('user', 'paidUser', 'admin'), deleteBand);

module.exports = router;