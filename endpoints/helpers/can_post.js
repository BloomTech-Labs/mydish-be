const db = require("../../data/dbConfig");
const schema = require("./schema");

unique_query_builder = async (table, array, unique_fields) => {
  let query = "";
  array.forEach((item) => {
    unique_fields.forEach((field) => {
      if (query) query += " or ";
      if (item[field]) query += `${field} = '${item[field]}'`;
    });
  });
  return query;
};

/**
 * Takes an array of objects to be posted and checks if they can be posted.
 * Determines if all required fields for each item is provided
 * Determines if all unique fields are remarkable
 * If problems are found, an array of each problem object including what is wrong with the object is also provided.
 * Returns a boolean indicating if everything can be posted or not.
 *
 * @param {string}              table - Name of table you want a list of unique fields form.
 * @param {array}               array - An array of objects you want to post to the given table.
 */
module.exports = async (table, array = []) => {
  const required_keys = await schema.required(table);
  const unique_fields = await schema.unique(table);

  //takes given array and checks if any fields are unremarkable
  const check_uniques_query = await unique_query_builder(
    table,
    array,
    unique_fields,
  );
  const unremarkable = await db(table).whereRaw(check_uniques_query);

  array = array.filter((item) => {
    //checks if all require fields are provided
    //if not adds an array of missing fields to the object
    required_keys.forEach((key) => {
      if (!item.hasOwnProperty(key) && !item.hasOwnProperty("missing_fields"))
        item["missing_fields"] = [key];
      else if (!item.hasOwnProperty(key)) item.missing_fields.push(key);
    });
    //for each unremarkable item add an array of objects indicating which fields and values are unremarkable
    unremarkable.forEach((nu_item) => {
      unique_fields.forEach((field) => {
        if (
          nu_item[field] == item[field] &&
          !item.hasOwnProperty("unremarkable_fields")
        )
          item["unremarkable_fields"] = [{[field]: item[field]}];
        else if (nu_item[field] == item[field])
          item.unremarkable_fields[field] = item[field];
      });
    });
    return item.missing_fields || item.unremarkable_fields;
  });
  console.log("made it here 1");
  if (array) return {can_post: false, errors: array};
  else return {can_post: true};
};
