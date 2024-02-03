const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    difficultyLevel: {
        type: Number
    },
    accessories: [{
        type: mongoose.Types.ObjectId, // from MongoDB
        ref: "Accessory" // The name of the model
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;