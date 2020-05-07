const jwt = require('jsonwebtoken');


const authorize = (opts) => {

    opts = opts || []

    return (req, res, next) => {
        if (!req.user) {
            next('Not authenticated')
        }
        const hasAuthorization = opts.includes(req.user.role)

        if (hasAuthorization) {
            next()
        } else {
            next('Not authorized')
        }
    }
}


module.exports = authorize

/*
const authorize = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'segredo_para_a_criacao_dos_tokens');

        req.userData = { username: decodedToken.username, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: "Auth failed!!!" });
    }
};

module.exports = authorize
*/