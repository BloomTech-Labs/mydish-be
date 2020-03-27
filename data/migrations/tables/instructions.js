module.exports = tbl => {
  tbl.increments("id");
  tbl
    .integer("recipe_id")
    .references("id")
    .inTable("recipes")
    .onUpdate("CASCADE")
    .onDelete("CASCADE")
    .notNullable();
  tbl.integer("step_number");
  tbl.text("description");
};
