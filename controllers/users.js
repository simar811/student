'use strict';

module.exports = function (_, passport, User) {

    return {
        SetRouting: function (router) {
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);

            router.post('/signup', User.SignUpValidation,  this.postSignUp);
            router.post('/', User.LoginValidation,  this.postLogin);
        },

        indexPage: function(req, res){
            const errors = req.flash('error');
            let hasError = false;
            if(errors) {
                hasError = errors.length > 0;
            }
            return res.render('index', {title: 'Invictus | Login', messages: errors, hasErrors: hasError});
        },

        getSignUp: function (req, res) {
            const errors = req.flash('error');
            let hasError = false;
            if(errors) {
                hasError = errors.length > 0;
            }
            return res.render('signup', {title: 'Invictus | SignUp', messages: errors, hasErrors: hasError});
        },

        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),

        postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),

        homePage: function (req, res) {
            const errors = req.flash('error');
            let hasError = false;
            if(errors) {
                hasError = errors.length > 0;
            }
            return res.render('home', {title: 'Invictus | Home', messages: errors, hasErrors: hasError});
        }
    }

};