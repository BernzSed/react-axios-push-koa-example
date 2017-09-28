'use strict';

require('babel-register')({});
require("babel-polyfill");

process.on('unhandledRejection', r => console.error(r)); // TODO delete line

var server = require('./server');
// const PORT = process.env.PORT || 3000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // TODO only for development on localhost

// server.listen(PORT, function (err) {
//   if (err) {
//     throw new Error(err);
//   }
//
//   console.log('Server listening on', PORT);
// });
