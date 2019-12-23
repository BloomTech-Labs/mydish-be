const router = require('express').Router()
const model = require('../models/ingredients_list')
const tbl = 'ingredients_list'

//add a list
router.post(`/${tbl}`, async (req, res) => {
    const {recipe_id, ingredient_id, unit_id} = req.body
    try {
        const new_list = await model.add_one({recipe_id, ingredient_id, unit_id})
        res.status(200).json(new_list)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//get one list
router.get(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    try {
        const list = await model.get_one({id})
        list
            ? res.status(200).json(list)
            : res.status(404).json('No list found.')
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//get all lists
router.get(`/${tbl}`, async (req, res) => {
    try {
        const lists = await model.get_all()
        lists.length > 0
            ? res.status(200).json(lists)
            : res.status(404).json('No lists found.')
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//update a list
router.put(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    const updates = req.body
    try {
        const list = await model.update_one(id, updates)
        list
            ? res.status(200).json(list)
            : res.status(404).json(`Couldn't update list`)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//terminate a list
router.delete(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    try {
        const list = await model.remove_one(id)
        list
            ? res.status(200).json(`${list.id} has been terminated.`)
            : res.status(404).json(`Couldn't find list ${id}.`)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//terminate all lists
router.delete(`/${tbl}`, async (req, res) => {
    try {
        await model.remove_all()
        res.status(200).json('All lists have been eliminated.')
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

module.exports = router