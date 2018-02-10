
module.exports = function(async, Group, _){
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage);
            router.get('/logout', this.logout);
        },

        homePage: function(req, res){
            async.parallel([
                function(callback){
                    Group.find({}, (err, result) => {
                        callback(err, result);
                    })
                }
            ], (err, results) => {
                console.log("Result");
                console.log(results);
                const res1 = results[0];
                console.log("User" + req.user);

                const dataChunk  = [];
                const chunkSize = 3;
                for (let i = 0; i < res1.length; i += chunkSize){
                    dataChunk.push(res1.slice(i, i+chunkSize));
                }

                console.log("Datachunks");
                console.log(dataChunk);

                res.render('home', {title: 'Invictus - Home', user: req.user, chunks: dataChunk})
            })
        },

        logout: function (req, res) {
            req.logout();
            req.session.destroy((err) => {
                res.redirect('/');
            })
        }
    }
}

























