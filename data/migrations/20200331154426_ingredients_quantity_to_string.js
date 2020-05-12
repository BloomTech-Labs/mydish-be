exports.up = function (knex) {
  return knex.raw(
    "ALTER TABLE recipe_ingredients ALTER COLUMN quantity TYPE text",
  );
};

exports.down = function (knex) {
  return knex.raw(
    "ALTER TABLE recipe_ingredients ALTER COLUMN quantity TYPE real USING quantity::real",
  );
};
