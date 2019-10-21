
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cooks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cooks').insert([
        {username: 'Catherine', password: 'testPassword'},
        {username: 'Lou', password: 'testPassword2'},
        {username: 'Yurika', password: 'testPassword3'}
      ]);
    });
};
