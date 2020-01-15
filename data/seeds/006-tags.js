const seed_data = [
  { id: 1, name: 'breakfast' },
  { id: 2, name: 'brunch' },
  { id: 3, name: 'lunch' },
  { id: 4, name: 'dinner' },
  { id: 5, name: 'snacks' },
  { id: 6, name: 'dessert' },
]
exports.tags_data = seed_data;

exports.seed = knex => knex('tags').insert(seed_data);