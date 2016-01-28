var Sequelize = require("sequelize");
var db = new Sequelize("board", "", "", {
  host: 'localhost',
  dialect: 'postgres'
});

// we define the models we need using js--we don't need a schema file!
var User = db.define('User', {
  google_id: Sequelize.STRING,
  google_token: Sequelize.STRING,
  facebook_id: Sequelize.STRING,
  facebook_token: Sequelize.STRING
});

// puts a UserId column on each Message instance
// also gives us the `.setUser` method, available inside the .success callback
// after creating a new instance of Message
// Message.belongsTo(User);
// enables bi-directional associations between Users and Messages
// User.hasMany(Message);


User.sync();
// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.

module.exports = User;

