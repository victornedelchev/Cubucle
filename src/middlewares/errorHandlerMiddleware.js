const { extractErrorMsg } = require('../utils/errorHandle');

module.exports = (err, req, res, next) => {
    const errorMessages = extractErrorMsg(err);
    res.render('404', { errorMessages });

    next();
};