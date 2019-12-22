const express = require('express');
const router = express.Router();

const { 
    getBands,
    getBand,
    createBand,
    updateBand,
    deleteBand
 } = require('../../controllers/bands');

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