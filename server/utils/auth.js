module.exports = {

  'facebookAuth' : {
    'clientID'      : '959804234086945', // your App ID
    'clientSecret'  : 'db8a27a394e9b952b129edd27bdb4d33', // your App Secret
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
  },

  'googleAuth' : {
    'clientID'      : '325419413319-9mitreijemcisl81o8uvapekgruppu8b.apps.googleusercontent.com',
    'clientSecret'  : 'oGLU4WJd3yoI1KkFyxgsabuw',
    //'callbackURL'   : 'http://localhost:8080/auth/google/callback',
    'callbackURL'   : 'https://aqueous-anchorage-65938.herokuapp.com/auth/google/callback',
  }

};
