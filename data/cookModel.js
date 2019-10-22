const db = require("./dbConfig.js");

module.exports = {
  insert,
  findByUsername
};

function insert(cook) {
  return db("cooks")
    .insert(cook, "id")
    .then(([id]) => findBy(id));
}

function findBy(where) {
  return db("cooks").where(where);
}

function findByUsername(username) {
  return findBy({ username }).first();
}
