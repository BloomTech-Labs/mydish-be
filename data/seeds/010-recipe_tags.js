const seed_data = []
exports.recipe_tags_data = seed_data

exports.seed = knex => knex('recipe_tags').insert(seed_data)
