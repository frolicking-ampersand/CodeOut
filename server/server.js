var express = require('express');
var app = express();
var methodOverride = require('method-override');
var pg = require('pg');
var passport = require('passport');
var Board = require('./db/db').Board;

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//////////////////
// Start server //
//////////////////
var port = process.env.PORT || 8080;
console.log(port);
var server = app.listen(port);
console.log(port);
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
    console.log('creating board: ' + boardName);
    socket.join(boardName);
    socket.room = boardName;

    Board.create({
      name: boardName,
      //thing: req.body.thing
    }).then(function(err, board, fields) {
      if (err) {
        //res.send(err);
        // console.log(err);
      }
      //console.log(err);
      //console.log('sending back a board');
      console.log('saved board');
      //res.send(board);
    });
  });

  socket.on('join board', function (boardName) {
    socket.join(boardName);
    socket.room = boardName;
    console.log('joined board: ' + boardName);
    console.log('outgoing socket id: ' + socket.id)
    socket.broadcast.to(socket.room).emit('newb', socket.id);
    console.log('asking');

  });

  socket.on('newbImg', function (boardImg) {
    console.log('hearing back')
    console.log('incomeing socket id: ' + boardImg.id);
    console.log('current socket id: ' + socket.id);
    //if (boardImg.id === socket.id) {
    //console.log('matching');
    socket.to(boardImg.id).emit('newbImg', boardImg.image);
    //}

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

