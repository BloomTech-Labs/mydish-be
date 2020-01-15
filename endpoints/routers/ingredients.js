const router = require('express').Router()
const model = require('../models/ingredients')
const tbl = 'ingredients'

//add a ingredient
router.post(`/${tbl}`, async (req, res) => {
    const {name, description} = req.body
    try {
        const new_ingredient = await model.add_one({name, description})
        res.status(200).json(new_ingredient)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//get one ingredient
router.get(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    try {
        const ingredient = await model.get_one({id})
        ingredient
            ? res.status(200).json(ingredient)
            : res.status(404).json('No ingredient found.')
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//get all ingredients
router.get(`/${tbl}`, async (req, res) => {
    try {
        const ingredients = await model.get_all()
        ingredients.length > 0
            ? res.status(200).json(ingredients)
            : res.status(404).json('No ingredients found.')
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//update a ingredient
router.put(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    const updates = req.body
    try {
        const ingredient = await model.update_one(id, updates)
        ingredient
            ? res.status(200).json(ingredient)
            : res.status(404).json(`Couldn't update ingredient`)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//terminate a ingredient
router.delete(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    try {
        const ingredient = await model.remove_one(id)
        ingredient
            ? res.status(200).json(`${ingredient.name} has been terminated.`)
            : res.status(404).json(`Couldn't find ingredient ${id}.`)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//terminate all ingredients
router.delete(`/${tbl}`, async (req, res) => {
    try {
        await model.remove_all()
        res.status(200).json('All ingredients have been eliminated.')
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

module.exports = router