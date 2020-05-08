const jwt = require('jsonwebtoken');


const authorize = (opts) => {

    opts = opts || []

    return (req, res, next) => {
        if (!req.user) {
            next('Not authenticated')
        }
        const hasAuthorization = opts.includes(req.user.role)
        console.log(hasAuthorization)
        if (hasAuthorization) {
            next()
        } else {
            next('Not authorized')
        }
    }
}

module.exports = authorize