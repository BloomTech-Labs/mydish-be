const seed_data = [
    {recipe_id: 1, step_number: 1, description: 'take eggplant'},
    {recipe_id: 1, step_number: 2, description: 'cook eggplant'},
    {recipe_id: 1, step_number: 3, description: 'eat eggplant'},
]
exports.instructions_data = seed_data

exports.seed = knex => knex('instructions').insert(seed_data)
