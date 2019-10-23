const db = require("./dbConfig.js");

module.exports = {
  insert,
  findByUsername,
  findBy,
  findById,
  all
};

function insert(cook) {
  return db("cooks").insert(cook, "id");
}

function findBy(where) {
  return db("cooks").where(where);
}
function all() {
  return db("cooks");
}

function findById(id) {
  return findBy({ id }).first();
}

function findByUsername(username) {
  return findBy({ username }).first();
}
