const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cooks = require("../data/cookModel.js");

console.log("secret", process.env.SESSION_SECRET);

function generateToken(cook) {
  const payload = {
    username: cook.username,
    id: cook.id
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, process.env.SESSION_SECRET, options);
}
router.get("/", (req, res) => {
  res.status(200).json("router");
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  Cooks.insert({
    username,
    password: bcrypt.hashSync(password, 8)
  })
    .then(cook => {
      const token = generateToken(cook);

      res.status(201).json({ message: "Cook registered", cook, token });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error registering user" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Cooks.findByUsername(username)
    .then(cook => {
      if (cook && bcrypt.compareSync(password, cook.password)) {
        const token = generateToken(cook);
        res.status(200).json({
          message: "You have logged in",
          token,
          cook
        });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error logging in user" });
    });
});

module.exports = router;
