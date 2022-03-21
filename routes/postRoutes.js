const postRoutes = require('express').Router();
const {body} = require('express-validator');
const signUp=require('../routeHandeling/signup/signup')
const validations=require('./validations')

// postRoutes.post('/', postRequests.test)
postRoutes.post('/signup', body('email').custom(validations.emailValidations),signUp)

module.exports = postRoutes