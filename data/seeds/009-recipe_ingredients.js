const seed_data = [
    {
        id: 1,
        recipe_id: 1,
        ingredient_id: 15,
        unit_id: 1,
        quantity: 1
    },
]
exports.recipe_ingredients_data = seed_data

exports.seed = knex => knex('recipe_ingredients').insert(seed_data)
