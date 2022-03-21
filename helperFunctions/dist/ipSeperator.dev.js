"use strict";

var getIp = function getIp(data) {
  var ips = data.split(':');
  var ipv4 = ips[ips.length - 1];
  ips.pop();
  var ipv6 = ips.join(":");
  return {
    ipv4: ipv4,
    ipv6: ipv6
  };
};

module.exports = getIp;