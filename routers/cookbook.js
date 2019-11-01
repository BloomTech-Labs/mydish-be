const router = require("express").Router();
const Cookbook = require("../data/cookbookModel.js");
const mid = require("../middleware/cookMiddleware.js");

//save a recipe to a cookbook
router.post("/save/:recipe_id", mid.restrict, (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  Cookbook.insert({
    cook_id: req.cook.id,  //grabs id from the cook object in the restriction middlewear.
    recipe_id: req.params.recipe_id
  })
    .then(() => res.status(200).json({ message: "Recipe Successfully Saved to Cookbook." }))
    .catch(() => res.status(500).json({ message: "could not save recipe to cookbook. please try again." }))
=======
    Cookbook.insert({
=======
    Cookbook.cookbookInsert({
>>>>>>> 8d71d0eb5412ba45ba502eaa30b10a2c56364467
        cook_id: req.cook.id,  //grabs id from the cook object in the restriction middlewear.
        recipe_id: req.params.recipe_id 
      })
    .then(() => res.status(200).json( {message: "Recipe Successfully Saved to Cookbook."}))
    .catch(() => res.status(500).json( {message: "could not save recipe to cookbook. please try again." }))
>>>>>>> b217f76cc1e4f84468cda5a4f2d4136730200ca0
});

//delete a saved recipe from the cookbook
router.delete("/delete/:recipe_id", mid.restrict, (req, res) => {
  Cookbook.cookbookRecipeDelete(req.params.recipe_id, req.cook.id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error deleting recipe from cookbook" });
    });
});

//gets a cook's saved recipes, grabs recipes for logged in cook. 
router.get("/", mid.restrict, (req, res) => {
<<<<<<< HEAD
  console.log("hello from cookbook", req.cook.id)
  Cookbook.cookbookFindById(req.cook.id)
    .then(hello => res.status(200).json(hello))
    .catch(error => { console.log(error), res.status(401).json({ error: "could not retrieve cookbook" }) })
=======
    Cookbook.cookbookFindById(req.cook.id)
    .then(recipeIds => {
      res.status(200).json({cookbook: recipeIds});
    })
    .catch(err => {
      console.log("your error, master", err);
      res.status(501).json({error: "could not retrieve cookbook"})
    })
>>>>>>> b217f76cc1e4f84468cda5a4f2d4136730200ca0
});

module.exports = router;