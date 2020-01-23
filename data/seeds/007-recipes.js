const seed_data = [
    {
        // id: 1,
        title: 'Eggplant',
        owner_id: 2,
        cook_time: 15,
        img: 'https://image.shutterstock.com/image-photo/grilled-eggplants-seasoned-olive-oil-260nw-87708241.jpg'
    },
    {
        // id: 2,
        title: 'Cereal',
        owner_id: 1,
        prep_time: 45,
        img: 'https://image.shutterstock.com/z/stock-photo-cornflakes-with-milk-in-the-white-bowl-322906217.jpg'
    },
    {
        // id: 3,
        title: 'Scrambled Eggs',
        owner_id: 2,
        cook_time: 2,
        img: 'https://image.shutterstock.com/image-photo/mexican-food-recipes-revoltillo-de-600w-752977636.jpg'
    },
    {
        // id: 4,
        title: 'Home Fries',
        owner_id: 3,
        cook_time: 20,
        img: 'https://image.shutterstock.com/z/stock-photo-fried-potatoes-147539354.jpg'
    },
]
exports.recipes_data = seed_data

exports.seed = knex => knex('recipes').insert(seed_data)
