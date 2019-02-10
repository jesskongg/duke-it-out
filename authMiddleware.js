const jwt = require('jsonwebtoken');
const secret = require('./config').secret;

const checkAuth = function(req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.user = {}
                req.user.email = decoded.email;
                next();
            }
        });
    }
};
module.exports = checkAuth;