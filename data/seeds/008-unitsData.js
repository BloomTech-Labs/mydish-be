
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('units').del()
    .then(function () {
      // Inserts seed entries
      return knex('units').insert([
        {name: 'tsp'},
        {name: 'tbsp'},
        {name: 'cup'},
        {name: 'g'},
        {name: 'oz'},
        {name: 'pinch'},
        {name: 'L'},
        {name: 'mL'},
        {name: 'can'},
        {name: 'package'}
      ]);
    });
};
