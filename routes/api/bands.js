const express = require('express');
const router = express.Router();

const { 
    getBands,
    getBand,
    createBand,
    updateBand,
    deleteBand
 } = require('../../controllers/bands');

 // Connects specific methods in Bands controller with a specific HTTP Request 
router
    .route('/')
    .get(getBands)
    .post(createBand);

router
    .route('/:id')
    .get(getBand)
    .put(updateBand)
    .delete(deleteBand);

module.exports = router;