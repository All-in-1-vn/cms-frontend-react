var path = require('path'),
    express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    request = require('request'),
    _ = require('underscore'),
    logger = require('./logger'),
    config = require('./config'),
    app = express(),
    clientPath = path.join(__dirname, 'dist'),
    baseUrl = config.apiServerUrl;


// view engine setup
app.set('views', clientPath);
app.use(express.static(clientPath));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /dist
//app.use(favicon(__dirname + '/dist/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/*
 * Proxy request to real backend
 */
app.use(function(req, res, next) {

  if (/\.(html|css|js|png|jpg|jpeg|gif|ico|xml|rss|txt|eot|svg|ttf|woff|cur)(\?((r|v|rel|rev)=[\-\.\w]*)?)?$/
      .test(req.url)) {
    return next();
  }

  if (req.url.indexOf('/api/') < 0) {
    return next();
  }

  var options = {
    uri: baseUrl + req.url,
    method: req.method.toLowerCase(),
    headers: _.pick(req.headers, 'ar-auth-token'),
    json: req.body
  };
  logger.info('Forward request:', options);

  // send request
  request(options, function(err, response, body) {

    var status = response ? response.statusCode : 500;
    res.status(status).send(body || {
      error: 'Unknown error'
    });
  });
});


// single page app (push state support)
app.get('*', function(req, res) {
  var indexFile = path.resolve(clientPath, 'index.html');
  console.log('Send file', indexFile);
  res.sendFile(indexFile);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/**
 * Exports
 * @type {object}
 */
module.exports = app;
