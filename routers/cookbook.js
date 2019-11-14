const router = require('express').Router();
const Cookbook = require('../data/cookbookModel.js');
const mid = require('../middleware/cookMiddleware.js');

//save a recipe to a cookbook
router.post('/:recipe_id', mid.restrict, (req, res) => {
  const recipeId = parseInt(req.params.recipe_id);

  Cookbook.cookbookInsert(
    recipeId, req.cook.id
  )
    .then(({ count: total_saves }) => res.status(200).json({
      message: 'Recipe Successfully Saved to Cookbook.',
      total_saves
    }))
    .catch(() => res.status(500).json({ message: 'could not save recipe to cookbook. please try again.' }));
});

//delete a saved recipe from the cookbook
router.delete('/:recipe_id', mid.restrict, (req, res) => {
  Cookbook.cookbookRecipeDelete(req.params.recipe_id, req.cook.id)
    .then(({ count: total_saves }) => {
      res.status(200).json({ total_saves })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error deleting recipe from cookbook' });
    });
});

//gets a cook's saved recipes, grabs recipes for logged in cook.
router.get('', mid.restrict, (req, res) => {
  const getFun = req.query.category ?
    Cookbook.cookbookSearch : Cookbook.cookbookSearchAll;
  getFun(req.cook.id, req.query.category).then(dbRes => {
    res.status(200).json(dbRes);
  }).catch(err => { console.log(err); res.status(500).json(err); });
});

module.exports = router;
