var passport = require('passport');

module.exports = function (app, express) {

  //////////////////////////////////
  // Serve up static public files //
  //////////////////////////////////
  app.get('/', function(req, res){
    res.sendFile('/index.html');
  });
  //////////////////////////////////

  //////////////////////
  // Database Routing //
  //////////////////////

  //add a user to database
  app.post('/users', function(req, res){
    
  });

  //get all users
  app.get('/users', function(req, res) {
    
  });

  //get a specific user
  app.get('/users/:username', function(req, res){

  });
  //////////////////////

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/#',
      failureRedirect : '/'
    })
  );
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
      successRedirect : '/#',
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
