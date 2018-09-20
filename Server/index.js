var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var bluebird = require('bluebird')
const keys= require('./config/keys')


//Created server at port 4241
const PORT = process.env.PORT || 4241
app.listen(PORT, ()=>{
	console.log("Connected to port:" + PORT);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);




var mongoose = require('mongoose')
mongoose.Promise = bluebird

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database`)
  })
  .catch(() => {
    console.log(`Error Connecting to the Mongodb Database`)
  })

module.exports = app;


