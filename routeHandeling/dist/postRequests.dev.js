"use strict";

var signup = require('./signup/signup');

var test = function test(req, res) {
  res.send(req.body);
};

var signUp = signup;
module.exports = {
  test: test,
  signUp: signUp
};