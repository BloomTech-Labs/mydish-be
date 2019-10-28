const router = require("express").Router();
const Cookbook = require("../data/cookbookModel.js");
const mid = require("../middleware/cookMiddleware.js");

//save a recipe
router.post("/save/:recipe_id", mid.restrict, (req, res) => {
    Cookbook.insert({
        cook_id: req.cook.id,
        recipe_id: req.params.recipe_id
      })
    .then(() => res.status(200).json( {message: "Recipe Successfully Saved to Cookbook."}))
    .catch(() => res.status(500).json({message: "could not save recipe to cookbook. please try again."}))
});

//delete a saved recipe
router.delete("/delete/:recipe_id", mid.restrict, (req, res) => {
    Cookbook.remove(req.params.recipe_id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error deleting recipe from cookbook" });
    });
});

module.exports = router;