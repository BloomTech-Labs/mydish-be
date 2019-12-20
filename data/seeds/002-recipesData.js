
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {title: 'Eggplant', img: 'https://image.shutterstock.com/image-photo/grilled-eggplants-seasoned-olive-oil-260nw-87708241.jpg', desc: 'when i was a young boy my father took me into the city to see a marching band...'},
        {title: 'Cereal', img: 'https://image.shutterstock.com/z/stock-photo-cornflakes-with-milk-in-the-white-bowl-322906217.jpg', desc: 'Cereal is one the most delicate and complex recipes known throughout the history of mankind...'},
        {title: 'Scrambled Eggs', img: 'https://image.shutterstock.com/image-photo/mexican-food-recipes-revoltillo-de-600w-752977636.jpg', desc: 'if you are a human, then the only proper way to consume scrambled eggs is with ketchup'},
        {title: 'Home Fries', img: 'https://image.shutterstock.com/z/stock-photo-fried-potatoes-147539354.jpg', desc: 'so many useless notes.'}
      ]);
    });
};
//save