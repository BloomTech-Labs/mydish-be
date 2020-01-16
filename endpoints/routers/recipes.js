const router = require('express').Router()
const model = require('../models/recipes')
const tbl = 'recipes'
const validate = require("../middleware/validate")

//add a recipe
router.post(`/${tbl}`, validate.token, validate.recipe, async (req, res) => {
    try {
        const new_recipe = await model.add_one({...res.locals.recipe, owner_id: req.user.id})
        res.status(200).json(new_recipe)
    } catch(err) {
        if (err && err.userError) res.status(400).json(err)
        res.status(500).json(err)
    }
})

//get one recipe
router.get(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    try {
        const recipe = await model.get_one({id})
        recipe
            ? res.status(200).json(recipe)
            : res.status(404).json('No recipe found.')
    } catch(err) {
        console.log('err', err)
        res.status(500).json(err.detail)
    }
})

//get all recipes
router.get(`/${tbl}`, async (req, res) => {
    try {
        // If there is a search, use it. If no search, use an empty string
        const recipes = await model.get_all(req.query.title || '')

        recipes.length > 0
            ? res.status(200).json(recipes)
            : res.status(404).json('No recipes found.')
    } catch(err) {
        console.log(err)
        res.status(500).json(err.detail)
    }
})

//update a recipe
router.put(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    const updates = req.body
    try {
        const recipe = await model.update_one(id, updates)
        recipe
            ? res.status(200).json(recipe)
            : res.status(404).json(`Couldn't update recipe`)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//terminate a recipe
router.delete(`/${tbl}/:id`, async (req, res) => {
    const {id} = req.params
    try {
        const recipe = await model.remove_one(id)
        recipe
            ? res.status(200).json(`${recipe.title} has been terminated.`)
            : res.status(404).json(`Couldn't find recipe ${id}.`)
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

//terminate all recipes
router.delete(`/${tbl}`, async (req, res) => {
    try {
        await model.remove_all()
        res.status(200).json('All recipes have been eliminated.')
    } catch(err) {
        res.status(500).json(err.detail)
    }
})

module.exports = router