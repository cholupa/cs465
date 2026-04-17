const passport = require('passport');
const LocalStrat = require('passport-local');
const mongoose = require('mongoose');
const users = require('../models/users');
const User = mongoose.model('users');


passport.use(
    new LocalStrat(
        {
        usernameField: 'email',
    },
    async (username, password, done)=>{
        const q = await User.findOne({email:username}).exec();
        if(!q){
            return done(null, false, {
                message: "Incorrect username."
            });
        }
        if(!q.validPassword(password)){
            return done(null, false, {
                message: "Incorrect password."
            });
        }
        return done(null, q);
    }
)
);