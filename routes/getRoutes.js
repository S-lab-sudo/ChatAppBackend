// ROUTER
const getRoutes=require('express').Router()

const testing=require('../routeHandeling/getTesting')

// GET
getRoutes.get('/',testing)


module.exports=getRoutes