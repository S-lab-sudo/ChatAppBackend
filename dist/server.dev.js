"use strict";

// Frameworks && Library
require('dotenv').config('./');

var express = require('express');

var _require = require('mongoose'),
    mongoose = _require["default"];

var path = require('path');

var https = require('https');

var fs = require('fs'); // User Values


var app = express();
var PORT = process.env.PORT;
var DATABASE = process.env.DATABASEURI;

var doThis = require('./testing'); // ROUTES


var getRoutes = require('./routes/getRoutes');

var postRoutes = require('./routes/postRoutes'); // CREATING SSL SERVER


var sslServer = https.createServer({
  key: fs.readFileSync('./SSLCERT/key.pem'),
  cert: fs.readFileSync('./SSLCERT/cert.pem')
}, app); // Usages of Middlewares

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json()); // API

app.use('/api/get', getRoutes);
app.use('/api/post', postRoutes); // Database Connection

mongoose.connect(DATABASE).then(function () {
  console.log('Database Connected');
  doThis();
})["catch"](function () {
  return "Error occured while connecting to database";
}); // Server Listening

sslServer.listen(PORT, function () {
  return console.log("Listening on port ".concat(PORT));
});