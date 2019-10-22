
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('edits').del()
    .then(function () {
      // Inserts seed entries
      return knex('edits').insert([
        {old_recipe: 1, new_recipe: 2, cook_id: 1}
      ]);
    });
};
