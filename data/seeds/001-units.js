const seed_data = [
  //volume
  { name: "whole", type: "volume" }, // id: 1,
  { name: "teaspoon", abbreviation: "tsp", type: "volume" }, // id: 2,
  { name: "tablespoon", abbreviation: "tbsp", type: "volume" }, // id: 3,
  { name: "fluid ounce", abbreviation: "floz", type: "volume" }, // id: 4,
  { name: "gill", type: "volume" }, // id: 5,
  { name: "cup", abbreviation: "c", type: "volume" }, // id: 6,
  { name: "pint", abbreviation: "pt", type: "volume" }, // id: 7,
  { name: "quart", abbreviation: "qt", type: "volume" }, // id: 8,
  { name: "gallon", abbreviation: "gal", type: "volume" }, // id: 9,
  { name: "milliliter", abbreviation: "mL", type: "volume" }, // id: 10,
  { name: "liter", abbreviation: "L", type: "volume" }, // id: 11,
  { name: "deciliter", abbreviation: "dL", type: "volume" }, // id: 12,
  //weight
  { name: "pound", abbreviation: "lbs", type: "weight" }, // id: 13,
  { name: "ounce", abbreviation: "oz", type: "weight" }, // id: 14,
  { name: "milligram", abbreviation: "mg", type: "weight" }, // id: 15,
  { name: "gram", abbreviation: "g", type: "weight" }, // id: 16,
  { name: "kilogram", abbreviation: "kg", type: "weight" }, // id: 17,
  //length
  { name: "millimeter", abbreviation: "mm", type: "length" }, // id: 18,
  { name: "centimeter", abbreviation: "cm", type: "length" }, // id: 19,
  { name: "meter", abbreviation: "m", type: "length" }, // id: 20,
  { name: "inch", abbreviation: "in", type: "length" }, // id: 21,

  { name: "pinch", type: "volume" }, // id: 22,
  { name: "package", abbreviation: "pkg", type: "volume" }, // id: 23,
  { name: "can", type: "volume" } // id: 23,
];
// So we can import seed_data for testing
exports.units_data = seed_data;

exports.seed = knex => knex("units").insert(seed_data);
