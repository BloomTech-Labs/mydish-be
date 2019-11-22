const db = require('./dbConfig.js');
const Recipes = require('../data/recipeModel.js');

module.exports = {
  all,
  findyBy,
  findAllByAncestorId,
  recipesByAncestorId,
  findByCookId,
};

function findyBy(param) {
    return db('edits')
    .where(params);
}

function all() {
    return db('edits')
    .select('old_recipe','new_recipe','cook_id');
}

function findAllByAncestorId(ancestorId) {
    return db('edits')
    .pluck('old_recipe')
    .whereIn('edits.old_recipe', [ancestorId]);
}

async function recipesByAncestorId(ancestorId) {
    let ancestorArray = await findAllByAncestorId(ancestorId);
    let recipeArray = [];
    ancestorArray && ancestorArray.forEach(id => {
        let recipe = Recipes.findRecipeById(id);
        recipeArray.push(recipe);
    });
    return recipeArray;
}


function findByCookId(cook_id) {
    return findBy({ cook_id }).first();
}


