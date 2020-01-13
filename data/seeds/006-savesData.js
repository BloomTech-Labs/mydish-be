exports.seed = function(knex) {
  return knex("saves").insert([
    { cook_id: 1, recipe_id: 2 },
    { cook_id: 1, recipe_id: 4 },
    { cook_id: 2, recipe_id: 1 },
    { cook_id: 2, recipe_id: 2 },
    { cook_id: 2, recipe_id: 3 },
    { cook_id: 2, recipe_id: 4 },
    { cook_id: 3, recipe_id: 2 },
    { cook_id: 3, recipe_id: 3 }
  ]);
};
