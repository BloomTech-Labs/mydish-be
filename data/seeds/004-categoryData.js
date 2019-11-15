
exports.seed = function (knex) {
  // Deletes ALL existing entries.
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { recipe_id: 1, name: 'Breakfast' },
        { recipe_id: 1, name: 'Lunch' },
        { recipe_id: 2, name: 'Breakfast' },
        { recipe_id: 2, name: 'Brunch' },
        { recipe_id: 2, name: 'Quick meals' },
        { recipe_id: 3, name: 'Breakfast' },
        { recipe_id: 3, name: 'Snack' },
        { recipe_id: 3, name: 'People food' },
        { recipe_id: 3, name: 'Egg foods' },
        { recipe_id: 4, name: 'Dessert' },
        { recipe_id: 4, name: 'Snack' },
        { recipe_id: 4, name: 'Dinner' },
        { recipe_id: 4, name: 'Potato foods' }
      ]);
    });
};
//save