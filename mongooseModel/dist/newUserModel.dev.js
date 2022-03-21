"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    "default": false
  },
  accountCreationDate: {
    type: Date,
    "default": new Date()
  },
  accountCreationIp: {
    type: Object,
    required: true
  },
  banned: {
    type: Boolean,
    "default": false
  }
});
var newUserModel = mongoose.model("new-user", Schema);
module.exports = newUserModel;