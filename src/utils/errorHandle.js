exports.extractErrorMsg = (error) => {
    const instanceOfMongoose = error instanceof MongooseError;
    return [error.message];
};