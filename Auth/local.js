'use strict';

const passport      =   require('passport');
const LocalStrategy =   require('passport-local').Strategy;
const User          =   require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((id, done) => {
    User.findOne({
        email: id
    })
        .then((user) => {
            return done(null, user);
        })
        .catch((err) => {
            return done(err);
        })
});


passport.use('local.signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({
            'email': email
        })
            .then((user) => {
                console.log("User is");
                console.log(user);
                if(user) {
                    return done(null, false, {message: "User already exists"});
                }
                var newUser = new User();
                newUser.email = req.body.email;
                newUser.name = req.body.name;
                newUser.password = newUser.encryptPass(req.body.password);

                newUser.save()
                    .then((nuser) => {
                        return done(null, nuser);
                    })
            })
            .catch((err) => {
                console.log(err);
                done(err);
            })
    }
));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField:'password',
    //All users data is passed in callback
    passReqToCallback:true
}, (req, email, password, done) => {
    User.findOne({
        'email': email
    })
        .then((user) => {
            if(!user || !user.isValidPass(password)) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch((err) => {
            return done(err);
        })
}));
