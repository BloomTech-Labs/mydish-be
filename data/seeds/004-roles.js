const seed_data = [
  { id: 1, name: 'user' },
  { id: 2, name: 'admin' }
]
// So we can import seed_data for testing
exports.roles_data = seed_data

exports.seed = knex => knex('roles').insert(seed_data)