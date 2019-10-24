const db = require("./dbConfig.js");

module.exports = {
    insertRecipe,
    allRecipes,
    findRecipeById,
    findByTitle    
}


  function insertRecipe(recipe) {
      const { 
              title,
              minutes,
              notes,
              ingredients,
              steps,
              innovator,
              ancestor 
            } = recipe;

      const newRecipe = { 
          title, 
          minutes, 
          notes 
        };

      const newIngredients = { ingredients };
      const newSteps = { steps };
      const newAncestor = { ancestor, innovator };

    return db("recipes")
        .insert([newRecipe])
        .then(()=>{
            db("ingredients").insert(newIngredients)
        })
        .then(() => {
            db('steps').insert(newSteps)
        })
        .then(() => {
            db('edits').insert(
                {
                    
                }
            )
        });
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
      .join('likes as l', 'l.recipe_id', 'r.id')
      .pluck('l.cook_id').whereIn('l.recipe_id', [id]);

      // resolves to the id of whichever cook created or modified this recipe.
    const recipeInnovator = await db('recipes as r')
      .where({ 'r.id': id })
      .join('edits as e', 'e.new_recipe', 'r.id')
      .select('e.cook_id').whereIn('e.new_recipe', [id])
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
        ingredients: recipeIngredients,
        steps: recipeSteps,
        notes: baseRecipe.notes ? baseRecipe.notes : null,
        categories: recipeCategories ? recipeCategories : null,
        likes: recipeLikes ? recipeLikes.length : null,
        innovator: recipeInnovator ? recipeInnovator.cook_id : null,
        ancestor: recipeAncestor ? recipeAncestor.old_recipe : null
    }

    return newRecipe;
  }

  function allRecipes() {
        return db('*').from('recipes as r')
        .leftJoin('edits as e', {'e.new_recipe': 'r.id'})
        .select(['r.id', 'r.title', 'r.minutes', 'e.cook_id']);
  }

  function findByTitle(title) {
    return db("recipes").where({ title }).first();
  }
  