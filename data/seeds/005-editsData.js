exports.seed = function(knex) {
  return knex("edits").insert([
    { old_recipe: 1, new_recipe: 2, cook_id: 1 },
    { old_recipe: null, new_recipe: 3, cook_id: 2 },
    { old_recipe: null, new_recipe: 1, cook_id: 2 },
    { old_recipe: 3, new_recipe: 4, cook_id: 3 }
  ]);
};
