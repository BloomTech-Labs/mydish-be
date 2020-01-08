const token = require('jsonwebtoken')
const decode_token = require('jwt-decode')
const crypt = require('bcryptjs')
const settings = require('../../config/settings')
const user_model = require('../models/users')

//PRIVATE
generate_token = (user) => {
    const payload = {
        username: user.username,
        id: user.id
    }
    const options = {
        expiresIn: settings.token_expiration_time
    }
    const jwt = token.sign(payload, settings.token_secret, options)
    const expiration_date = (new Date(decode_token(jwt).exp*1000)).toISOString()
    return {
        token: jwt,
        expiration_date: expiration_date
    }
}

//PUBLIC
//create token for user upon login
user = async (req, res, next) => {
    const {username, password} = req.body
    const user = await user_model.get_one({username})
    if(user && crypt.compareSync(password, user.password)) {
        delete user.password
        req.user = user
        req.token = generate_token(user)
    }
    else
        req.denied = true
    next()
}
//check if user has token and it's legit
// token = async (req, res, next) => {

// }

module.exports = {
    user,
    // token
}