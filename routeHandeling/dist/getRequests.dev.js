"use strict";

var testing = function testing(req, res) {
  res.json({
    message: "I am alive and listening"
  });
};

module.exports = {
  testing: testing
};