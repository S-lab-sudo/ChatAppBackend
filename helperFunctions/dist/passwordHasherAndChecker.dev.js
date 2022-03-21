"use strict";

var bcrypt = require('bcrypt');

var hasher = function hasher(password, salt) {
  return bcrypt.hashSync(password, salt);
};

var checker = function checker(password, DBpassword) {
  return bcrypt.compareSync(password, DBpassword);
};

module.exports = {
  hasher: hasher,
  checker: checker
};