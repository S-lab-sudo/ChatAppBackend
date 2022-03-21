"use strict";

var getIp = require('../../helperFunctions/getIp');

var findUSer = require('../../helperFunctions/findUser');

var Login = function Login(req, res) {
  var body, userIp;
  return regeneratorRuntime.async(function Login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          body = req.body; // ROUTE HITTED

          console.log('Login request from ', body.ip, 'with body ', body);

          if (!(!body.email || !body.password || !body.ip)) {
            _context.next = 6;
            break;
          }

          console.log('Required Data not recieved');
          return _context.abrupt("return", res.status(403).json({
            error: true,
            message: "Please fill form correctly."
          }));

        case 6:
          userIp = getIp(req.socket.remoteAddress);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log('Server Error', _context.t0);
          return _context.abrupt("return", res.status(500));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = Login;