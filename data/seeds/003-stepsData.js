exports.seed = function(knex) {
  return knex("steps").insert([
    { recipe_id: 1, ordinal: 1, body: "take eggplant" },
    { recipe_id: 1, ordinal: 2, body: "cook eggplant" },
    { recipe_id: 1, ordinal: 3, body: "eat eggplant" },
    {
      recipe_id: 2,
      ordinal: 1,
      body: "pour your crunchy people food into a bowl"
    },
    {
      recipe_id: 2,
      ordinal: 2,
      body:
        "smother your crunchy people food with processed cows lacrimal essence"
    },
    {
      recipe_id: 2,
      ordinal: 3,
      body:
        "shovel your milky people food into your mouth in easy to manage bite-sized spoonfuls"
    },
    { recipe_id: 3, ordinal: 1, body: "get egg and crack into a bowl" },
    {
      recipe_id: 3,
      ordinal: 2,
      body:
        "add small amount of milk and whisk the ever-loving devil out of those eggs"
    },
    {
      recipe_id: 3,
      ordinal: 3,
      body: "pour milky egg mixture into a well greased sizzly hot pan"
    },
    {
      recipe_id: 3,
      ordinal: 4,
      body: "stir with rubber spatula whilst the eggs solidify"
    },
    {
      recipe_id: 3,
      ordinal: 5,
      body: "cheese those eggy bois, if you are so inclined."
    },
    {
      recipe_id: 3,
      ordinal: 6,
      body: "serve while they're still hot or you will end up hating yourself"
    },
    {
      recipe_id: 4,
      ordinal: 1,
      body: "aquire potatoes and section them in to manageable bits"
    },
    {
      recipe_id: 4,
      ordinal: 2,
      body:
        "throw those bits in a metal thingy that gets hot on a larger metal thingy"
    },
    {
      recipe_id: 4,
      ordinal: 3,
      body: "season the bajeezus out of those potatoey bits"
    },
    {
      recipe_id: 4,
      ordinal: 4,
      body: "cook until cooked, about 100 minutes?"
    },
    {
      recipe_id: 4,
      ordinal: 5,
      body:
        "serve with a whale-bone fork purchased from the most posh online shop available"
    }
  ]);
};
