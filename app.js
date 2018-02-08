const express   =   require('express');
const bp        =   require('body-parser');
const http      =   require('http');
const ejs       =   require('ejs');
const path      =   require('path');
const cp        =   require('cookie-parser');
const validator =   require('express-validator');
const session   =   require('express-session');
const MongoStore=   require('connect-mongo')(session);
const mongoose  =   require('mongoose');
const passport  =   require('passport');
const container =   require('./container');

container.resolve(function(users) {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/student', {
        useMongoClient: true
    });

    const app   =   SetupExpress();
    
    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);

        server.listen(3000, () => {
            console.log("Server running at 3000");
        });

        configureExpress(app);

        const router = require('express-promise-router')();
        users.SetRouting(router);

        app.use(router);
    }

    function configureExpress(app) {

        require('./Auth/local');

        app.use(express.static(path.join(__dirname, 'public_static')));
        app.set('view engine', 'ejs');
        app.use(bp.json());
        app.use(bp.urlencoded({extended: true}));
        app.use(cp());
        app.use(validator());
        app.use(session({
            secret: 'This is Secret',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({mongooseCollection: mongoose.collection})
        }));
        app.use(passport.initialize());
        app.use(passport.session());
    }
});