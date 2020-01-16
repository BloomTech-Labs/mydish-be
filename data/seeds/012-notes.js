const seed_data = [
  { id: 1, recipe_id: 1, description: 'Eggplant is healthy.' },
  { id: 2, recipe_id: 1, description: 'Edit recipe to add parmesan' },
];
exports.notes_data = seed_data;

exports.seed = knex => knex("notes").insert(seed_data);
