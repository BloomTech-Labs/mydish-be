exports.up = function(knex) {
  return knex.schema.table("units", tbl => {
    tbl.dropColumns("type", "abbreviation");
  });
};

exports.down = function(knex) {
  return knex.schema.table("units", tbl => {
    tbl.text("type");
    tbl.text("abbreviation");
  });
};
