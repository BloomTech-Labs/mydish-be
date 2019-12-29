const router = require('express').Router()
const model = require('../models/recipes')
const tbl = 'recipes'

//add a recipe
router.post(`/${tbl}`, async (req, res) => {
    const {title} = req.body
    try {
        const new_recipe = await model.add_one({title})
        res.status(200).json(new_recipe)
    } catch(err) {
        res.status(500).json(err.detail)
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
        const recipes = await model.get_all()
        recipes.length > 0
            ? res.status(200).json(recipes)
            : res.status(404).json('No recipes found.')
    } catch(err) {
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