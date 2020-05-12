module.exports = (tbl) => {
  tbl.increments("id");
  tbl.text("name").notNullable();
  tbl.text("category");
};
