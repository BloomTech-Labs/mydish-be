const seed_data = [
  //volume
  {id: 1, name: 'whole', type: 'volume'},
  {id: 2, name: 'teaspoon', abbreviation: 'tsp', type: 'volume'},
  {id: 3, name: 'tablespoon', abbreviation: 'tbs', type: 'volume'},
  {id: 4, name: 'fluid ounce', abbreviation: 'floz', type: 'volume'},
  {id: 5, name: 'gill', type: 'volume'},
  {id: 6, name: 'cup', abbreviation: 'c', type: 'volume'},
  {id: 7, name: 'pint', abbreviation: 'pt', type: 'volume'},
  {id: 8, name: 'quart', abbreviation: 'qt', type: 'volume'},
  {id: 9, name: 'gallon', abbreviation: 'gal', type: 'volume'},
  {id: 10, name: 'milliliter', abbreviation: 'ml', type: 'volume'},
  {id: 11, name: 'liter', abbreviation: 'l', type: 'volume'},
  {id: 12, name: 'deciliter', abbreviation: 'dl', type: 'volume'},
  //weight
  {id: 13, name: 'pound', abbreviation: 'lb', type: 'weight'},
  {id: 14, name: 'ounce', abbreviation: 'oz', type: 'weight'},
  {id: 15, name: 'miligram', abbreviation: 'mg', type: 'weight'},
  {id: 16, name: 'gram', abbreviation: 'g', type: 'weight'},
  {id: 17, name: 'kilogram', abbreviation: 'kg', type: 'weight'},
  //length
  {id: 18, name: 'millimeter', abbreviation: 'mm', type: 'length'},
  {id: 19, name: 'centimeter', abbreviation: 'cm', type: 'length'},
  {id: 20, name: 'meter', abbreviation: 'm', type: 'length'},
  {id: 21, name: 'inch', abbreviation: 'in', type: 'length'},
]
// So we can import seed_data for testing
exports.units_data = seed_data;

exports.seed = knex => knex('units').insert(seed_data);
