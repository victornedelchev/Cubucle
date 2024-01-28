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
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;