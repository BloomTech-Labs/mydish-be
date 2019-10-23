const db = require("./dbConfig.js");

module.exports = {
  insert,
  findByUsername,
  findById,
  all
};

function insert(cook) {
  return db("cooks")
    .insert(cook, "id")
    .then(([id]) => {
      console.log("id in database", id);
      return findById(id);
    });
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
