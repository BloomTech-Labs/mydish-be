const seed_data = [
  { name: 'Breakfast' }, // id: 1, 
  { name: 'Brunch' }, // id: 2, 
  { name: 'Lunch' }, // id: 3, 
  { name: 'Dinner' }, // id: 4, 
  { name: 'Snacks' }, // id: 5, 
  { name: 'Dessert' }, // id: 6, 
]
exports.tags_data = seed_data;

exports.seed = knex => knex('tags').insert(seed_data);