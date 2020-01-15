const seed_data = []
exports.instructions_data = seed_data

exports.seed = knex => knex('instructions').insert(seed_data)
