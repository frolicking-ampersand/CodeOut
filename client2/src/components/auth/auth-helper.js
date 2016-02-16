import cookie from 'react-cookie';

export default {
  loggedIn: function () {
    return !!cookie.load('token');
  },

  logout: function () {
    cookie.remove('token');
  }
}
