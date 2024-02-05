const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: {
            value: true,
            massage: 'Username already exist!',
        },
        match: [/^[A-Za-z0-9]+$/g, 'Username is not english letters and digits only!'],
        minLength: [5, 'Must be at least 5 character, got {VALUE}'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9]+$/.test(v);
            },
            message: props => `${props.value} is not a valid password!`
        },
        minLength: [8, 'Must be at least 8 character, got {VALUE}'],
    },
});

userSchema.path('username').validate(function (username) {
    const user = mongoose.model('User').findOne({username});

    return !!user;
}, 'Username already exists!');

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new Error('Password mismatch!');
    }
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;