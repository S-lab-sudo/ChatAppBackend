"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  tokenName: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  ip: {
    type: Object,
    required: true
  }
});
var tokenModel = mongoose.model("tokens", Schema);
module.exports = tokenModel;