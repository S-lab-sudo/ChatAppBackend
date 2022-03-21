"use strict";

var getTesting = function getTesting(req, res) {
  res.json({
    message: "I am alive and listening"
  });
};

module.exports = getTesting;