const db = require('./dbConfig.js');

module.exports = {
  likesInsert,
  likesTableDisplay,
  likesDelete
};

function likesInsert(recipeId, cookId) {
  console.log('cook insert', recipeId, cookId);
  return db('likes')
    .insert({ recipe_id: recipeId, cook_id: cookId });
}

function likesTableDisplay() {
  return db('likes');
}

function likesDelete(recipeId, cookId) {
  return db('likes')
    .where({ 'likes.cook_id': cookId, 'likes.recipe_id': recipeId })
    .del();
}