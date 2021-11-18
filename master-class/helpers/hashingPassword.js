const bcrypt = require("bcryptjs");
function hashingPassword(value) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(value, salt);

  value = hash;
  return value;
}

module.exports = hashingPassword;
