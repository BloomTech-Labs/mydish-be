module.exports = (tbl) => {
  tbl.increments("id");
  tbl.text("name").notNullable();
  tbl.text("type").notNullable();
  tbl.text("abbreviation", 4);
};
