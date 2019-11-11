const db = require('./dbConfig.js');

module.exports = {
  cookbookInsert,
  cookbookRecipeDelete,
  cookbookFindById,
  cookbookSearch,
  cookbookSearchAll
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

function cookbookSearch(userId, category) {
  return db.with('tmpSaves', (qb) => {
    qb
      .select('r.*')
      .count('r.id as total_saves')
      .from('recipes as r')
      .join('saves as s', 'r.id', 's.recipe_id')
      .where('s.cook_id', userId)
      .groupBy('r.id');
  })
    .select(['r.id', 'r.title', 'r.minutes',
      'r.img', 'e.cook_id', 'c.username as author',
      't.total_saves'])
    .from('recipes as r')
    .leftJoin('edits as e', { 'e.new_recipe': 'r.id' })
    .leftJoin('cooks as c', 'e.cook_id', 'c.id')
    .rightJoin('categories as cat', 'r.id', 'cat.recipe_id')
    .rightJoin('tmpSaves as t', 'r.id', 't.id')
    .where('cat.name', category)
    .orderBy('r.id');
}

function cookbookSearchAll(userId) {
  return db.with('tmpSaves', (qb) => {
    qb
      .select('r.*')
      .count('r.id as total_saves')
      .from('recipes as r')
      .join('saves as s', 'r.id', 's.recipe_id')
      .where('s.cook_id', userId)
      .groupBy('r.id');
  })
    .select(['r.id', 'r.title', 'r.minutes',
      'r.img', 'e.cook_id', 'c.username as author',
      't.total_saves'])
    .from('recipes as r')
    .leftJoin('edits as e', { 'e.new_recipe': 'r.id' })
    .leftJoin('cooks as c', 'e.cook_id', 'c.id')
    .rightJoin('tmpSaves as t', 'r.id', 't.id')
    .orderBy('r.id');
}

