
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
    console.log(new Date(), 'In route POST /user');
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

// exports.getTimeSummaryByDay = tsByDayDataHandler.getTimeSummaryByDay;
// exports.getTimeSummaryByWeek = tsByWeekDataHandler.getTimeSummaryByWeek;
// exports.getTimeSummaryTicket = tsTicketDataHandler.getTimeSummaryTicket;
// exports.getTimeSummaryErrorLines = tsErrorDataHandler.getTimeSummaryErrorLines;


