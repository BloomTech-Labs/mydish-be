const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'Catherine',
          password: `${bcrypt.hashSync('testpassword', 8)}`
        },
        { username: 'Lou', password: `${bcrypt.hashSync('testpassword2', 8)}` },
        {
          username: 'Yurika',
          password: `${bcrypt.hashSync('testpassword3', 8)}`
        }
      ]);
    });
};
//save