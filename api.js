
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var dbTest = require('./lib/dataHandlers/dbTest');

function apiRoute() {
  var route = new express.Router();
  route.use(cors());
  route.use(bodyParser());
  route.post('/user', function(req, res, next) {
    if (!req.body || !req.body.dbName || !req.body.username || !req.body.password ) {
        return res.json({err: "Required parameter missing: dbName, username, password"})
    }
    dbTest.createUser(req.body.dbName, req.body.username, req.body.password, function(err, response){
        if (err) {
            res.json({err: err})
        } else {
            res.json(response);
        }
    });

 
  });
  return route;
}

module.exports = apiRoute;
