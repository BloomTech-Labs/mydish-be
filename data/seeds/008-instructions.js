const seed_data = [
  {recipe_id: 1, step_number: 1, description: "take eggplant"}, // id: 1
  {recipe_id: 1, step_number: 2, description: "cook eggplant"}, // id: 2
  {recipe_id: 1, step_number: 3, description: "eat eggplant"}, // id: 3
  {
    // id: 4
    recipe_id: 2,
    step_number: 1,
    description: "pour your crunchy people food into a bowl",
  },
  {
    // id: 5
    recipe_id: 2,
    step_number: 2,
    description:
      "smother your crunchy people food with processed cows lacrimal essence",
  },
  {
    // id: 6
    recipe_id: 2,
    step_number: 3,
    description:
      "shovel your milky people food into your mouth in easy to manage bite-sized spoonfuls",
  },
  {
    // id: 7
    recipe_id: 3,
    step_number: 1,
    description: "Heat a pot of water over the stove until it's about to boil",
  },
  {
    // id: 8
    recipe_id: 3,
    step_number: 2,
    description:
      "add in your egg while the water is hot, but don't let it boil or else your egg could pop",
  },
  {
    // id: 9
    recipe_id: 3,
    step_number: 3,
    description: "Turn the heat down and let that egg sit for about 15 minutes",
  },
  {
    // id: 10
    recipe_id: 3,
    step_number: 4,
    description:
      "Pour out the hot water and replace with cold. Let's cool our egg down",
  },
  {
    // id: 11
    recipe_id: 3,
    step_number: 5,
    description: "Peel the eggy boi so you don't munch down on its shell",
  },
  {
    // id: 12
    recipe_id: 3,
    step_number: 6,
    description: "serve fresh or chilled with a little salt and/or pepper",
  },
  {
    // id: 13
    recipe_id: 4,
    step_number: 1,
    description: "aquire potatoes and section them in to manageable bits",
  },
  {
    // id: 14
    recipe_id: 4,
    step_number: 2,
    description:
      "throw those bits in a metal thingy that gets hot on a larger metal thingy",
  },
  {
    // id: 15
    recipe_id: 4,
    step_number: 3,
    description: "season the bajeezus out of those potatoey bits",
  },
  {
    // id: 16
    recipe_id: 4,
    step_number: 4,
    description: "cook until cooked, about 100 minutes?",
  },
  {
    // id: 17
    recipe_id: 4,
    step_number: 5,
    description:
      "serve with a whale-bone fork purchased from the most posh online shop available",
  },
];
exports.instructions_data = seed_data;

exports.seed = knex => knex("instructions").insert(seed_data);
