const MongoClient = require("mongodb").MongoClient;
var url = process.env["MONGODB_URL"] || "localhost:27017";
if (process.env["MONGODB_REPLICA_NAME"]) {
  url = url + "?replicaSet=" + process.env["MONGODB_REPLICA_NAME"];
}
if (process.env["MONGODB_ADMIN_PASSWORD"]) {
  url = "mongodb://admin:" + process.env["MONGODB_ADMIN_PASSWORD"] + "@" + url;
} else {
  url = "mongodb://" + url;
}

exports.createUser = function(dbName, username, password, cb) {
  console.log("Creating user " + username + " on db " + dbName);
  MongoClient.connect(url, function(err, client) {
    const adminDb = client.db(dbName);
    adminDb.addUser(
      username,
      password,
      { roles: [{ role: "readWrite", db: dbName }] },
      cb
    );
  });
};
