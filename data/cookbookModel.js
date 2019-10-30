const db = require("./dbConfig.js");

module.exports = {
  cookbookInsert,
  cookbookRecipeDelete,
  cookbookFindById
}

function cookbookFindById(cookId) {
  console.log("Hi form cookbook model", cookId)
  return db("saves")
    .pluck('saves.recipe_id')
    .whereIn('saves.cook_id', cookId);
}

function cookbookInsert(recipeId, cookId) {
  return db("saves")
    .insert(recipeId, cookId);
};


//find the first recipe in the logged in cook's cookbook that matches the ID passed in and delete that.

function cookbookRecipeDelete(recipeId, cookId) {
  return db("saves")
    .where({ 'saves.cook_id': cookId, 'saves.recipe_id': recipeId })
    .del()
};