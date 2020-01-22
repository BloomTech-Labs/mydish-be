const db = require("../../data/dbConfig");
/** 
 * @param  {Number} recipe_id
 * @param  {Number} revision_num
 * checks params against the database, 
 * then returns the matching revision.
 
 */
const get_version_by_num = (recipe_id, revision_num) => {
  return db("previous_versions")
    .where({ recipe_id })
    .andWhere({ revision_number: revision_num })
    .first();
};

/**
 * @param  {Number} recipe_id
 * @param  {Number} revision_id
 * checks params against the database,
 * then returns the matching revision.
 */
const get_version_by_id = (recipe_id, revision_id) => {
  return db("previous_versions")
    .where({ id: revision_id })
    .andWhere({ recipe_id })
    .first();
};

/**
 *
 * @param {Number} recipe_id
 * grabs all revisions for a specified recipe.
 */

const get_all_versions = recipe_id => {
  return db("previous_versions").where({ recipe_id });
};

module.exports = {
  get_version_by_num,
  get_version_by_id,
  get_all_versions
};
