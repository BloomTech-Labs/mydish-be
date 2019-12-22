const router = require('express').Router()
const model = require('../models/users')
const tbl = 'users'

//add a user
router.post(`/${tbl}/register`, (req, res) => {
    res.status(200).json('register user')
})

//get one user
router.get(`/${tbl}/:id`, (req, res) => {
    res.status(200).json(`get user ${req.params.id}`)
})

//get all users
router.get(`/${tbl}`, (req, res) => {
    res.status(200).json('get all users')
})

//update a user
router.put(`/${tbl}/:id`, (req, res) => {
    res.status(200).json(`update user ${req.params.id}`)
})

//terminate a user
router.delete(`/${tbl}/:id`, (req, res) => {
    res.status(200).json(`terminate user ${req.params.id}`)
})

module.exports = router