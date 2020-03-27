module.exports = tbl => {
  tbl.increments("id");
  tbl
    .integer("recipe_id")
    .references("id")
    .inTable("recipes")
    .onUpdate("CASCADE")
    .onDelete("CASCADE")
    .notNullable();
  tbl
    .integer("tag_id")
    .references("id")
    .inTable("tags")
    .onUpdate("CASCADE")
    .onDelete("CASCADE")
    .notNullable();
};
