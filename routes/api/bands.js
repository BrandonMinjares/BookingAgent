const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Works');
});

router.get('/:id', (req, res) => {
    res.send(`The band is ${req.params.id}`);
});
/*const { 
    getBands,
    getBand,
    createBand,
    updateBand,
    deleteBand
 } = require('../controllers/bands');

router
    .route('/')
    .get(getBands)
    .post(createBand);

router
    .route('/:id')
    .get(getBand)
    .put(updateBand)
    .delete(deleteBand);
*/
module.exports = router;