"use strict";

var newUserModel = require('../mongooseModel/newUserModel');

var findUser = function findUser(objectData) {
  return newUserModel.find(objectData).then(function (res) {
    return res;
  })["catch"](function (err) {
    return false;
  });
};

module.exports = findUser;