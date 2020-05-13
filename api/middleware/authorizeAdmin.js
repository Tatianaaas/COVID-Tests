const session = require("./session")

const authorize = (opts) => {
    opts = opts || []

    return (req, res, next) => {
        if (!session) {
            next('Not authenticated')
        }

        const hasAuthorization = opts.includes('ADMIN')

        if (hasAuthorization) {
            next()
        } else {
            next('Not authorized')
        }
    }
}

module.exports = authorize