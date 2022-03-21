"use strict";

var getIp = require('../../helperFunctions/getIp');

var passwordHC = require('../../helperFunctions/passwordHasherAndChecker');

var tokenMC = require('../../helperFunctions/tokenCheckerAndMaker');

var newUserModel = require('../../mongooseModel/newUserModel');

var newUserSaver = require('../../helperFunctions/newUserSaver');

var tokenSaver = require('../../helperFunctions/tokenSaver');

var mailSender = require('../../helperFunctions/mailSender');

var _require = require('express-validator'),
    validationResult = _require.validationResult;

var signup = function signup(req, res) {
  var body, errors, _req$body, name, email, password, ip, userIp, usersFound, hashedPassword, isNewUserSaved, token, isTokenSaved, url, isSent;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          body = req.body; // FIRST LOG

          console.log('Signup request from ', body.ip, 'with body ', req.body); // Validation is all data recived

          if (!(!body.name || !body.email || !body.password || !body.confirmPassword || !body.ip || body.password !== body.confirmPassword)) {
            _context.next = 6;
            break;
          }

          console.log('Required Data not recieved');
          return _context.abrupt("return", res.status(203).json({
            error: true,
            message: "Please fill the form properly"
          }));

        case 6:
          // VALIDATIONS FROM EXPRESS-CALIDATOR
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 10;
            break;
          }

          console.log('first');
          return _context.abrupt("return", res.status(400).json({
            error: true,
            message: "Please fill the form properly"
          }));

        case 10:
          // DESTRUCT DATAS
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, ip = _req$body.ip; // USER IPS

          userIp = getIp(req.socket.remoteAddress); // IP VALIDATION 

          if (!(userIp.ipv4.split(".").length !== 4 || ip.split(".").length !== 4 || ip !== userIp.ipv4)) {
            _context.next = 15;
            break;
          }

          console.log('TODO INVALID IP');
          return _context.abrupt("return", res.status(400).json({
            error: true,
            message: 'Invalid Ip'
          }));

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(newUserModel.find({
            email: email
          }));

        case 17:
          usersFound = _context.sent;

          if (!(usersFound.length === 0)) {
            _context.next = 43;
            break;
          }

          // HASHING PASSWORD
          hashedPassword = passwordHC.hasher(password, 16); // SAVE NEW USER

          isNewUserSaved = newUserSaver({
            username: name,
            email: email,
            password: hashedPassword,
            accountCreationIp: userIp
          }); // USER SAVED

          if (!isNewUserSaved) {
            _context.next = 40;
            break;
          }

          console.log('User saved', response); // CREATE TOKEN

          token = tokenMC.tokenMaker({
            userIp: userIp,
            id: response._id
          }); // SAVE TOKEN TO DATABASE

          isTokenSaved = tokenSaver({
            tokenName: "new-user-verification",
            userId: response._id,
            token: token,
            ip: userIp
          }); // TOKEN SAVED TO DATABASE

          if (!isTokenSaved) {
            _context.next = 37;
            break;
          }

          // NEW USER VERIFICATION URL
          url = "https://localhost:5000/api/new-user-confirmation?userToken=".concat(token); // SEND TOKEN TO USER THROUGH MAIL

          _context.next = 29;
          return regeneratorRuntime.awrap(mailSender(url, email));

        case 29:
          isSent = _context.sent;

          if (isSent) {
            _context.next = 34;
            break;
          }

          res.status(200).json({
            success: true,
            message: "Please check your mail"
          });
          _context.next = 35;
          break;

        case 34:
          return _context.abrupt("return", res.status(500));

        case 35:
          _context.next = 38;
          break;

        case 37:
          return _context.abrupt("return", res.status(500));

        case 38:
          _context.next = 41;
          break;

        case 40:
          return _context.abrupt("return", res.status(500));

        case 41:
          _context.next = 45;
          break;

        case 43:
          // USER EXISTS ALREADY
          console.log('User Already Exists');
          return _context.abrupt("return", res.status(400).json({
            error: true,
            message: "Please use proper Email Address"
          }));

        case 45:
          _context.next = 50;
          break;

        case 47:
          _context.prev = 47;
          _context.t0 = _context["catch"](0);
          res.status(500);

        case 50:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 47]]);
};

module.exports = signup;