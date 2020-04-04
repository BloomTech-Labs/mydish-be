const seed_data = [
  //volume
  {name: "whole"}, // id: 1,
  {name: "teaspoon"}, // id: 2,
  {name: "tablespoon"}, // id: 3,
  {name: "fluid ounce"}, // id: 4,
  {name: "gill"}, // id: 5,
  {name: "cup"}, // id: 6,
  {name: "pint"}, // id: 7,
  {name: "quart"}, // id: 8,
  {name: "gallon"}, // id: 9,
  {name: "milliliter"}, // id: 10,
  {name: "liter"}, // id: 11,
  {name: "deciliter"}, // id: 12,
  //weight
  {name: "pound"}, // id: 13,
  {name: "ounce"}, // id: 14,
  {name: "milligram"}, // id: 15,
  {name: "gram"}, // id: 16,
  {name: "kilogram"}, // id: 17,
  //length
  {name: "millimeter"}, // id: 18,
  {name: "centimeter"}, // id: 19,
  {name: "meter"}, // id: 20,
  {name: "inch"}, // id: 21,

  {name: "pinch"}, // id: 22,
  {name: "package"}, // id: 23,
  {name: "can"}, // id: 23,
];
// So we can import seed_data for testing
exports.units_data = seed_data;

exports.seed = knex => knex("units").insert(seed_data);
