
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {recipe_id: 1, name: 'eggplant', quantity: 2},
        {recipe_id: 2, name: 'cheerios', unit: 'cup', quantity: 2},
        {recipe_id: 2, name: 'milk', unit: 'cup', quantity: 1},
        {recipe_id: 3, name: 'egg', quantity: 'cup'},
        {recipe_id: 3, name: 'milk', unit: 'cup', quantity: .25},
        {recipe_id: 3, name: 'butter', unit: 'tsp', quantity: 1},
        {recipe_id: 3, name: 'cheddar', unit: 'cup', quantity: .25},
        {recipe_id: 4, name: 'potato', quantity: 5},
        {recipe_id: 4, name: 'oil', unit: 'cup', quantity: 1},
        {recipe_id: 4, name: 'italian seasoning', unit: 'package', quantity: 1}
      ]);
    });
};
