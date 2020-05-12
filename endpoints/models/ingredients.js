const db = require("../../data/dbConfig");

add_array = (arr) => db("ingredients").insert(arr).returning("*");

add_one = (obj) => db("ingredients").insert(obj).returning("*")[0];

get_one = (search_params) => db("ingredients").where(search_params).first();

get_all = (search_params = {}) => db("ingredients").where(search_params);

update_one = (id, obj) =>
  db("ingredients").where({id}).update(obj).returning("*")[0];

remove_one = (id) => db("ingredients").where({id}).delete().returning("*")[0];

remove_all = () => db("ingredients").delete();

module.exports = {
  add_one,
  add_array,
  get_one,
  get_all,
  update_one,
  remove_one,
  remove_all,
};
