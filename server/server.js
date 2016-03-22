var express = require('express');
var app = express();
var methodOverride = require('method-override');
var pg = require('pg');
var passport = require('passport');
var Board = require('./db/db').Board;
var User = require('./db/db').User;
var Room = require('./db/db').Room;

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//////////////////
// Start server //
//////////////////
var port = process.env.PORT || 8080;
var server = app.listen(port);
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
    socket.join(boardName.name);
    socket.room = boardName.name;
    Board.create({
      name: boardName.name,
      //thing: req.body.thing
    }).then(function(err, board, fields) {
      if (err) {
        //res.send(err);
        // console.log(err);
      }
    });

      socket.broadcast.to(socket.room).emit('newb', {name: socket.room, id: socket.id});
      socket.to(socket.room).emit('newb2', {name: socket.room});
  });


  socket.on('newbImg', function (boardImg) {
    socket.to(boardImg.id).emit('newbImg', boardImg.image);

  });

  socket.on('draw', function (data) {
    console.log('drawing');
    console.log('socketroom', socket.room)
    socket.broadcast.to(socket.room).emit('draw', data);
  });

  socket.on('type', function(data){
    socket.broadcast.to(socket.room).emit('write code', data)
  });

  socket.on('startSearch', function(data){
    socket.broadcast.to(socket.room).emit('searchTyping', data)
  });

  socket.on('sendVideoSelect', function(data){
    socket.to(socket.room).emit('getVid', data)
    socket.broadcast.to(socket.room).emit('getVid', data);
  });

  socket.on('sendPlay', function(){
    socket.broadcast.to(socket.room).emit('recievePlay');
  });

  socket.on('sendPause', function() {
    socket.broadcast.to(socket.room).emit('recievePause');
  });

  socket.on('sendCodeProblem', function(data) {
    socket.broadcast.to(socket.room).emit('receiveCodeProblem', data);
  });

  socket.on('getAnswer', function(data) {
    console.log('THIS IS THE FUCKING DATA', data)
    socket.broadcast.to(socket.room).emit('receiveAnswer', data);
  });

  socket.on('disconnect', function() {
    socket.leave(socket.room);
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
// app.use(passport.session(
// )); // persistent login sessions
////////////////////////////////////////

///////////////////
// Apply routing //
///////////////////
require('./routes.js')(app, express);  // Need to finish
///////////////////

