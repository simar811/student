module.exports = function() {
    return {
        SetRouting: function (router) {
            router.get('/group/:name', this.groupPage);
        },

        groupPage: function (req, res) {
            const name = req.params.name;
            res.render('groupChat/group', {title: 'Invictus | Group', name: name, user: req.user, groupName: name});
        }
    }
};