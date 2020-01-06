const crypt = require('bcryptjs')
const password_strength = require('../../config/settings').password_strength

password = async (req, res, next) => {
    req.body.password = crypt.hashSync(req.body.password, password_strength)
    next()
}

module.exports = {
    password
}