
module.exports = function(async, Group, _, Test){
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage);
            router.get('/logout', this.logout);
            router.get('/members', this.getMembers);
            router.get('/createTest', this.createTest);
            router.post('/test', this.postTest);
            router.get('/test/:id', this.getTest);
        },

        homePage: function(req, res){
            async.parallel([
                function(callback){
                    Group.find({}, (err, result) => {
                        callback(err, result);
                    })
                }
            ], (err, results) => {
                const res1 = results[0];

                const dataChunk  = [];
                const chunkSize = 3;
                for (let i = 0; i < res1.length; i += chunkSize){
                    dataChunk.push(res1.slice(i, i+chunkSize));
                }


                res.render('home', {title: 'Invictus - Home', user: req.user, chunks: dataChunk})
            })
        },

        logout: function (req, res) {
            req.logout();
            req.session.destroy((err) => {
                res.redirect('/');
            })
        },

        getMembers: function (req, res) {
            res.send('<h1>Coming Soon !</h1>');
        },

        createTest: function (req, res) {
            res.render('test/createTest', {user: req.user});
        },

        postTest: function (req, res) {
            const test = new Test();
            test.name = req.body.name;
            test.subject = req.body.subject;
            test.createdBy = req.body.createdBy;
            test.createdBy = req.body.createdBy;
            test.content = req.body.content;

            console.log("Test ");
            console.log(test);

            test.save((err, ntest)=>{
                if(err){
                    console.log(err);
                }
                else {
                    return res.send('/test/' + test._id + '/');
                }
            })
        },

        getTest: function(req, res){
            Test.findById(req.params.id)
                .then((test)=>{
                    res.render('test/giveTest', {test: test, user: req.user});
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    }
}

























