const db = require("./dbConfig.js");

module.exports = {
  insertRecipe,
  updateRecipe,
  allRecipes,
  findRecipeById,
  searchByTitle,
  findByTitle,
  deleteById
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

// main functions:

async function insertRecipe({
  steps,
  ingredients,
  ancestor,
  innovator,
  categories,
  ...recipesEntry
}) {
  // main entry needed first
  const recipeRes = await db("recipes").insert(recipesEntry, ["id"]);

  const recipeId = recipeRes[0].id;

  const stepsEntries = steps.map((step, i) => {
    return { ordinal: i + 1, body: step, recipe_id: recipeId };
  });

  // ingredients given as array
  const ingredientsEntries = await Promise.all(
    ingredients.map(async ({ name, quantity, unit }) => {
      const unitId = unit
        ? (
            await db("units")
              .where({ name: unit.toLowerCase() })
              .first()
          ).name
        : null;
      return {
        recipe_id: recipeId,
        name,
        unit: unitId,
        quantity
      };
    })
  );

  await db("ingredients").insert(ingredientsEntries);
  await db("steps").insert(stepsEntries);
  await db("categories").insert(
    categories.map(name => ({ name, recipe_id: recipeId }))
  );
  await db("edits").insert({
    cook_id: innovator,
    old_recipe: ancestor, // can be null
    new_recipe: recipeId
    // timestamp: Date.now() // for the future
  });

  return recipeId;
}

async function updateRecipe(updatedRecipe) {
  // db.transaction -> If at any point, any of these transactions fail,
  //                        ALL of these db calls will rollback. This will
  //                        ensure that you don't have partial data inserted/updated
  //                        if there's an error anywhere '' '
  await db.transaction(async trx => {
    try {
      //========== Step 1 - update the recipe ==========//
      const updatedRecipeDetails = {
        title: updatedRecipe.title,
        minutes: updatedRecipe.minutes,
        notes: updatedRecipe.notes
      };
      await trx("recipes")
        .where({ id: updatedRecipe.id })
        .update(updatedRecipeDetails);

      //========== Step 2 - Update the recipe steps ==========//
      const dbSteps = await trx("steps").where({
        recipe_id: updatedRecipe.id
      });
      // By mapping through the steps in the database, we find the steps we want to update
      //     If there are any steps left over from the db, that means the user removed a step or more,
      //     and these steps should be deleted from the db '' '
      const stepsToDelete = [];
      const updatedSteps = [];
      dbSteps.forEach(step => {
        const index = updatedRecipe.steps.findIndex(
          checkStep => checkStep.ordinal === step.ordinal
        );
        if (index === -1) {
          stepsToDelete.push(step.ordinal);
        } else {
          updatedSteps.push(updatedRecipe.steps.splice(index, 1)[0]);
        }
      });
      // Any steps left over need to be inserted into the database
      const newSteps = updatedRecipe.steps;

      updatedSteps.forEach(async step => {
        await trx("steps")
          .where({ recipe_id: updatedRecipe.id })
          .andWhere({ ordinal: step.ordinal })
          .update(step);
      });
      stepsToDelete.forEach(async stepNumber => {
        await trx("steps")
          .where({ recipe_id: updatedRecipe.id })
          .andWhere({ ordinal: stepNumber })
          .del();
      });
      await trx("steps").insert(
        newSteps.map(step => ({ ...step, recipe_id: updatedRecipe.id }))
      );

      //========== Step 3 - update the recipe ingredients ==========//
      const dbIngredients = await trx("ingredients").where({
        recipe_id: updatedRecipe.id
      });

      // Make sure our units are in the db, and include them in our object as an integer instead of a string
      const ingredientsEntries = await Promise.all(
        updatedRecipe.ingredients.map(async ingredient => {
          try {
            ingredient.unit = ingredient.unit
              ? (
                  await trx("units")
                    .where({ name: ingredient.unit.toLowerCase() })
                    .first()
                ).name
              : null;
          } catch (e) {
            ingredient.unit = null;
          } finally {
            return ingredient;
          }
        })
      );
      // Same process we did with the steps, we do with the ingredients
      const ingredientsToDelete = [];
      const updatedIngredients = [];
      dbIngredients.forEach(ingredient => {
        const index = ingredientsEntries.findIndex(
          checkIngredient => checkIngredient.name === ingredient.name
        );
        if (index === -1) {
          ingredientsToDelete.push(ingredient.name);
        } else {
          updatedIngredients.push(ingredientsEntries.splice(index, 1)[0]);
        }
      });
      // Any ingredients left over need to be inserted into the database
      const newIngredients = ingredientsEntries;

      ingredientsToDelete.forEach(async ingredientName => {
        await trx("ingredients")
          .where({ recipe_id: updatedRecipe.id })
          .andWhere({ name: ingredientName })
          .del();
      });
      updatedIngredients.forEach(async ingredient => {
        await trx("ingredients")
          .where({ recipe_id: updatedRecipe.id })
          .andWhere({ name: ingredient.name })
          .update(ingredient);
      });
      await trx("ingredients").insert(
        newIngredients.map(ingredient => ({
          ...ingredient,
          recipe_id: updatedRecipe.id
        }))
      );
    } catch (e) {
      trx.rollback();
      throw e;
    }
  });
  return true;
}

async function findRecipeById(id) {
  //resolves to recipe table with only title, minutes to make, and notes.
  const baseRecipe = await db("recipes as r")
    .where({ "r.id": id })
    .first();

  //resolves to array of step objects with their ordinals and step-body, ordered by ordinal
  const recipeSteps = await db("recipes as r")
    .where({ "r.id": id })
    .join("steps as s", "s.recipe_id", "r.id")
    .select("s.ordinal", "s.body")
    .whereIn("s.recipe_id", [id])
    .orderBy("s.ordinal");

  //resolves to an array of ingredient objects with name, quantity, and unit type
  const recipeIngredients = await db("recipes as r")
    .where({ "r.id": id })
    .join("ingredients as i", "i.recipe_id", "r.id")
    .select("i.name", "i.quantity", "i.unit")
    .whereIn("i.recipe_id", [id]);

  //resolves to array of cook_ids.  will have to call likes.length in final return object.
  const recipeLikes = await db("recipes as r")
    .where({ "r.id": id })
    .join("saves as l", "l.recipe_id", "r.id")
    .pluck("l.cook_id")
    .whereIn("l.recipe_id", [id]);

  // resolves to the id of whichever cook created or modified this recipe.
  const recipeInnovator = await db("recipes as r")
    .where({ "r.id": id })
    .join("edits as e", "e.new_recipe", "r.id")
    .select("e.cook_id")
    .whereIn("e.new_recipe", [id])
    .first();

  // resolves to the username of the cook who created the recipe
  const innovatorEntry = await db("recipes as r")
    .where({ "r.id": id })
    .join("edits as e", "e.new_recipe", "r.id")
    .join("cooks as c", "c.id", "e.cook_id")
    .select("username")
    .first();

  // resolves to the id of the previous version of this recipe, if any. and null, if not.
  const recipeAncestor = await db("recipes as r")
    .where({ "r.id": id })
    .join("edits as e", "e.new_recipe", "r.id")
    .select("e.old_recipe")
    .whereIn("e.new_recipe", [id])
    .first();

  //resolves to an array of category names as strings
  const recipeCategories = await db("recipes as r")
    .where({ "r.id": id })
    .join("categories as c", "c.recipe_id", "r.id")
    .pluck("c.name")
    .whereIn("c.recipe_id", [id]);

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
    innovator_name: innovatorEntry ? innovatorEntry.username : null
  };

  return newRecipe;
}

