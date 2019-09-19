
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var dbTest = require('./lib/dataHandlers/dbTest');

function apiRoute() {
  var route = new express.Router();
  route.use(cors());
  route.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
//   route.get('/', function(req, res) {
//     console.log(new Date(), 'In hello route GET / req.query=', req.query);
//     var world = req.query && req.query.hello ? req.query.hello : 'World';

//     // see http://expressjs.com/4x/api.html#res.json
//     res.json({msg: 'Hello updated2 ' + world});
//   });

  route.get('/createUser', function(req, res, next) {
    console.log(new Date(), 'In route GET /createUser');
    dbTest.createUser();
    res.json({success:true});
 
  });
  
  

  return route;
}

module.exports = apiRoute;

// exports.getTimeSummaryByDay = tsByDayDataHandler.getTimeSummaryByDay;
// exports.getTimeSummaryByWeek = tsByWeekDataHandler.getTimeSummaryByWeek;
// exports.getTimeSummaryTicket = tsTicketDataHandler.getTimeSummaryTicket;
// exports.getTimeSummaryErrorLines = tsErrorDataHandler.getTimeSummaryErrorLines;


