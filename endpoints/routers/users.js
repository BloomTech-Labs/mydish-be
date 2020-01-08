const router = require('express').Router()
const model = require('../models/users')
const tbl = 'users'
const m = { //middleware
    encrypt: require('../middleware/encrypt'),
    validate: require('../middleware/validate')
}

//add a user
router.post(`/${tbl}/register`, m.encrypt.password, async (req, res) => {
    const {username, password} = req.body
    try {
        const new_user = await model.add_one({username, password})
        res.status(200).json(new_user)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//login a user
router.post(`/${tbl}/login`, m.validate.user, async (req, res) => {
    try {
        if(req.user) {
            const user = req.user
            const token = req.token
            res.status(200).json({
                message: `Great job remembering your password.`,
                user: user,
                token: token
            })
        } else
            res.status(404).json({
                message: `Wrong password, dumbass.`
            })
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//get one user
router.get(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    try {
        const user = await model.get_one({id})
        user
            ? res.status(200).json(user)
            : res.status(404).json('No user found.')
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//get all users
router.get(`/${tbl}`, async (req, res) => {
    try {
        const users = await model.get_all()
        users.length > 0
            ? res.status(200).json(users)
            : res.status(404).json('No users found.')
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//update a user
router.put(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    const updates = req.body
    try {
        const user = await model.update_one(id, updates)
        user
            ? res.status(200).json(user)
            : res.status(404).json(`Couldn't update user`)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//terminate a user
router.delete(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    try {
        const user = await model.remove_one(id)
        user
            ? res.status(200).json(`${user.username} has been terminated.`)
            : res.status(404).json(`Couldn't find user ${id}.`)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//terminate all users
router.delete(`/${tbl}`, async (req, res) => {
    try {
        await model.remove_all()
        res.status(200).json('All users have been eliminated.')
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

module.exports = router