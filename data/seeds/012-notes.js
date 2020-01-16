const seed_data = [
  { recipe_id: 1, description: 'Eggplant is healthy.' }, // id: 1,
  { recipe_id: 1, description: 'Edit recipe to add parmesan' }, // id: 2,
];
exports.notes_data = seed_data;

exports.seed = knex => knex("notes").insert(seed_data);
