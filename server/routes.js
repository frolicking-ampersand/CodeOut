var passport = require('passport');
var Board = require('./db/db').Board;

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
  // app.get('/canvas', isLoggedIn, function(req, res) {
  //   res.render('/canvas', isLoggedIn, function(req, res) {

  //   });
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

  // app.get('/api/boards', function (req, res) {
  //   Board.findOne()
  //     .then(function(board) {
  //       console.log(board);
  //       //we are hardcoding in number in the row[number]. This should be changed to whatever the current board to be gotten is.
  //       res.send(board.thing);
  //     });
  // });

  app.get('/api/boards', function(req, res) {
    'SELECT * FROM board', function(err, rows){
      res.send(rows);
    }
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
  app.post('/api/boards', function (req, res) {
    Board.create({
      thing: req.body.thing
    }).then(function(err, board, fields) {
      if (err) {
        res.send(err);
      }
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
      successRedirect : '/#/canvas',
      failureRedirect : '/'
    }));

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
      successRedirect : '/#/canvas',
      failureRedirect : '/'
    }));
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
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
