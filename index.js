'use strict';

  var express = require('express')
  , app = module.exports = express()
  , bodyParser = require('body-parser')

  app.use(require('cors')());

  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded(
    {
      limit: '10mb',
      extended: true,
      parameterLimit: 50000
    }));



  // Use the old FeedHenry /cloud/:method-name structure
  app.use('/', require('./api.js')());



  var port = process.env.PORT  || 8004;
  app.listen(port, function () {
    console.log('App started at: %s on port %d', new Date(), port);
  });