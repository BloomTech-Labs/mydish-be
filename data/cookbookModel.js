const db = require("./dbConfig.js");

module.exports = {
    cookbookInsert,
    cookbookRecipeDelete,
    cookbookFindById
}

function cookbookFindById(id) {
    return db("saves")
    .pluck('saves.recipe_id')
    .whereIn({'saves.cook_id': id});
  }

function cookbookInsert(recipeId, cookId) {
    return db("saves")
      .insert(recipeId, cookId);
  };
  
function cookbookRecipeDelete(recipeId) {
    return findBy({ recipeId }).del();
  };