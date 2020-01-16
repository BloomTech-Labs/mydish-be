const seed_data = [
    { id: 1, recipe_id: 1, tag_id: 1 },
    { id: 2, recipe_id: 1, tag_id: 2 },
]
exports.recipe_tags_data = seed_data

exports.seed = knex => knex('recipe_tags').insert(seed_data)
