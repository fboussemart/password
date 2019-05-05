const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// db connexion
mongoose.connect('mongodb://localhost/testDB',{ useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("connected to", db.client.s.url);
});

// database collections
const usersSchema = Schema({
  username: String,
  password: String
},{ versionKey: false });

const citiesSchema = Schema({
  name: String,
  country: String
},{ versionKey: false });


// exports
const Users = mongoose.model('Users', usersSchema);
const Cities = mongoose.model('Cities', citiesSchema);

module.exports = {};
module.exports.users = Users;
module.exports.cities = Cities;
