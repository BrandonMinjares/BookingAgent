const express = require('express');
const { register, login } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

// @route   GET /auth
// @desc    Auth route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// the "auth" protects the route -- you have no access to it unless you have a token




// @route   POST /auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email })

            if(!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid credentials" }] });
            }


            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [ { msg: "Invalid credentials" }] });
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );
        } catch(err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;