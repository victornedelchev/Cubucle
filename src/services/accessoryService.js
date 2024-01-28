const Accessory = require('../models/Accessory');

exports.create = async (accessoryData) => {
    await Accessory.create(accessoryData);

    return Accessory;
};

exports.getAll = () => Accessory.find();