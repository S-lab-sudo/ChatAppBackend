"use strict";

var postRoutes = require('express').Router();

var _require = require('express-validator'),
    body = _require.body;

var signUp = require('../routeHandeling/signup/signup');

var validations = require('./validations'); // postRoutes.post('/', postRequests.test)


postRoutes.post('/signup', body('email').custom(validations.emailValidations), signUp);
module.exports = postRoutes;