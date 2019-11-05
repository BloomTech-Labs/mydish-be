const router = require("express").Router();
const Likes = require("../data/likesModel.js");
const mid = require("../middleware/cookMiddleware.js");

//save user's likes to likes table
router.post("/:recipe_id", mid.restrict, (req, res) => {
    const recipeId = parseInt(req.params.recipe_id);
    Likes.likesInsert(recipeId,
        req.cook.id

    )
        .then(() => res.status(200).json({ message: "likes added" }))
        .catch(err => { console.log(err), res.status(500).json({ message: "couldn't save like" }) })
})


module.exports = router;