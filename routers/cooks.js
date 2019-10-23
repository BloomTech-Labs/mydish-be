const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cooks = require("../data/cookModel.js");

function generateToken(cook) {
  console.log("cook in generateToken", cook);
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
  const x = Cooks.all().then(x => res.status(200).json(x));
});

router.get("/cookID/:id", (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  Cooks.findById(id)
    .then(cooks => {
      console.log("cooks", cooks);
      res.status(200).json(cooks);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retriving cook" });
    });
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  Cooks.insert({
    username,
    password: bcrypt.hashSync(password, 8)
  })
    .then(cook => {
      console.log("cook", cook);

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

        res.status(200).json({
          message: "You have logged in",
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

module.exports = router;
