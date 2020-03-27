const seed_data = [
  {recipe_id: 1, tag_id: 1}, // id: 1,
  {recipe_id: 1, tag_id: 2}, // id: 2,

  {recipe_id: 2, tag_id: 1}, // id: 3,
  {recipe_id: 2, tag_id: 2}, // id: 4,
  {recipe_id: 2, tag_id: 5}, // id: 5,

  {recipe_id: 3, tag_id: 1}, // id: 6,
  {recipe_id: 3, tag_id: 5}, // id: 7,
  {recipe_id: 3, tag_id: 6}, // id: 8,

  {recipe_id: 4, tag_id: 6}, // id: 9,
  {recipe_id: 4, tag_id: 5}, // id: 10,
  {recipe_id: 4, tag_id: 4}, // id: 11,
];
exports.recipe_tags_data = seed_data;

exports.seed = knex => knex("recipe_tags").insert(seed_data);
