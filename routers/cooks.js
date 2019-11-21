const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cooks = require('../data/cookModel.js');
const mid = require('../middleware/cookMiddleware.js');

//issue token 
function generateToken(cook) {
  const payload = {
    username: cook.username,
    id: cook.id
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, process.env.SESSION_SECRET, options);
}

//route for registration - token is also generated
router.post('/register', (req, res) => {
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
        .json({ message: 'registration successful', cook_id, token });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error registering user' });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Cooks.findByUsername(username)
    .then(cook => {

      if (cook && bcrypt.compareSync(password, cook.password)) {
        const token = generateToken(cook);
        const cook_id = cook.id;

        res.status(200).json({
          message: 'You have logged in',
          cook_id,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error logging in user' });
    });
});

//see what is in the users table 
//user id is obtained through middleware 
router.get('/', mid.restrict, (req, res) => {
  Cooks.all().then(cooks => {
    res.status(200).json(cooks);
  });
});

//delete user
router.delete('/self', mid.restrict, (req, res) => {
  const { id } = req.cook;
  Cooks.remove(id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error deleting cook' });
    });
});

//edit user 
router.put('/self', mid.restrict, (req, res) => {
  const { id } = req.cook;
  const { username, password } = req.body;

  Cooks.update(id, {
    username,
    password: bcrypt.hashSync(password, 8)
  })
    .then(() => {
      Cooks.findById(id)
        .then(cook => {
          const { id, username } = cook;
          res.status(200).json({ message: `${username} has been updated `, id });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: 'Error finding cook' });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'Error updating'
      });
    });
});

router.get('/:id', mid.validateId, (req, res) => {
  const { id } = req.params;
  Cooks.findById(id)
    .then(cooks => {
      res.status(200).json(cooks);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retriving cook' });
    });
});

module.exports = router;
