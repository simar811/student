module.exports = function(Users, async, GroupMessageDependency) {
    return {
        SetRouting: function (router) {
            router.get('/group/:name/:channel', this.groupPage);
            router.post('/group/:name', this.groupPostPage);
            router.get('/logout', this.logout);
        },

        groupPage: function (req, res) {
            const name = req.params.name;
            const channel = Number(req.params.channel);

            async.parallel([
                function(callback){
                    GroupMessageDependency.find({index: channel})
                        .populate('sender')
                        .exec((err, result) => {
                            console.log(result);
                            callback(err, result)
                        });
                }
            ], (err, results) => {
                const result3 = results[0];

                res.render('groupchat/group', {title: 'Invictus | Group', user:req.user, groupName:name, groupMsg: result3, channel: channel});
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
                        group.index = req.body.channelForm;
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