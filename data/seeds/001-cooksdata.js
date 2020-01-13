const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("cooks").insert([
    {
      username: "Catherine",
      password: `${bcrypt.hashSync("testpassword", 8)}`
    },
    { username: "Lou", password: `${bcrypt.hashSync("testpassword2", 8)}` },
    {
      username: "Yurika",
      password: `${bcrypt.hashSync("testpassword3", 8)}`
    }
  ]);
};
