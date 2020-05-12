module.exports = (tbl) => {
  tbl.increments("id");
  tbl.text("name", 24).unique().notNullable();
};
