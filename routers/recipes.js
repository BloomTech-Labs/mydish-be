const router = require("express").Router();
const Recipes = require("../data/recipeModel.js");
const mid = require("../middleware/cookMiddleware.js");
const cookbook = require("../data/cookbookModel.js");

//all recipes
router.get("/all", (req, res) => {
    Recipes.allRecipes()
    .then(x => {res.status(200).json(x)})
    .catch(err => {res.status(500).json(err)});
});

router.get("/test", (req, res) => {
    Recipes.totalLikesC(1)
    .then(x => {res.status(200).json(x)})
    .catch(err => {res.status(500).json(err)});
});

//search by title
router.get("", (req, res) => {
    const getFun = req.query.title ? Recipes.searchByTitle : Recipes.allRecipes;
    getFun(req.query.title)
        .then(dbRes => {
            res.status(200).json(dbRes);
        })
        .catch(err => res.status(500).json(err));
});

//single recipe
router.get("/:id", (req, res) => {
    Recipes.findRecipeById(req.params.id)
      .then(x => {res.status(200).json(x)})
      .catch(err => {res.status(500).json(err)});
  });

//post a new recipe
router.post("/", mid.restrict, async (req, res) => {
    const missing = [];
    const validRecipe = { innovator: req.cook.id };

    // required fields
    ["title", "ingredients", "steps"].forEach(field => {
        if (field in req.body) {
            validRecipe[field] = req.body[field];
        } else {
            missing.push(field);
        }
    });

    if (missing.length > 0) { // abort if required fields missing
        res.status(400).json({ message: `missing required fields: ${missing}`});
    } else {
        // optional fields
        ["notes", "ancestor", "minutes", "img"].forEach(field => {
            if (field in req.body) {
                validRecipe[field] = req.body[field];
            }
        });

        try {
            const recipeId = await Recipes.insertRecipe(validRecipe);
            cookbook.cookbookInsert(recipeId, req.cook.id).then(dbRes => {
                res.status(201).json({ message: "Recipe created"})
            }).catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
        } catch(err) {
            console.log(err);
            res.status(500).json({message: "Error creating recipe", err});
        }
    }
});


module.exports = router;

