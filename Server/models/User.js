let mongoose = require("mongoose");
let crypto = require('crypto');
let jwt =  require('jsonwebtoken');

const Schema = mongoose.Schema;

let User = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    hash: String,
    salt: String
  });

  //function to set password.
  User.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64, 'sha512').toString('hex');
  };

  //function to check password.
  User.methods.vaildPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password,this.salt,1000,64, 'sha512').toString('hex');
    return this.hash===hash;
  };

  //function to generate JWT
  User.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate()+2);

    return jwt.sign({
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      exp: parseInt(expiry.getTime()/1000)
    },"MY_SECRET");
  };

  export default mongoose.model("User", User);