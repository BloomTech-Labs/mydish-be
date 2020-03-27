const seed_data = [
  {name: "user"}, // id: 1,
  {name: "admin"}, // id: 2,
];
// So we can import seed_data for testing
exports.roles_data = seed_data;

exports.seed = knex => knex("roles").insert(seed_data);
