const jwt = require("jsonwebtoken");
const decode_jwt = require("jwt-decode");
const crypt = require("bcryptjs");
const settings = require("../../config/settings");
const user_model = require("../models/users");

//PRIVATE
generate_token = user => {
  //token settings
  const payload = {
    username: user.username,
    id: user.id,
    role: user.roles
  };
  const options = {
    expiresIn: settings.token_expiration_time
  };
  //create user token
  const token = jwt.sign(payload, settings.token_secret, options);
  //extract expiration date from token
  const expiration_date = new Date(decode_jwt(token).exp * 1000).toISOString();
  //return token and expiration date as object
  return { token, expiration_date };
};

//PUBLIC
//create token for user upon login
user = async (req, res, next) => {
  const { username, password } = req.body;
  //get user from database
  const user = await user_model.get_one({ username });
  if (user && crypt.compareSync(password, user.password)) {
    //remove password from response
    delete user.password;
    //store user and token in the request
    req.user = user;
    req.token = generate_token(user);
  }
  next();
};

// check if user has token and it's legit
token = async (req, res, next) => {
  //grab and check for jwt
  const webtoken = req.headers.authorization;
  webtoken
    ? //check if token is valid
      jwt.verify(webtoken, settings.token_secret, (err, decoded_token) => {
        err
          ? //if not, send an error
            res.status(401).json({
              message: `Nice try. This token hasn't been validated by the Citadel of Ricks.`
            })
          : //otherwise move on
            console.log(decoded_token);
        next();
      })
    : //send error if no token is provided
      res.status(404).json({ message: `What's the password?` });
};

module.exports = {
  user,
  token
};
