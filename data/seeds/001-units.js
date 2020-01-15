const seed_data = [
  //volume
  {name: 'teaspoon', abbreviation: 'tsp', type: 'volume'},
  {name: 'tablespoon', abbreviation: 'tbs', type: 'volume'},
  {name: 'fluid ounce', abbreviation: 'floz', type: 'volume'},
  {name: 'gill', type: 'volume'},
  {name: 'cup', abbreviation: 'c', type: 'volume'},
  {name: 'pint', abbreviation: 'pt', type: 'volume'},
  {name: 'quart', abbreviation: 'qt', type: 'volume'},
  {name: 'gallon', abbreviation: 'gal', type: 'volume'},
  {name: 'milliliter', abbreviation: 'ml', type: 'volume'},
  {name: 'liter', abbreviation: 'l', type: 'volume'},
  {name: 'deciliter', abbreviation: 'dl', type: 'volume'},
  //weight
  {name: 'pound', abbreviation: 'lb', type: 'weight'},
  {name: 'ounce', abbreviation: 'oz', type: 'weight'},
  {name: 'miligram', abbreviation: 'mg', type: 'weight'},
  {name: 'gram', abbreviation: 'g', type: 'weight'},
  {name: 'kilogram', abbreviation: 'kg', type: 'weight'},
  //length
  {name: 'millimeter', abbreviation: 'mm', type: 'length'},
  {name: 'centimeter', abbreviation: 'cm', type: 'length'},
  {name: 'meter', abbreviation: 'm', type: 'length'},
  {name: 'inch', abbreviation: 'in', type: 'length'},
]
// So we can import seed_data for testing
exports.units_data = seed_data;

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('units').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('units').insert(seed_data);
    });
};
