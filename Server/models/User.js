let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    hash: String,
    salt: String
  });

  export default mongoose.model("User", User);