function findByTitle(title) {
  return db("recipes as r")
    .where({ title })
    .leftJoin("edits as e", { "e.new_recipe": "r.id" })
    .leftJoin("cooks as c", "e.cook_id", "c.id")
    .select([
      "r.id",
      "r.title",
      "r.minutes",
      "r.img",
      "e.cook_id",
      "c.username"
    ]);
}

function allRecipes() {
  return db
    .with("tmpSaves", qb => {
      qb.select("r.*")
        .count("r.id as total_saves")
        .from("recipes as r")
        .join("saves as s", "r.id", "s.recipe_id")
        .groupBy("r.id");
    })
    .select([
      "r.id",
      "r.title",
      "r.minutes",
      "r.img",
      "e.cook_id",
      "c.username",
      "t.total_saves"
    ])
    .from("recipes as r")
    .leftJoin("edits as e", { "e.new_recipe": "r.id" })
    .leftJoin("cooks as c", "e.cook_id", "c.id")
    .leftJoin("tmpSaves as t", "r.id", "t.id")
    .then(recipes =>
      recipes.map(recipe => ({
        ...recipe,
        total_saves: forceNumber(recipe.total_saves)
      }))
    )
    .then(recipes => {
      return [...recipes].sort(higherProp("total_saves"));
    });
}

function searchByTitle(title) {
  return db
    .with("tmpSaves", qb => {
      qb.select("r.*")
        .count("r.id as total_saves")
        .from("recipes as r")
        .join("saves as s", "r.id", "s.recipe_id")
        .groupBy("r.id");
    })
    .select([
      "r.id",
      "r.title",
      "r.minutes",
      "r.img",
      "e.cook_id",
      "c.username",
      "t.total_saves"
    ])
    .from("recipes as r")
    .where("r.title", "ilike", `%${title}%`)
    .leftJoin("edits as e", { "e.new_recipe": "r.id" })
    .leftJoin("cooks as c", "e.cook_id", "c.id")
    .leftJoin("tmpSaves as t", "r.id", "t.id")
    .then(recipes =>
      recipes.map(recipe => ({
        ...recipe,
        total_saves: forceNumber(recipe.total_saves)
      }))
    )
    .then(recipes => {
      return [...recipes].sort(higherProp("total_saves"));
    });
}

//the endpoint is for development only.
async function deleteById(recipeId) {
  return db("recipes as r")
    .where({ "r.id": recipeId })
    .del();
}
