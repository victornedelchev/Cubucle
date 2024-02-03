const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;