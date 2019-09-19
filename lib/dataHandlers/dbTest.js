var MongoClient = require('mongodb').MongoClient

//
//  config
//

const url = process.env['MONGODB_URL'] || 'mongodb://localhost:27017';

var dbName       = 'FH_LOCAL'
var userName     = 'philx'
var userPassword = 'pass1'

//
//  start
//

// Connect using MongoClient
console.log('Connecting to ' + url);
MongoClient.connect(url, function(err, client) {
  // Use the admin database for the operation
  console.error(err);
  const adminDb = client.db(dbName).admin();
  // List all the available databases
  adminDb.addUser(userName, userPassword, {}, function(err, userRes){
    console.log(userRes)
  });

});