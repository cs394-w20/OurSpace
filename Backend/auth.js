const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send({error: 'Unverified'});
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
}

module.exports = auth;