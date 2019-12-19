const db = require('./dbConfig.js');
const Recipes = require('../data/recipeModel.js');

module.exports = {
  all,
  findyBy,
  findAllByAncestorId,
  recipesByAncestorId,
  findByCookId,
  searchByAncestor
};


// support functions:

function forceNumber(val) {
    return val ? parseInt(val) : 0;
  }
  
  function higherProp(key) {
    // returns a comparison function that sorts high->low
    // based on the value of the given key in objects to be compared
    return (a, b) => {
      if (a[key] < b[key]) {
        return 1;
      } else if (a[key] > b[key]) {
        return -1;
      } else {
        return 0;
      }
    };
  }

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
    .pluck('new_recipe')
    .whereIn('edits.old_recipe', [ancestorId]);
}

async function recipesByAncestorId(ancestorId) {
    //grabs an array of available ancestor IDs.
    const ancestorArray = await findAllByAncestorId(ancestorId);
    
    //uses that array to create a new array filled with child recipes.
    async function recipeBuilder(ar) {
        //returns null if no items present.
        if (ar.length > 0) {
                 
          //calls for a detailed recipe and pushes it into the above array
          async function recipePooperOuter(num) {
            let recipe = await Recipes.findRecipeById(num);
            recipe ? recipe : console.log('could not push recipe to the recipeArray');
          }
        
        //runs each item in a given array through the above dbCall async function.
        let recipeArray = []; 

        for (const id of ar) {
            recipeArray.push(await recipePooperOuter(id));
        } //for some reason this isnt working and is returning undefined. will check it out in the morning.

        //returns the resulting array.
        console.log("recipe array after the forEach call", recipeArray);
        return recipeArray;

        } else {
          return null;
        }
    }
  //assigns the end-result to a variable and returns it.
  let results = recipeBuilder(ancestorArray);
  
  if (results.length > 0) {
      return results;
  }
  else {
      return "error building recipe"
  }
};


function findByCookId(cook_id) {
    return findBy({ cook_id });
}


//lets try something different here
function searchByAncestor(ancestorId) {
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
      .where('e.old_recipe', '=', `${ancestorId}`)
      .leftJoin('edits as e', { 'e.new_recipe': 'r.id' })
      .leftJoin('cooks as c', 'e.cook_id', 'c.id')
      .leftJoin('tmpSaves as t', 'r.id', 't.id')
      .then(recipes => recipes.map((recipe) => ({
        ...recipe,
        total_saves: forceNumber(recipe.total_saves)
      })))
      .then(recipes => {
        return [...recipes].sort(higherProp('total_saves'));
      });
  }