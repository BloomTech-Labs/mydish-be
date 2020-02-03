const seed_data = [
    {
        // id: 1,
        title: 'Eggplant',
        owner_id: 2,
        cook_time: 15,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9M8IT_KlmpMp0LVQrr2hZ2mysqIqjIJvtxkG9k32GA1Ssb1eQ&s',
        author_comment: "Original Recipe",
    },
    {
        // id: 2,
        title: 'Cereal',
        owner_id: 1,
        prep_time: 45,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4uDnnPb5pgDy1qxmyG_GWEx3RPR2Wb00ndhoFfE7AE97kb90a&s',
        author_comment: "Original Recipe",
    },
    {
        // id: 3,
        title: 'Scrambled Eggs',
        owner_id: 2,
        cook_time: 2,
        img: 'https://www.tasteofhome.com/wp-content/uploads/2017/10/Fluffy-Scrambled-Eggs_exps12235_SD143206C04_08_3bC_RMS-3.jpg',
        author_comment: "Original Recipe",
    },
    {
        // id: 4,
        title: 'Home Fries',
        owner_id: 3,
        cook_time: 20,
        img: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/3/2/2/FNM_040115-Home-Fries-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1425493279415.jpeg',
        author_comment: "Original Recipe",
    },
]
exports.recipes_data = seed_data

exports.seed = knex => knex('recipes').insert(seed_data)
