const seed_data = []
exports.recipes_data = seed_data

exports.seed = knex => knex('recipes').insert(seed_data)
