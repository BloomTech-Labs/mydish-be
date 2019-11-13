const db = require('./dbConfig.js');

module.exports = {
  cookbookInsert,
  cookbookRecipeDelete,
  cookbookFindById,
  cookbookSearch,
  cookbookSearchAll,
  deleteById
};

//if the saves table only has one cook_id associated with this recipe ID, fully delete the recipe from the DB.
async function deleteById(recipeId, cookId) {

  //returns the saves table entries where the recipe ID matches the clicked recipe ID and returns an array of associated cook Ids.
  const saves = await db('saves')
    .where({ 'saves.recipe_id': recipeId })
    .pluck('saves.cook_id');

  //if the array only has 1 entry, then the logged in user must be the cook within the entry, because they can only delete from their cookbook. which populates directly from the saves table.
  if (saves.length <= 1) {

    //erases recipe items in reverse order where the recipe id matches clicked recipe.
    return db('recipes as r')
      .where({ 'r.id': recipeId })
      .del();

  } else {
    //remove the cook_id/recipe_id pair from the saves table and call it a day.
    await db('saves')
      .where({ 'saves.cook_id': cookId, 'saves.recipe_id': recipeId })
      .del();

    return await db('saves').where('recipe_id', recipeId).count('cook_id').first();
  }
}

function cookbookFindById(cookId) {
  return db('saves')
    .where({ 'saves.cook_id': cookId })
    .pluck('saves.recipe_id');
}

async function cookbookInsert(recipeId, cookId) {
  await db('saves')
    .insert({ recipe_id: recipeId, cook_id: cookId });

  return await db('saves').where('recipe_id', recipeId).count('cook_id').first();
}

//find the first recipe in the logged in user's cookbook that matches the ID passed in and delete that.
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
      .groupBy('r.id');
  })
    .select(['r.id', 'r.title', 'r.minutes',
      'r.img', 'e.cook_id', 'c.username as author',
      't.total_saves'])
    .from('recipes as r')
    .leftJoin('edits as e', { 'e.new_recipe': 'r.id' })
    .leftJoin('cooks as c', 'e.cook_id', 'c.id')
    .rightJoin('tmpSaves as t', 'r.id', 't.id')
    .join('saves as s', 'r.id', 's.recipe_id')
    .join('categories as cat', 'r.id', 'cat.recipe_id')
    .where('cat.name', category)
    .andWhere('s.cook_id', userId)
    .orderBy('r.id');
}

function cookbookSearchAll(userId) {
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
    .leftJoin('edits as e', { 'e.new_recipe': 'r.id' })
    .leftJoin('cooks as c', 'e.cook_id', 'c.id')
    .rightJoin('tmpSaves as t', 'r.id', 't.id')
    .join('saves as s', 's.recipe_id', 'r.id')
    .where('s.cook_id', userId)
    .orderBy('r.id');
}

