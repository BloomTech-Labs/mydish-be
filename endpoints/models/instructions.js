const db = require("../../data/dbConfig");

add_one = async obj =>
  (
    await db("instructions")
      .insert(obj)
      .returning("*")
  )[0];

get_one = async search_params =>
  await db("instructions")
    .where(search_params)
    .first();

get_all = async (search_params = {}) =>
  await db("instructions").where(search_params);

update_one = async (id, obj) =>
  (
    await db("instructions")
      .where({id})
      .update(obj)
      .returning("*")
  )[0];

remove_one = async id =>
  (
    await db("instructions")
      .where({id})
      .delete()
      .returning("*")
  )[0];

remove_all = async () => await db("instructions").delete();

module.exports = {
  add_one,
  get_one,
  get_all,
  update_one,
  remove_one,
  remove_all,
};
