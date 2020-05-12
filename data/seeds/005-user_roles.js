const seed_data = [
  {user_id: 1, role_id: 1},
  {user_id: 2, role_id: 1},
  {user_id: 3, role_id: 1},
  {user_id: 4, role_id: 1},
  {user_id: 4, role_id: 2},
];
// So we can import seed_data for testing
exports.user_roles_data = seed_data;

exports.seed = (knex) => knex("user_roles").insert(seed_data);
