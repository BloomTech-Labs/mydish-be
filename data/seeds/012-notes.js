const seed_data = [
  { recipe_id: 1, description: "Eggplant is healthy." }, // id: 1,
  { recipe_id: 1, description: "Edit recipe to add parmesan" }, // id: 2,
  {
    // id: 3
    recipe_id: 2,
    description:
      "Cereal is one the most delicate and complex recipes known throughout the history of mankind..."
  },
  {
    // id: 4
    recipe_id: 3,
    description:
      "if you are a human, then the only proper way to consume scrambled eggs is with ketchup"
  },
  {
    // id: 5
    recipe_id: 4,
    description:
      "Cook a few minutes longer to get them crisp"
  },
  {
    // id: 6
    recipe_id: 4,
    description:
      "Great with homemade wings"
  },
];
exports.notes_data = seed_data;

exports.seed = knex => knex("notes").insert(seed_data);
