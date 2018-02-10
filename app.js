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
const flash     =   require('connect-flash');
const passport  =   require('passport');
const container =   require('./container');
const socketIO  =   require('socket.io');
const {Users}   =   require('./helpers/usersClass');

container.resolve(function(users, _ , admin, home, groupController) {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/student', (err)=>{
        if(err){
            console.log("Error" + err);
        }
        else {
            console.log("Database Ready ");
        }
    });

    const app   =   SetupExpress();
    
    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);

        const io = socketIO(server);
        server.listen(3000, () => {
            console.log("Server running at 3000");
        });

        configureExpress(app);

        require('./socket/groupChat')(io, Users);

        const router = require('express-promise-router')();
        users.SetRouting(router);
        admin.SetRouting(router);
        home.SetRouting(router);
        groupController.SetRouting(router);

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
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        app.locals._ = _;
    }
});