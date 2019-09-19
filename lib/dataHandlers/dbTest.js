const MongoClient = require("mongodb").MongoClient;
const url = process.env["MONGODB_URL"] || "mongodb://localhost:27017/testDb";
const dbName = 'cloudApp1';

exports.createUser = function(dbName, username, password, cb) {
  console.log("Connecting to " + url);
  MongoClient.connect(url, function(err, client) {
    // Use the admin database for the operation
    console.error(err);
    console.log('Switching to ' + dbName);

    const adminDb = client.db(dbName);

    adminDb.addUser(username, password, {roles:[{role: "readWrite" , db: dbName}]}, cb);
  });
};
