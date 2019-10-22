const bcrypt = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cooks').del()
    .then(function () {
      // Inserts seed entries
      return knex('cooks').insert([
        {username: 'Catherine', password: `${bcrypt.hashSync('testpassword', 8)}`}, 
        {username: 'Lou', password: `${bcrypt.hashSync('testpassword2', 8)}`},
        {username: 'Yurika', password: `${bcrypt.hashSync('testpassword3', 8)}`}
      ]);
    });
};
