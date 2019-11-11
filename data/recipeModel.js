const db = require('./dbConfig.js');

module.exports = {
  insertRecipe,
  allRecipes,
  findRecipeById,
  searchByTitle,
  findByTitle,
  deleteById
};


async function insertRecipe({
  steps, ingredients, ancestor, innovator, categories, ...recipesEntry }) {

  // main entry needed first
  const recipeRes = await db('recipes').insert(recipesEntry, ['id']);

  const recipeId = recipeRes[0].id;

  const stepsEntries = steps.map((step, i) => {
    return { ordinal: i + 1, body: step, recipe_id: recipeId };
  });

  // ingredients given as array
  const ingredientsEntries = await Promise.all(
    ingredients.map(async ({ name, quantity, unit }) => {
      const unitRes = await db('units').where({ name: unit.toLowerCase() }).first();
      const unitId = unitRes.name;
      return {
        recipe_id: recipeId,
        name,
        unit: unitId,
        quantity
      };
    }));

  await db('ingredients').insert(ingredientsEntries);
  await db('steps').insert(stepsEntries);
  await db('categories').insert(categories.map(name => ({ name, recipe_id: recipeId })));
  await db('edits').insert({
    cook_id: innovator,
    old_recipe: ancestor, // can be null
    new_recipe: recipeId
    // timestamp: Date.now() // for the future
  });

  return recipeId;
}

async function findRecipeById(id) {

  //resolves to recipe table with only title, minutes to make, and notes.
  const baseRecipe = await db('recipes as r')
    .where({ 'r.id': id })
    .first();

  //resolves to array of step objects with their ordinals and step-body, ordered by ordinal
  const recipeSteps = await db('recipes as r')
    .where({ 'r.id': id })
    .join('steps as s', 's.recipe_id', 'r.id')
    .select('s.ordinal', 's.body').whereIn('s.recipe_id', [id])
    .orderBy('s.ordinal');

  //resolves to an array of ingredient objects with name, quantity, and unit type
  const recipeIngredients = await db('recipes as r')
    .where({ 'r.id': id })
    .join('ingredients as i', 'i.recipe_id', 'r.id')
    .select('i.name', 'i.quantity', 'i.unit').whereIn('i.recipe_id', [id]);

  //resolves to array of cook_ids.  will have to call likes.length in final return object.
  const recipeLikes = await db('recipes as r')
    .where({ 'r.id': id })
    .join('saves as l', 'l.recipe_id', 'r.id')
    .pluck('l.cook_id').whereIn('l.recipe_id', [id]);

  // resolves to the id of whichever cook created or modified this recipe.
  const recipeInnovator = await db('recipes as r')
    .where({ 'r.id': id })
    .join('edits as e', 'e.new_recipe', 'r.id')
    .select('e.cook_id').whereIn('e.new_recipe', [id])
    .first();

  const innovatorEntry = await db('cooks')
    .where({ id: recipeInnovator.cook_id })
    .select('username')
    .first();

  // resolves to the id of the previous version of this recipe, if any. and null, if not.
  const recipeAncestor = await db('recipes as r')
    .where({ 'r.id': id })
    .join('edits as e', 'e.new_recipe', 'r.id')
    .select('e.old_recipe').whereIn('e.new_recipe', [id])
    .first();

  //resolves to an array of category names as strings
  const recipeCategories = await db('recipes as r')
    .where({ 'r.id': id })
    .join('categories as c', 'c.recipe_id', 'r.id')
    .pluck('c.name').whereIn('c.recipe_id', [id]);

  //constructs the expected response object
  const newRecipe = {
    id: baseRecipe.id,
    title: baseRecipe.title,
    minutes: baseRecipe.minutes,
    img: baseRecipe.img,
    ingredients: recipeIngredients,
    steps: recipeSteps,
    notes: baseRecipe.notes ? baseRecipe.notes : null,
    categories: recipeCategories ? recipeCategories : null,
    total_saves: recipeLikes ? recipeLikes.length : null,
    innovator: recipeInnovator ? recipeInnovator.cook_id : null,
    ancestor: recipeAncestor ? recipeAncestor.old_recipe : null,
    innovator_name: innovatorEntry.username ? innovatorEntry.username : null
  };

  return newRecipe;
}

function findByTitle(title) {
  return db('recipes as r').where({ title })
    .leftJoin('edits as e', { 'e.new_recipe': 'r.id' })
    .leftJoin('cooks as c', 'e.cook_id', 'c.id')
    .select(['r.id', 'r.title', 'r.minutes', 'r.img', 'e.cook_id', 'c.username']);
}

function allRecipes() {

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
    .leftJoin('tmpSaves as t', 'r.id', 't.id')
    .orderBy('t.total_saves', 'desc');
}

function searchByTitle(title) {
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
    .where('r.title', 'ilike', `%${title}%`)
    .leftJoin('edits as e', { 'e.new_recipe': 'r.id' })
    .leftJoin('cooks as c', 'e.cook_id', 'c.id')
    .leftJoin('tmpSaves as t', 'r.id', 't.id')
    .orderBy('r.id');
}

//if the saves table only has one cook_id associated with this recipe ID, fully delete the recipe from the DB.
async function deleteById(recipeId, cookId) {
   
  //returns the saves table entries where the recipe ID matches the clicked recipe ID and returns an array of associated cook Ids. 
  const saves = await db('saves')
    .where({ 'saves.recipe_id': recipeId })
    .pluck('saves.cook_id');

  //if the array only has 1 entry, then the logged in user must be the cook within the entry, because they can only delete from their cookbook. which populates directly from the saves table.
  if (saves.length <= 1) {
    console.log('on delete the if statement ran')
    
    //erases recipe items in reverse order where the recipe id matches clicked recipe. 
    return db('recipes as r') 
      .where({ 'r.id': recipeId })
      .del();

  } else {
    console.log('on delete the else statement ran')
    //remove the cook_id/recipe_id pair from the saves table and call it a day.    
    return db('saves')
      .where({ 'saves.cook_id': cookId, 'saves.recipe_id': recipeId })
      .del();
  }
}
