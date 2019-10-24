const router = require("express").Router();
const Recipes = require("../data/recipeModel.js");

//all recipes
router.get("/all", (req, res) => {
    Recipes.allRecipes()
    .then(x => {res.status(200).json(x)})
    .catch(err => {res.status(500).json(err)});
});

//single recipe
router.get("/:id", (req, res) => {
    Recipes.findRecipeById(req.params.id)
      .then(x => {res.status(200).json(x)})
      .catch(err => {res.status(500).json(err)});
  });

//post a new recipe
router.post("/new", (req, res) => {
    const { title, 
        minutes, 
        notes, 
        ingredients,
        steps, 
        innovator } = req.body;

    Recipes.insertRecipe({title, 
        minutes, 
        notes, 
        ingredients, 
        steps, //must be added to steps table
        innovator //must be added to edits table
    })
            .then(
                res.status(201).json({ message: "Recipe created"})
            )
            .catch( err => {
                res.status(500).json({message: "Error creating recipe", err})
            });
})


module.exports = router;

