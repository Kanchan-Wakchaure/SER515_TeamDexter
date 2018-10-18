let mongoose = require("mongoose");
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,

  },
  firstname: {
    type: String,

  },
  lastname:{
    type: String,
  },
  city: {
    type: String,
  },
  hash: String,
  salt: String
});

//function to set password.
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

//function to check password.
userSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

//function to generate JWT
userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 2);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstname,
    location: this.city,
    exp: parseInt(expiry.getTime() / 1000)
  }, "MY_SECRET");
};

module.exports = mongoose.model("User", userSchema);