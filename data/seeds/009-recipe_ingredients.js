const seed_data = []
exports.recipe_ingredients_data = seed_data

exports.seed = knex => knex('recipe_ingredients').insert(seed_data)
