var express = require('express');
var app = express();
var methodOverride = require('method-override');
var pg = require('pg');
var passport = require('passport');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

/////////////////////////
// Postgres Connection //
/////////////////////////
var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(conString);
client.connect();
/////////////////////////

require('./utils/passport')(passport); // pass passport for configuration

///////////////////////
// Set up middleware //
///////////////////////
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
///////////////////////

///////////////////
// Apply routing //
///////////////////
// require('./routes.js')(app, express);  // Need to finish
///////////////////

////////////////////////////////////////
// Set up passport for authentication //
////////////////////////////////////////
app.use(session({ secret: 'youmakemefeelgoodlalalalala' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
////////////////////////////////////////

//////////////////
// Start server //
//////////////////
var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port: " + port);
//////////////////
