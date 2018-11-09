var express = require("express");
var app = express();
var moviesRoute = require("./routes/movies");
var citiesRoute = require("./routes/cities");
var authUserRoute = require("./routes/auth");
var usersRoute = require("./routes/users");
var preferencesRoute = require("./routes/preferences");
var activationRoute = require("./routes/activation");
var emailRoute = require("./routes/email");
var showtimesRoute = require("./routes/showtimes");
var passport = require('passport');
var cors = require('cors');
var cookieParser = require("cookie-parser");

require('./config/passport');
require('./services/db');
//var { getRefresh } = require('./services/getNewMovie')

//Created server at port 4241
const PORT = process.env.PORT || 4241;
app.listen(PORT, () => {
  console.log("Connected to port:" + PORT);
});



app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(passport.initialize());

//Add routing routes here
app.use("/movies", moviesRoute);
app.use("/cities", citiesRoute);
app.use("/auth", authUserRoute);
app.use("/users", usersRoute);
app.use("/preferences", preferencesRoute);
app.use("/activate", activationRoute);
app.use("/email", emailRoute);
app.use("/showtimes", showtimesRoute);

//error handlers

// catch 404 and forward to error handler
//app.use(function (request, response, next) {
//  var error = new Error('Not Found');
//  error.status = 404;
//  next(error);
//});

// Error handlers
app.use(function (error, request, response, next) {
  var errorStatusCode = error.statusCode;
  if (errorStatusCode >= 300 && errorStatusCode < 400) {
    response.status(errorStatusCode);
    response.json({
      "errorCode": errorStatusCode,
      "message": "Additional action required in order to complete this request."
    });
  } else if (errorStatusCode >= 400 && errorStatusCode < 500) {
    if (errorStatusCode === 401) {
      response.status(401);
      response.json({
        "errorCode": errorStatusCode,
        "message": "Unauthorized Access - Wrong Credentials"
      });
    } else if (errorStatusCode === 403) {
      response.status(404);
      response.json({
        "errorCode": errorStatusCode,
        "message": "Unauthorized Access - Access forbidden"
      })
    } else if (errorStatusCode === 404) {
      response.status(404);
      response.json({
        "errorCode": errorStatusCode,
        "message": "Resource not found"
      })
    } else {
      response.status(errorStatusCode);
      response.json({
        "errorCode": errorStatusCode,
        "message": "Bad Request - Request cannot be fulfilled"
      })
    }
  } else if (errorStatusCode >= 500 && errorStatusCode < 600) {
    if (errorStatusCode === 501) {
      response.status(errorStatusCode);
      response.json({
        "errorCode": errorStatusCode,
        "message": "Unable to fulfill this request"
      })
    } else {
      response.status(errorStatusCode);
      response.json({
        "errorCode": errorStatusCode,
        "message": "Internal Server Error"
      })
    }
  } else {
    response.json(error); // Remove this after handling custom errors
  }
});

module.exports = app;