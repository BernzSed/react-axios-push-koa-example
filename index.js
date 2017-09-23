'use strict';

require('babel/register')({});

var server = require('./server');
const PORT = process.env.PORT || 3000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // TODO only for development on localhost

server.listen(PORT, function () {
  console.log('Server listening on', PORT);
});
