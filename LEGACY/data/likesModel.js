
//to be honest this whole file needs to be deleted.

const db = require('./dbConfig.js');

module.exports = {
  likesInsert,
  likesTableDisplay,
  likesDelete
};

function likesInsert(recipeId, cookId) {
  console.log('cook insert', recipeId, cookId);
  return db('saves')
    .insert({ recipe_id: recipeId, cook_id: cookId });
}

function likesTableDisplay() {
  return db('saves');
}

function likesDelete(recipeId, cookId) {
  return db('saves')
    .where({ 'likes.cook_id': cookId, 'likes.recipe_id': recipeId })
    .del();
}