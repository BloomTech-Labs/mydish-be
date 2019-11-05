exports.up = function (knex) {
  return (
    knex.schema
      //creates recipes table and necessary columns
      .createTable("recipes", tbl => {
        tbl.increments("id");
        tbl
          .text("title")
          .notNullable();
        tbl.integer("minutes");
        tbl.text("notes");
        tbl.text("img");
      })
      //creates steps table also referrencing the recipe id as a foreign key
      .createTable("steps", tbl => {
        tbl
          .integer("recipe_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("recipes")
          .onDelete("cascade");
        tbl.decimal("ordinal").notNullable();
        tbl.primary(["ordinal", "recipe_id"]);
        tbl.text("body").notNullable();
      })
      //creates a catagories table, each category can reference multiple recipe IDs as foreign keys
      .createTable("categories", tbl => {
        tbl
          .integer("recipe_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("recipes")
          .onDelete("cascade");
        tbl.text("name").notNullable();
        tbl.primary(["name", "recipe_id"]);
      })
      //cooks table is basically a user table
      .createTable("cooks", tbl => {
        tbl.increments("id");
        tbl
          .text("username")
          .unique()
          .notNullable();
        tbl.text("password").notNullable();
      })
      //edits table for later functionality, will be used to track edits in future migrations
      .createTable("edits", tbl => {
        tbl.increments("id");
        tbl
          .integer("old_recipe")
          .unsigned()
          .references("id")
          .inTable("recipes")
          .onDelete("cascade");
        tbl
          .integer("new_recipe")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("recipes")
          .onDelete("cascade");
        tbl
          .integer("cook_id")
          .references("id")
          .inTable("cooks")
          .notNullable()
          .onDelete("set null");
      })
      //likes table to track which user has liked which recipes
      .createTable("likes", tbl => {
        tbl
          .integer("cook_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("cooks")
          .onDelete("cascade");
        tbl
          .integer("recipe_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("recipes")
          .onDelete("cascade");
      })
      //saves table to track which recipes are saved to which user's cookbook
      .createTable("saves", tbl => {
        tbl
          .integer("cook_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("cooks")
          .onDelete("cascade");
        tbl
          .integer("recipe_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("recipes")
          .onDelete("cascade");
        tbl.primary(["cook_id", "recipe_id"]);
      })
      //unit table.
      .createTable("units", tbl => {
        tbl.increments("id");
        tbl.text("name").unique();
      })
      //creates ingredients table referrencing the recipe id as a foreign key
      .createTable("ingredients", tbl => {
        tbl
          .integer("recipe_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("recipes")
          .onDelete("cascade");
        tbl.text("name").notNullable();
        tbl.primary(["recipe_id", "name"]);
        tbl
          .text("unit")
          .unsigned()
          .references("name")
          .inTable("units")
          .onDelete("set null");
        tbl.float("quantity");
      })
  );
};

//for dropping all tables
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("ingredients")
    .dropTableIfExists("units")
    .dropTableIfExists("saves")
    .dropTableIfExists("likes")
    .dropTableIfExists("edits")
    .dropTableIfExists("cooks")
    .dropTableIfExists("categories")
    .dropTableIfExists("steps")
    .dropTableIfExists("recipes");
};
