const Cooks = require("../data/cookModel.js");
const jwt = require("jsonwebtoken");

module.exports = { validateId, restrict };

function validateId(req, res, next) {

  const { id } = req.params;
  Cooks.findById(id).then(cook => {
    if (cook) {
      req.cook = cook;
      next();
    } else {
      res.status(404).json({ error: "Invalid id" });
    }
  });
}

function restrict(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "Token not valid"
        });
      } else {
        req.cook = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "No authorization token provided"
    });
  }
}
