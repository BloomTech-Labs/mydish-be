const router = require("express").Router();
const model = require("../models/recipe_ingredients");

//add a ingredient
router.post(`/recipe_ingredients`, async (req, res) => {
  const { recipe_id, ingredient_id, unit_id, quantity } = req.body;
  try {
    const new_ingredient = await model.add_one({
      recipe_id,
      ingredient_id,
      unit_id,
      quantity
    });
    res.status(200).json(new_ingredient);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one ingredient
router.get(`/recipe_ingredients/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await model.get_one({ id });
    ingredient
      ? res.status(200).json(ingredient)
      : res.status(404).json("No recipe_ingredients entry found.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all ingredients
router.get(`/recipe_ingredients`, async (req, res) => {
  try {
    const ingredients = await model.get_all();
    ingredients.length > 0
      ? res.status(200).json(ingredients)
      : res.status(404).json("No recipe_ingredients found.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a ingredient
router.put(`/recipe_ingredients/:id`, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const ingredient = await model.update_one(id, updates);
    ingredient
      ? res.status(200).json(ingredient)
      : res.status(404).json(`Couldn't update ingredient`);
  } catch (err) {
    res.status(500).json(err);
  }
});

//terminate a recipe_ingredients entry
router.delete(`/recipe_ingredients/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await model.remove_one(id);
    ingredient
      ? res.status(200).json(`recipe_ingredient id ${id} has been terminated.`)
      : res
          .status(404)
          .json(`Couldn't find recipe_ingredients entry with id ${id}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

//terminate all recipe_ingredients entries
router.delete(`/recipe_ingredients`, async (req, res) => {
  try {
    await model.remove_all();
    res.status(200).json("All recipe_ingredients have been eliminated.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
