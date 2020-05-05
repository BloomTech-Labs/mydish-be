const router = require("express").Router();
const model = require("../models/users");
const m = {
  //middleware
  encrypt: require("../middleware/encrypt"),
  validate: require("../middleware/validate"),
};

//add a user
router.post(`/users/register`, async (req, res) => {
  if (!req.body || !req.body.username.length || !req.body.password.length) {
    return res
      .status(400)
      .json({message: "Please provide a username and password."});
  }
  const new_user = {
    username: req.body.username,
    password: m.encrypt.password(req.body.password),
  };
  try {
    const user = await model.add_one(new_user);
    const token = m.validate.generate_token(user);
    res.status(200).json({
      message: `Welcome, new user.`,
      user: {id: user.id, username: user.username},
      token,
    });
  } catch (err) {
    if (
      typeof err.detail === "string" &&
      err.detail.match(/(\(username\)).*(already exists)/i)
    ) {
      return res.status(400).json({message: "That username already exists."});
    }
    console.log("err", err);
    res.status(500).json(err.detail);
  }
});

//login a user
router.post(`/users/login`, m.validate.user, async (req, res) => {
  try {
    if (req.user) {
      const user = req.user;
      const token = req.token;
      res.status(200).json({
        message: `Great job remembering your password.`,
        user: {id: user.id, username: user.username},
        token,
      });
    } else
      res.status(400).json({
        message: `Incorrect password or username.`,
      });
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//get one user
router.get(
  `/users/:id`,
  m.validate.token,
  /*m.validate.admin,*/
  async (req, res) => {
    const {id} = req.params;
    try {
      const user = await model.get_by_id(id);
      user
        ? res.status(200).json(user)
        : res.status(404).json("No user found.");
    } catch (err) {
      console.log(err);
      res.status(500).json(err.detail);
    }
  },
);

//get all users
router.get(
  `/users`,
  m.validate.token,
  /*m.validate.admin,*/ async (req, res) => {
    console.log(req.user);

    try {
      const users = await model.get_all();
      users.length > 0
        ? res.status(200).json(users)
        : res.status(404).json("No users found.");
    } catch (err) {
      res.status(500).json(err.detail);
    }
  },
);

//update a user
router.put(
  `/users/:id`,
  m.validate.token,
  /*m.validate.admin,*/
  async (req, res) => {
    const {id} = req.params;
    const updates = req.body;
    try {
      const user = await model.update_one(id, updates);
      user
        ? res.status(200).json(user)
        : res.status(404).json(`Couldn't update user`);
    } catch (err) {
      res.status(500).json(err.detail);
    }
  },
);

//terminate a user
router.delete(
  `/users/:id`,
  m.validate.token,
  m.validate.admin,
  async (req, res) => {
    const {id} = req.params;
    try {
      const user = await model.remove_one(id);
      user
        ? res.status(200).json(`${user.username} has been terminated.`)
        : res.status(404).json(`Couldn't find user ${id}.`);
    } catch (err) {
      res.status(500).json(err.detail);
    }
  },
);

//terminate all users
router.delete(
  `/users`,
  m.validate.token,
  m.validate.admin,
  async (req, res) => {
    try {
      await model.remove_all();
      res.status(200).json("All users have been eliminated.");
    } catch (err) {
      res.status(500).json(err.detail);
    }
  },
);

module.exports = router;
