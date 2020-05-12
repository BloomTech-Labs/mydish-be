const seed_data = [];
exports.previous_versions_data = seed_data;

exports.seed = (knex) => knex("previous_versions").insert(seed_data);
