"use strict";

// ROUTER
var getRoutes = require('express').Router();

var testing = require('../routeHandeling/getTesting'); // GET


getRoutes.get('/', testing);
module.exports = getRoutes;