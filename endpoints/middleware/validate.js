const jwt = require("jsonwebtoken");
const decode_jwt = require("jwt-decode");
const crypt = require("bcryptjs");
const settings = require("../../config/settings");
const user_model = require("../models/users");
const recipe_model = require("../models/recipes");

//PRIVATE
const generate_token = user => {
  //token settings
  const payload = {
    username: user.username,
    id: user.id,
    roles: user.roles
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
const user = async (req, res, next) => {
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
const token = async (req, res, next) => {
  //grab and check for jwt
  const webtoken = req.headers.authorization;
  webtoken
    ? //check if token is valid
      jwt.verify(webtoken, settings.token_secret, (err, decoded_token) => {
        if (err) {
          //if not, send an error
          res.status(401).json({
            message: `Nice try. This token hasn't been validated by the Citadel of Ricks.`
          });
        } else {
          //otherwise move on
          req.user = decoded_token;
          next();
        }
      })
    : //send error if no token is provided
      res.status(404).json({ message: `What's the password?` });
};

const admin = (req, res, next) => {
  if (!req.user.roles.includes("admin")) {
    res
      .status(403)
      .json({ message: "You do not have permission to view this page." });
  } else next();
};

const recipe = (req, res, next) => {
  // title, ingredients, instructions, tags are required
  // desc, notes, img, are optional
  // The recipe needs EITHER a prep_time or cook_time
  const {
    title,
    ingredients,
    instructions,
    tags,
    description,
    notes,
    prep_time,
    cook_time,
    img
  } = req.body;

  // Check the required props. If they don't exist, put them in the array
  const missing = [];
  if (!title || !title.length) missing.push("title");
  if (!ingredients || !ingredients.length) missing.push("ingredients");
  if (!instructions || !instructions.length) missing.push("instructions");
  if (!tags || !tags.length) missing.push("tags");
  if (!prep_time && !cook_time) missing.push("prep_time and/or cook_time");

  // If the array has stuff, respond saying "Yo, we need the stuff"
  if (missing.length) {
    res.status(400).json({ message: "You are missing these fields:", missing });
  } else {
    // Otherwise, save our good ol recipe and go to the next() thing
    res.locals.recipe = {
      title,
      ingredients,
      instructions,
      tags,
      description: description || null,
      notes: notes,
      prep_time: prep_time || null,
      cook_time: cook_time || null,
      img: img || null
    };
    next();
  }
};

const user_recipe = (req, res, next) => {
  recipe_id = req.params.id;
  user_id = req.user.id;
  if (!recipe_id)
    res.status(400).json({ message: "You need a recipe id for this action!" });
  if (!user_id)
    res.status(400).json({ message: "You need a user id for this action!" });
  return recipe_model.get_one({ id: recipe_id }).then(recipe => {
    // Recipe doesn't exist? Error!
    if (!recipe)
      return res.status(404).json({ message: "No recipe found with this id." });
    // User owns to recipe OR user is the admin? Continue.
    if (recipe.owner.user_id === user_id || req.user.roles.includes("admin")) {
      next();
    } else {
      // Otherwise - 403
      return res
        .status(403)
        .json({ message: "You must be the owner of this recipe. Shoo." });
    }
  });
};

module.exports = {
  user,
  token,
  admin,
  recipe,
  user_recipe
};
