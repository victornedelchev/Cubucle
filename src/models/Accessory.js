const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator(value){
                return /^https?:\/\//.test(value);
            },
            message: (props) => `${props.value} is invalid url for the accessory image!`
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;