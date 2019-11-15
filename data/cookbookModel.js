const db = require('./dbConfig.js');
const { remove } = require('./recipeModel.js');

module.exports = {
  cookbookInsert,
  unsave,
  cookbookFindById,
  cookbookSearch,
  cookbookSearchAll,
  remove,
  hardUnsave
};

// // destroy a recipe in the database (gone for everyone)
// async function remove(id) {
//   await db('recipes').where({ id }).del();
//   return 0;
// }

//find the first recipe in the logged in user's cookbook that matches the ID passed in and unsave it. (gone only for your cookbook)
// returns new save count
async function unsave(recipeId, cookId) {
  await db('saves')
    .where({ 'saves.cook_id': cookId, 'saves.recipe_id': recipeId })
    .del();
  return (await db('saves').where('recipe_id', recipeId).count('cook_id').first()).count;
}

//if the saves table only has one cook_id associated with this recipe ID, fully delete the recipe from the DB.
async function hardUnsave(recipeId, cookId) {

  const remainingSaves = await unsave(recipeId, cookId);
  console.log('remsaves', remainingSaves) //!!

  if (remainingSaves) {
    return await remove(recipeId);
  } else {
    return remainingSaves;
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
    .where('cat.name', 'ilike', `%${category}%`)
    .andWhere('s.cook_id', userId)
    .orderBy('t.total_saves', 'desc');
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
    .orderBy('t.total_saves', 'desc');
}

