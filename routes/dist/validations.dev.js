"use strict";

var getIp = require('../helperFunctions/getIp'); // Email Validation


var emailValidations = function emailValidations(req, res, next) {
  var body = req.body;

  if (!body.email) {
    console.log('TODO DIDNOT GOT EMAIL');
    return res.status(403).json({
      error: true,
      message: 'No Email'
    });
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    console.log('TODO INVALID EMAIL ADDRESS');
    return res.status(403).json({
      error: true,
      message: 'Invalid Email'
    });
  } // SQL INJECTION


  if (email.includes('$') || email.includes("\"") || email.includes("'")) {
    console.log('TODO SPECIAL CHARACTERS IN EMAIL ADDRESS'); // TODO BLOCK THIS IP

    return res.status(403).json({
      error: true,
      message: 'Na NA'
    });
  }

  next();
}; // IP VALIDATION 


var ipValidation = function ipValidation(req, res, next) {
  var body = req.body;

  if (!body.ip) {
    return res.status(403).json({
      error: true,
      message: 'No Ip'
    });
  }

  var ip = body.ip;
  var userIp = getIp(ip);

  if (userIp.ipv4.split(".").length !== 4 || ip.split(".").length !== 4 || ip !== userIp.ipv4) {
    console.log('TODO INVALID IP');
    return res.status(400).json({
      error: true,
      message: 'Invalid Ip'
    });
  }

  next();
};

module.exports = {
  emailValidations: emailValidations,
  ipValidation: ipValidation
};