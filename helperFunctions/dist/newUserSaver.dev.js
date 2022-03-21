"use strict";

var newUserModel = require("../mongooseModel/newUserModel");

var newUserSaver = function newUserSaver(data) {
  var saver = new newUserModel(data);
  return saver.save().then(function (response) {
    return response;
  })["catch"](function () {
    return false;
  });
};

module.exports = newUserSaver;