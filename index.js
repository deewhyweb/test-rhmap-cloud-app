var express = require('express');
var cors = require('cors');
var app = express();
const probe = require('kube-probe');
probe(app);
const Keycloak = require('keycloak-connect');

var keycloak = new Keycloak({});
app.use(keycloak.middleware());

// Enable CORS for all requests
app.use(cors());

app.use('/', keycloak.protect(), require('./api.js')());

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

function logErrors(err, req, res, next) {
  console.error(err);
}

app.use(logErrors);

var port = process.env.PORT || 8004;
var host = '0.0.0.0';
app.listen(port, host, function() {
  console.log('App started at: ' + new Date() + ' on port: ' + port);
});
