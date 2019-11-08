
exports.seed = function(knex) {
  // Deletes ALL existing entries.
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {recipe_id: 1, name: 'vegetables'},
        {recipe_id: 1, name: 'healthy'},
        {recipe_id: 1, name: 'low calorie'},
        {recipe_id: 1, name: 'eggplant dishes'},
        {recipe_id: 2, name: 'breakfast'},
        {recipe_id: 2, name: 'people food'},
        {recipe_id: 2, name: 'dairy'},
        {recipe_id: 2, name: 'quick meals'},
        {recipe_id: 3, name: 'breakfast'},
        {recipe_id: 3, name: 'dairy'},
        {recipe_id: 3, name: 'people food'},
        {recipe_id: 3, name: 'egg foods'},
        {recipe_id: 4, name: 'breakfast'},
        {recipe_id: 4, name: 'brunch'},
        {recipe_id: 4, name: 'quick meals'},
        {recipe_id: 4, name: 'potato foods'}
      ]);
    });
};
