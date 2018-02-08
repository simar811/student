'use strict';

module.exports = function (_, passport) {

    return {
        SetRouting: function (router) {
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.post('/signup', this.postSignUp);
            router.post('/login', this.postLogin);
        },

        indexPage: function (req, res) {
            return res.render('index', {test: "Hello"});
        },

        getSignUp: function (req, res) {
            return res.render('signup');
        },

        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/success',
            failureRedirect: '/failure'
        }),

        postLogin: passport.authenticate('local.login', {
            successRedirect: '/success',
            failureRedirect: '/failure'
        })
    }

};