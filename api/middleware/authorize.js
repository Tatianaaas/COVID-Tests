const jwt = require('jsonwebtoken');

const authorize = (opts) => {
    opts = opts || []

    return (req, res, next) => {
        if (!req.user) {
            next('Not authenticated')
        }

        console.log('authorize only users with roles', opts)
        console.log('user has role ', req.user.role)
        const hasAuthorization = opts.includes(req.user.role)
        console.log('has authorization', hasAuthorization)

        if (hasAuthorization) {
            next()
        } else {
            next('Not Authorized')
        }
    }
}

/*
const authorize = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
};
*/

module.exports = authorize