

module.exports = function(formidable, Group, aws){
    return {
        SetRouting: function(router){
            router.get('/dashboard', this.adminPage);

            router.post('/uploadFile', aws.Upload.any(), this.uploadFile);
            router.post('/dashboard', this.adminPostPage);
        },

        adminPage: function(req, res){
            res.render('admin/dashboard');
        },

        adminPostPage: function(req, res){
            const newGroup = new Group();
            newGroup.name = req.body.group;
            newGroup.groupType = req.body.gtype;
            newGroup.image = req.body.upload;
            newGroup.save((err) => {
                res.render('admin/dashboard');
            })
        },

        uploadFile: function(req, res) {
            const form = new formidable.IncomingForm();

            form.on('file', (field, file) => {

            });

            form.on('error', (err) => {
            });

            form.on('end', () => {

            });

            form.parse(req);
        }
    }
}









































