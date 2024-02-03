const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// TODO: if the user already exist throw error
userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new mongoose.MongooseError('Password missmatch!');
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;