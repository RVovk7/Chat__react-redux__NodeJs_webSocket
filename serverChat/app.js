const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const config = require('./config');
const {
  MongoConnect
} = require('./src/mongo');
const mongoConnect = new MongoConnect(config);
const api = require('./src/api')

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoConnect.connect()
  .then(() => {
    console.log('DB running on port 3001')
  })
  .catch((e)=>{
    console.error(e)
  })
app.use('/api/v1/',api(config));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;