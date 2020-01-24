const LocalStrategy = require('passports-local').Strategy;
const mongoose = require('mongoose');

const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {

        })
    )
}