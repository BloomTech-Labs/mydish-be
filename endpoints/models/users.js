const db = require("../../data/dbConfig");

add_one = async obj => {
  return await db.transaction(async trx => {
    try {
      const return_user = await trx("users")
        .insert(obj)
        .returning("*");
      const user_roles_entry = {
        user_id: return_user[0].id,
        role_id: 1
      };
      await trx("user_roles").insert(user_roles_entry);
      return return_user[0];
    } catch (err) {
      throw err;
    }
  });
};

get_by_id = id =>
  db("users")
    .where("users.id", id)
    .join("user_roles as ur", "users.id", "=", "ur.user_id")
    .join("roles", "ur.role_id", "=", "roles.id")
    .select(
      "users.id",
      "users.username",
      "users.password",
      db.raw(`json_agg(roles.name) as roles`)
    )
    .groupBy("users.id", "users.username", "users.password")
    .first();

get_one = async search_params =>
  await db("users")
    .where(search_params)
    .join("user_roles as ur", "users.id", "=", "ur.user_id")
    .join("roles", "ur.role_id", "=", "roles.id")
    .select(
      "users.id",
      "users.username",
      "users.password",
      db.raw(`json_agg(roles.name) as roles`)
    )
    .groupBy("users.id", "users.username", "users.password")
    .first();

get_all = async (search_params = {}) => await db("users").where(search_params);

update_one = async (id, obj) =>
  (
    await db("users")
      .where({ id })
      .update(obj)
      .returning("*")
  )[0];

remove_one = async id =>
  (
    await db("users")
      .where({ id })
      .delete()
      .returning("*")
  )[0];

remove_all = async () => await db("users").delete();

module.exports = {
  add_one,
  get_one,
  get_by_id,
  get_all,
  update_one,
  remove_one,
  remove_all
};
