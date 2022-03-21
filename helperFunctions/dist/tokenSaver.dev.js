"use strict";

var tokenModel = require('../mongooseModel/tokenModel');

var tokenSaver = function tokenSaver(data) {
  var saver = new tokenModel(data);
  return saver.save().then(function () {
    return true;
  })["catch"](function () {
    return false;
  });
};

module.exports = tokenSaver;