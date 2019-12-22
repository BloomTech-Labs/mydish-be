const router = require('express').Router()
const model = require('../models/users')
const tbl = 'user'

router.post(`${tbl}/register`, (req, res) => {
    res.status(200).json('register user')
})

router.get(`/users`, (req, res) => {
    console.log('made it here')
    res.status(200).json('get users')
})

router.get('users', (req, res) => {
    const { id } = req.params;
    model.get_one({id})
      .then(cooks => {
        res.status(200).json(cooks);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error retriving cook' });
      });
  });

module.exports = router