const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cooks = require("../data/cookModel.js");
const mid = require("../middleware/cookMiddleware.js");

function generateToken(cook) {
  // console.log("cook in generateToken", cook);
  const payload = {
    username: cook.username,
    id: cook.id
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, process.env.SESSION_SECRET, options);
}

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  Cooks.insert({
    username,
    password: bcrypt.hashSync(password, 8)
  })
    .then(cook => {
      const token = generateToken(cook);
      const cook_id = cook.id;

      res
        .status(201)
        .json({ message: "registration successful", cook_id, token });
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
        const cook_id = cook.id;

        res.status(200).json({
          message: "You have logged in",
          cook_id,
          token
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

router.get("/", mid.restrict, (req, res) => {
  // const cook = req.cook;
  // console.log("decodedToken cook", cook);
  Cooks.all().then(cooks => res.status(200).json(cooks));
});

router.get("/cookID/:id", mid.validateId, (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  Cooks.findById(id)
    .then(cooks => {
      //console.log("cooks", cooks);
      res.status(200).json(cooks);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retriving cook" });
    });
});

module.exports = router;
