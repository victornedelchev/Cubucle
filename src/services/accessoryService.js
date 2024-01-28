const Accessory = require('../models/Accessory');

exports.create = async (accessoryData) => {
    await Accessory.create(accessoryData);

    return Accessory;
};

exports.getAll = () => Accessory.find();

exports.getWithoutOwned = (accessoryId) => {
    // $nin => NOT IN
    return Accessory.find({_id: {$nin: accessoryId } });
};