const Cooks = require('../data/cookModel.js');
const jwt = require('jsonwebtoken');
const recipes = require('../data/recipeModel');

module.exports = { validateId, restrict, validateToken, validateRecipe };

function validateId(req, res, next) {

  const { id } = req.params;
  Cooks.findById(id).then(cook => {
    if (cook) {
      req.cook = cook;
      next();
    } else {
      res.status(404).json({ error: 'Invalid id' });
    }
  });
}

function restrict(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: 'Token not valid'
        });
      } else {
        req.cook = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: 'No authorization token provided'
    });
  }
}

function validateToken(req, res, next) {
 const token = req.headers.authorization;

 if(token) {
   jwt.verify(token, process.env.SESSION_SECRET, (err, decodedToken) => {
     if(err) {
       next();
     }
     else {
       req.cook = decodedToken;
       next();
     }
   })
 } else {
   next();
 }
}

function validateRecipe(req, res, next) {
  if(!req.body.title.length) {
    res.status(400).json({error: 'Please enter a title for your recipe.' })
  } else if(Array.isArray(req.body.steps) === false) {
    res.status(400).json({error: 'Steps must be an array of objects!'})
  } else if(!req.body.steps.length) {
    res.status(400).json({error: 'Please enter steps for your recipe.'})
  } else if(req.body.steps.find(val => val.body == null || val.body == '')) {
      res.status(400).json({error: 'Please fill out the body field of your step(s).'})
    } else if(!req.body.ingredients.length) {
    res.status(400).json({error: 'Please add ingredients to your recipe.'})
  } else if(Array.isArray(req.body.ingredients) === false) {
    res.status(400).json({error: 'Ingredients must be an array of objects!'}) 
  } else if(req.body.ingredients.find(val => val.name == '' || val.quantity == '')) {
      res.status(400).json({error: 'Please make sure your ingredient(s) have a name and quantity!'})
  } else {
    next();
  }
}