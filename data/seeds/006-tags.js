const seed_data = [
  { name: 'breakfast' }, // id: 1, 
  { name: 'brunch' }, // id: 2, 
  { name: 'lunch' }, // id: 3, 
  { name: 'dinner' }, // id: 4, 
  { name: 'snacks' }, // id: 5, 
  { name: 'dessert' }, // id: 6, 
]
exports.tags_data = seed_data;

exports.seed = knex => knex('tags').insert(seed_data);