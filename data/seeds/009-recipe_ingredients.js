const seed_data = [
    {
        // id: 1,
        recipe_id: 1,
        ingredient_id: 15,
        unit_id: 1,
        quantity: 1
    },
    {
        // id: 2,
        recipe_id: 2,
        ingredient_id: 109,
        unit_id: 6,
        quantity: 2
    },
    {
        // id: 3,
        recipe_id: 2,
        ingredient_id: 86,
        unit_id: 6,
        quantity: 1
    },
    {
        // id: 4,
        recipe_id: 3,
        ingredient_id: 96,
        unit_id: 1,
        quantity: 4
    },
    {
        // id: 5,
        recipe_id: 3,
        ingredient_id: 86,
        unit_id: 6,
        quantity: 0.25
    },
    {
        // id: 6,
        recipe_id: 3,
        ingredient_id: 112,
        unit_id: 2,
        quantity: 1
    },
    {
        // id: 7,
        recipe_id: 3,
        ingredient_id: 113,
        unit_id: 6,
        quantity: 0.25
    },
    {
        // id: 8,
        recipe_id: 4,
        ingredient_id: 26,
        unit_id: 1,
        quantity: 5
    },
    {
        // id: 9,
        recipe_id: 4,
        ingredient_id: 110,
        unit_id: 6,
        quantity: 1
    },
    {
        // id: 10,
        recipe_id: 4,
        ingredient_id: 111,
        unit_id: 23,
        quantity: 1
    },
]
exports.recipe_ingredients_data = seed_data

exports.seed = knex => knex('recipe_ingredients').insert(seed_data)
