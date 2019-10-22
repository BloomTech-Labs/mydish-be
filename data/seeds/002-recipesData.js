
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {title: 'Eggplant', minutes: 15 , notes: 'when i was a young boy my father took me into the city to see a marching band...', image: 'ones and zeros'},
        {title: 'Cereal', minutes: 45 , notes: 'Cereal is one the most delicate and complex recipes known throughout the history of mankind...', image: 'ones and zeros'},
        {title: 'Scrambled Eggs', minutes: 2 , notes: 'if you are a human, then the only proper way to consume scrambled eggs is with ketchup', image: 'ones and zeros'},
        {title: 'Home Fries', minutes: 20, notes: 'so many useless notes.', image: 'ones and zeros'}
      ]);
    });
};
