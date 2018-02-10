module.exports = function(Users, async, GroupMessageDependency) {
    return {
        SetRouting: function (router) {
            router.get('/group/:name', this.groupPage);
            router.post('/group/:name', this.groupPostPage);
            router.get('/logout', this.logout);
        },

        groupPage: function (req, res) {
            const name = req.params.name;

            async.parallel([
                function(callback){
                    GroupMessageDependency.find({})
                        .populate('sender')
                        .exec((err, result) => {
                            console.log(result);
                            callback(err, result)
                        });
                }
            ], (err, results) => {
                const result3 = results[0];

                res.render('groupchat/group', {title: 'Invictus | Group', user:req.user, groupName:name, groupMsg: result3});
            });
        },

        logout: function (req, res) {
            req.logout();
            req.session.destroy((err) => {
                res.redirect('/');
            })
        },

        groupPostPage: function(req, res){

            async.parallel([
                function(callback){
                    if(req.body.message){
                        const group = new GroupMessageDependency();
                        group.sender = req.user._id;
                        group.body = req.body.message;
                        group.name = req.body.groupName;
                        group.createdAt = new Date();

                        group.save((err, msg) => {
                            console.log(msg);
                            callback(err, msg);
                        });
                    }
                }
            ], (err, results) => {
                res.redirect('/group/'+req.params.name);
            });
        }
    }
};