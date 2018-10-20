var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function (request, response) {

  if (!request.payload._id) {
    response.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(request.payload._id)
      .exec(function (error, user) {
        response.status(200).json(user);
      });
  }

};