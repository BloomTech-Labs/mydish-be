const db = require("../../data/dbConfig");
/** 
 * checks params against the database, 
 * then returns the matching revision.
 * @param  {Number} recipe_id
 * @param  {Number} revision_num
 
 */
const get_version_by_num = (recipe_id, revision_num) => {
  return db("previous_versions as pv")
    .where({"pv.recipe_id": recipe_id})
    .andWhere({"pv.revision_number": revision_num})
    .join("recipes as r", {"r.id": "pv.recipe_id"})
    .join("users as u", {"u.id": "r.owner_id"})
    .select(
      "pv.id",
      "pv.recipe_id",
      "pv.changes",
      "pv.revision_number",
      "pv.created_at as date_modified",
      db.raw(
        `json_build_object('user_id', r.owner_id, 'username', u.username) as owner`,
      ),
    )
    .first();
};

/**
 * checks params against the database,
 * then returns the matching revision.
 * @param  {Number} recipe_id
 * @param  {Number} revision_id
 */
const get_version_by_id = (recipe_id, revision_id) => {
  return db("previous_versions as pv")
    .where({"pv.recipe_id": recipe_id})
    .andWhere({"pv.id": revision_id})
    .join("recipes as r", {"r.id": "pv.recipe_id"})
    .join("users as u", {"u.id": "r.owner_id"})
    .select(
      "pv.id",
      "pv.recipe_id",
      "pv.changes",
      "pv.revision_number",
      "pv.created_at as date_modified",
      db.raw(
        `json_build_object('user_id', r.owner_id, 'username', u.username) as owner`,
      ),
    )
    .first();
};

/**
 *
 * grabs all revisions for a specified recipe.
 * @param {Number} recipe_id
 */

const get_all_versions = recipe_id => {
  return db("previous_versions as pv")
    .where({"pv.recipe_id": recipe_id})
    .join("recipes as r", {"r.id": "pv.recipe_id"})
    .join("users as u", {"u.id": "r.owner_id"})
    .select(
      "pv.id",
      "pv.recipe_id",
      "pv.changes",
      "pv.revision_number",
      "pv.created_at as date_modified",
      db.raw(
        `json_build_object('user_id', r.owner_id, 'username', u.username) as owner`,
      ),
    );
};

module.exports = {
  get_version_by_num,
  get_version_by_id,
  get_all_versions,
};
