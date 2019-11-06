const db = require('./dbConfig.js');

module.exports = {
  cookbookInsert,
  cookbookRecipeDelete,
  cookbookFindById
};

function cookbookFindById(cookId) {
  return db('saves')
    .where({ 'saves.cook_id': cookId })
    .pluck('saves.recipe_id');
}

function cookbookInsert(recipeId, cookId) {
  console.log('cookbookInsert got:', recipeId, cookId);
  return db('saves')
    .insert({ recipe_id: recipeId, cook_id: cookId });
}

//find the first recipe in the logged in cook's cookbook that matches the ID passed in and delete that.

function cookbookRecipeDelete(recipeId, cookId) {
  return db('saves')
    .where({ 'saves.cook_id': cookId, 'saves.recipe_id': recipeId })
    .del();
}
