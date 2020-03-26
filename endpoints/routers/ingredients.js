const router = require("express").Router();
const model = require("../models/ingredients");

//add a ingredient
router.post(`/ingredients`, async (req, res) => {
  const { name, category } = req.body;
  try {
    const new_ingredient = await model.add_one({ name, category });
    res.status(200).json(new_ingredient);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.detail);
  }
});

//get one ingredient
router.get(`/ingredients/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await model.get_one({ id });
    ingredient
      ? res.status(200).json(ingredient)
      : res.status(404).json("No ingredient found.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//get all ingredients
router.get(`/ingredients`, async (req, res) => {
  try {
    const ingredients = await model.get_all();
    ingredients.length > 0
      ? res.status(200).json(ingredients)
      : res.status(404).json("No ingredients found.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//update a ingredient
router.put(`/ingredients/:id`, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const ingredient = await model.update_one(id, updates);
    ingredient
      ? res.status(200).json(ingredient)
      : res.status(404).json(`Couldn't update ingredient`);
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//terminate a ingredient
router.delete(`/ingredients/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await model.remove_one(id);
    ingredient
      ? res.status(200).json(`${ingredient.name} has been terminated.`)
      : res.status(404).json(`Couldn't find ingredient ${id}.`);
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//terminate all ingredients
router.delete(`/ingredients`, async (req, res) => {
  try {
    await model.remove_all();
    res.status(200).json("All ingredients have been eliminated.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

module.exports = router;
