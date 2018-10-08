let mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
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

  export default mongoose.model("User", User);