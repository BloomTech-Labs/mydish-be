const jwt = require('jsonwebtoken')
const decode_jwt = require('jwt-decode')
const crypt = require('bcryptjs')
const settings = require('../../config/settings')
const user_model = require('../models/users')

//PRIVATE
generate_token = (user) => {
    //token settings
    const payload = {
        username: user.username,
        id: user.id
    }
    const options = {
        expiresIn: settings.token_expiration_time
    }
    //create user token
    const token = jwt.sign(payload, settings.token_secret, options)
    //extract expiration date from token
    const expiration_date = (new Date(decode_jwt(token).exp*1000)).toISOString()
    //return token and expiration date as object
    return {token, expiration_date}
}

//PUBLIC
//create token for user upon login
user = async (req, res, next) => {
    const {username, password} = req.body
    const user = await user_model.get_one({username})
    if(user && crypt.compareSync(password, user.password)) {
        //remove password from response
        delete user.password
        //store user and token in the request
        req.user = user
        req.token = generate_token(user)
    }
    next()
}
//check if user has token and it's legit
// token = async (req, res, next) => {

// }

module.exports = {
    user,
    // token
}