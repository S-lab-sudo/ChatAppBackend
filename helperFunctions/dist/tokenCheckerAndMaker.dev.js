"use strict";

require('dotenv').config({
  path: '../.env'
});

var jwt = require('jsonwebtoken');

var fs = require('fs');

var secretKey = fs.readFileSync(__dirname + '/../jwtRS256.key');

var tokenMaker = function tokenMaker(data) {
  return jwt.sign(data, secretKey, {
    expiresIn: 60 * 60
  });
};

var tokenChecker = function tokenChecker(token) {
  return jwt.verify(token, secretKey) ? true : false;
};

module.exports = {
  tokenMaker: tokenMaker,
  tokenChecker: tokenChecker
};