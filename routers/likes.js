const router = require("express").Router();
const Likes = require("../data/likesModel.js");
const mid = require("../middleware/cookMiddleware.js");

//save user's likes to likes table
router.post("/:recipe_id", mid.restrict, (req, res) => {
    const recipeId = parseInt(req.params.recipe_id);
    console.log("recipe_id", recipeId)
    console.log("type of recipe_id", typeof recipeId)
    console.log("type of cookid", typeof req.cook.id)
    Likes.likesInsert({
        cook_id: req.cook.id,
        recipe_id: req.params.recipe_id
    })
        .then(() => res.status(200).json({ message: "likes added" }))
        .catch(err => { console.log(err), res.status(500).json({ message: "couldn't save like" }) })
})


module.exports = router;