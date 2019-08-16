'use strict';
const $fh = require('fh-mbaas-api')

exports.getCache = function (params, cb) {
    var options = {
        "act": "load",
        "key": "testData", // The key associated with the object
      };
      $fh.cache(options, function (err, res) {
        if (err) return cb(err.toString());
        // res is the original cached object
        console.log(res);
        cb(null, res);
      });
}
exports.getData = function (params, cb) {
    var options = {
        "act": "list",
        "type": "myFirstEntity", // Entity/Collection name
      };
      $fh.db(options, function (err, data) {
        if (err) {
          console.error("Error " + err);
          cb(err);
        } else {
          console.log(JSON.stringify(data));
          console.log('Storing in redis');
          
          var options = {
            "act": "save",
            "key": "testData", // The key associated with the object
            "value": JSON.stringify(data),
            "expire": 60 // Expiry time in seconds. Optional
          };
          $fh.cache(options, function (err, res) {
            if (err) return cb(err.toString());
            // res is the original cached object
            console.log(res.toString());
            cb(null, data);
          });
        
        }
      });
};

exports.createData = function(params, cb) {
    var options = {
        "act": "create",
        "type": "myFirstEntity", // Entity/Collection name
        "fields": { // The structure of the entry/row data. A data is analogous to "Row" in MySql or "Documents" in MongoDB
          "firstName": "Joe",
          "lastName": "Bloggs",
          "address1": "22 Blogger Lane",
          "address2": "Bloggsville",
          "country": "Bloggland",
          "phone": "555-123456"
        }
      };
      $fh.db(options, function (err, data) {
        if (err) {
          console.error("Error " + err);
          cb(err);
        } else {
          console.log(JSON.stringify(data));
          cb(null, data);
        }
      });
}