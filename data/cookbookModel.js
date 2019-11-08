const db = require('./dbConfig.js');

module.exports = {
  cookbookInsert,
  cookbookRecipeDelete,
  cookbookFindById,
  cookbookSearch
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

function cookbookSearch(categories) {
  return db.with('tmpSaves', (qb) => {
    qb
      .select('r.*')
      .count('r.id as total_saves')
      .from('recipes as r')
      .join('saves as s', 'r.id', 's.recipe_id')
      .groupBy('r.id');
  })
    .select(['r.id', 'r.title', 'r.minutes',
      'r.img', 'e.cook_id', 'c.username',
      't.total_saves'])
    .from('recipes as r')
    .where('cat.name', categories)
    .leftJoin('edits as e', { 'e.new_recipe': 'r.id' })
    .leftJoin('cooks as c', 'e.cook_id', 'c.id')
    .leftJoin('tmpSaves as t', 'r.id', 't.id')
    .leftJoin('categories as cat', 'r.id', 'cat.recipe_id')
    .orderBy('r.id');
}
