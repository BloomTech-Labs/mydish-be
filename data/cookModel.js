const db = require('./dbConfig.js');

module.exports = {
  insert,
  findByUsername,
  findById,
  all,
  remove,
  update
};

function insert(cook) {
  return db('cooks')
    .insert(cook, 'id')
    .then(([id]) => {
      return findById(id);
    });
}

function findBy(where) {
  return db('cooks').where(where);
}
function all() {
  return db('cooks');
}

function findById(id) {
  return findBy({ id }).first();
}

function findByUsername(username) {
  console.log('I am in cook model', username);
  return findBy({ username }).first();
}

function remove(id) {
  return findBy({ id }).del();
}

function update(id, changes) {
  return findBy({ id }).update(changes);
}
