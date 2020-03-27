const seed_data = [
  {
    title: "Eggplant",
    owner_id: 2,
    cook_time: 15,
    img:
      "https://images.pexels.com/photos/772513/pexels-photo-772513.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    author_comment: "Original Recipe",
  },
  {
    title: "Cereal",
    owner_id: 1,
    prep_time: 45,
    img:
      "https://images.pexels.com/photos/135525/pexels-photo-135525.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    author_comment: "Original Recipe",
  },
  {
    title: "Hard Boiled Egg",
    owner_id: 2,
    cook_time: 15,
    prep_time: 5,
    img:
      "https://images.pexels.com/photos/806457/pexels-photo-806457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    author_comment: "Original Recipe",
  },
  {
    title: "Home Fries",
    owner_id: 3,
    cook_time: 20,
    img:
      "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    author_comment: "Original Recipe",
  },
];
exports.recipes_data = seed_data;

exports.seed = knex => knex("recipes").insert(seed_data);
