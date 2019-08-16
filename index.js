'use strict';

var  mbaasApi = require('fh-mbaas-api')
  , express = require('express')
  , mbaasExpress = mbaasApi.mbaasExpress()
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

  // Note: the order which we add middleware to Express here is important!
  app.use('/sys', mbaasExpress.sys([]));

  app.use('/mbaas', mbaasExpress.mbaas);

  // Note: important that this is added just before your own Routes
  app.use(mbaasExpress.fhmiddleware());



  // Use the old FeedHenry /cloud/:method-name structure
  app.use('/cloud', mbaasExpress.cloud(require('./api.js')));

  // Important that this is last!
  app.use(mbaasExpress.errorHandler());

  var port = process.env.FH_PORT || process.env.VCAP_APP_PORT || 8004;
  app.listen(port, function () {
    console.log('App started at: %s on port %d', new Date(), port);
  });