const jsonWebToken = require('jsonwebtoken');
const { promisify } = require('util');

jwt = {
    sign: promisify(jsonWebToken.sign),
    verify: promisify(jsonWebToken.verify),
};

module.exports = jwt;