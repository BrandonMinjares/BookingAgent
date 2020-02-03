const express = require('express');

const { 
    register, 
    login, 
    logout,
    getMe,
    forgotPassword,
} = require('../controllers/auth');

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

router.get('/profile/:id', getMe);
router.post('/forgotpassword', forgotPassword);

module.exports = router;