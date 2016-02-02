var express = require('express');
var app = express();
var methodOverride = require('method-override');
var pg = require('pg');
var passport = require('passport');
var io = require('socket.io').listen(server);

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//////////////////
// Start server //
//////////////////
var port = process.env.PORT || 8080;
var server = app.listen(port);
console.log("App listening on port: " + port);
//////////////////


//////////////////////
// Set up Socket.io //
//////////////////////
var io = require('socket.io').listen(server);
//////////////////////

//***************************************************
// *SOCKETS*
//***************************************************
io.on('connection', function (socket) {
  console.log('Socket connection has been made with id of:\n' + socket.id);

  socket.on('create board', function (boardName) {
    console.log('creating board');
    socket.join(boardName);
    socket.room = boardName;
  });

  socket.on('join board', function (boardName) {
  });

  socket.on('draw', function (data) {
    console.log('drawing');
    socket.broadcast.to(socket.room).emit('draw', data);
    //socket.broadcast.emit('draw', data);
  });
});

/////////////////////////
// Postgres Connection //
/////////////////////////
var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/';
console.log(conString);
var client = new pg.Client(conString);
client.connect();
/////////////////////////

///////////////////////
// Set up middleware //
///////////////////////
app.use(express.static(__dirname + '/../client2'));

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
///////////////////////

////////////////////////////////////////
// Set up Passport for authentication //
////////////////////////////////////////
require('./utils/passport')(passport); // pass passport for configuration
app.use(session({
  secret: 'youmakemefeelgoodlalalalala',
  resave: true,
  saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
////////////////////////////////////////

///////////////////
// Apply routing //
///////////////////
require('./routes.js')(app, express);  // Need to finish
///////////////////

