const crypt = require("bcryptjs");
const password_strength = require("../../config/settings").password_strength;

password = password => crypt.hashSync(password, password_strength);

module.exports = {
  password,
};
