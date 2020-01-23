const seed_data = [
  { recipe_id: 1, step_number: 1, description: "take eggplant" }, // id: 1
  { recipe_id: 1, step_number: 2, description: "cook eggplant" }, // id: 2
  { recipe_id: 1, step_number: 3, description: "eat eggplant" }, // id: 3
  {
    // id: 4
    recipe_id: 2,
    step_number: 1,
    description: "pour your crunchy people food into a bowl"
  },
  {
    // id: 5
    recipe_id: 2,
    step_number: 2,
    description:
      "smother your crunchy people food with processed cows lacrimal essence"
  },
  {
    // id: 6
    recipe_id: 2,
    step_number: 3,
    description:
      "shovel your milky people food into your mouth in easy to manage bite-sized spoonfuls"
  },
  {
    // id: 7
    recipe_id: 3,
    step_number: 1,
    description: "get egg and crack into a bowl"
  },
  {
    // id: 8
    recipe_id: 3,
    step_number: 2,
    description:
      "add small amount of milk and whisk the ever-loving devil out of those eggs"
  },
  {
    // id: 9
    recipe_id: 3,
    step_number: 3,
    description: "pour milky egg mixture into a well greased sizzly hot pan"
  },
  {
    // id: 10
    recipe_id: 3,
    step_number: 4,
    description: "stir with rubber spatula whilst the eggs solidify"
  },
  {
    // id: 11
    recipe_id: 3,
    step_number: 5,
    description: "cheese those eggy bois, if you are so inclined."
  },
  {
    // id: 12
    recipe_id: 3,
    step_number: 6,
    description:
      "serve while they're still hot or you will end up hating yourself"
  },
  {
    // id: 13
    recipe_id: 4,
    step_number: 1,
    description: "aquire potatoes and section them in to manageable bits"
  },
  {
    // id: 14
    recipe_id: 4,
    step_number: 2,
    description:
      "throw those bits in a metal thingy that gets hot on a larger metal thingy"
  },
  {
    // id: 15
    recipe_id: 4,
    step_number: 3,
    description: "season the bajeezus out of those potatoey bits"
  },
  {
    // id: 16
    recipe_id: 4,
    step_number: 4,
    description: "cook until cooked, about 100 minutes?"
  },
  {
    // id: 17
    recipe_id: 4,
    step_number: 5,
    description:
      "serve with a whale-bone fork purchased from the most posh online shop available"
  }
];
exports.instructions_data = seed_data;

exports.seed = knex => knex("instructions").insert(seed_data);
