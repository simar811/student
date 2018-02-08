const mongoose      =   require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    userimage: {
        type: String,
        default: ''
    },
    facebook: {
        type: String,
        default: ''
    },
    fbTokens: Array,
    google: {
        type: String,
        default: ''
    },
    googleTokens: Array
});

userSchema.methods.encryptPass = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.isValidPass = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);