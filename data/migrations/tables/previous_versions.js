module.exports = tbl => {
  tbl.increments("id");
  tbl
    .integer("recipe_id")
    .references("id")
    .inTable("recipes")
    .onUpdate("CASCADE")
    .onDelete("CASCADE")
    .notNullable();
  tbl.json("changes");
  tbl.datetime("date_modified").defaultTo(new Date().toISOString());
  tbl.integer("revision_number").notNullable();
};
