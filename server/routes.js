var passport = require('passport');
var Board = require('./db/db').Board;
var User = require('./db/db').User

module.exports = function (app, express) {

  // //////////////////////////////////
  // // Serve up static public files //
  // //////////////////////////////////
  // app.get('/', function(req, res){
  //   res.sendFile('/index.html');
  // });
  // //////////////////////////////////

  // =======================================
  // UNDEFINED PROTECTED SECTION ===========
  // =======================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)

  // app.get('/', function(req, res) {
  //   res.redirect('main.html');
  // });

  // app.use('/', express.static(path.join('../client2/main.html'));

  // app.get('/login', function(req,res) {
  //   res.redirect('login.html');
  // });

  // =======================================
  // BOARD ROUTES ==========================
  // =======================================
  // A protected route

  // get one board

  app.get('/', function(request, response) {
      var result = 'App is running'
      response.send(result);
  }).listen(app.get('port'), function() {
      console.log('App is running, server is listening on port ', app.get('port'));
  });

  app.get('/api/boards', function (req, res) {
    Board.findOne()
      .then(function(board) {
        console.log(board);
        //we are hardcoding in number in the row[number]. This should be changed to whatever the current board to be gotten is.
        res.send(board.thing);
      });
  });

  app.get('/api/allBoards', function (req, res) {
    console.log('getting all boards')
    Board.findAll()
    .then(function(boards){
      console.log('found allBoards');
      var arr = boards.map(function (board) {
        console.log('boardname' + board.name);
        return {
          //image: board.thing.toString(),
          name: board.name 
        };
      });

      //console.log(req.user);
      res.send({boards: arr, userId: req.user.dataValues.id});
    })
  });

  app.get('/api/lastBoard', function (req, res) {
    Board.findAll()
    .then(function(boards){
      console.log('*USER_DATA*****************', req.user);
      res.send(boards[boards.length-1].thing);
    })
  });

   app.get('/api/firstBoard', function (req, res) {
    Board.findAll()
    .then(function(boards){
      res.send(boards[0].thing);
    })
  });


 app.get('/api/allZeeBoards', function (req, res) {
   Board.findAll()
   .then(function(boards){
     //filter out boards that don't have an image associated with them.
     var arr = boards.filter(function (board){
       return board.thing;
     }).map(function (board) {
       //convert the image to a string so that it can be drawn on the canvas
       return {id: board.id, img:board.thing.toString()};
     })
     console.log(boards[boards.length-1].thing);
     res.send(arr);
   })
 });

  // app.get('/api/boards', function(req, res) {
  //   'SELECT * FROM board', function(err, rows){
  //     if (err){
  //       res.send(err)
  //     }
  //     res.send(rows);
  //   }
  // });

  //create a board
  // app.post('/api/create', function (req, res) {
  //   console.log('looking for user');
  //   User.findOne({
  //     where: { id: req.user.id }
  //   })
  //   .then(function (user) {
  //     console.log('found a user');
  //     Board.create({
  //       name: req.body.name
  //     }).setUsers(user);
  //   });

  // });

  app.post('/api/boards', function (req, res) {
    console.log('creating board');
    console.log(req.body.name);
    Board.create({
      name: req.body.name,
      thing: req.body.thing
    }).then(function(err, board, fields) {
      if (err) {
        res.send(err);
      }
      console.log(err);
      console.log('sending back a board');
      //console.log(board);
      res.send(board);
    });
  });


  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect : '/login'
    }), function (req, res) {
      console.log(req.user);
      console.log(res.cookie);
      res.cookie('token', JSON.stringify(req.user.token));
      console.log(res.cookie);
      res.redirect('/');
    });

  // =====================================

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect : '/login'
    }), function (req, res) {
      console.log(req.user.dataValues);
      console.log(req.user.dataValues.google_token);
      res.cookie('token', JSON.stringify(req.user.dataValues.google_token));
      res.redirect('/');
    });
  // =====================================

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  // =====================================

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/login');
}
