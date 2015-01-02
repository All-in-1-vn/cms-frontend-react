var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    $ = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
    }),
    httpProxy = require('http-proxy'),
    chalk = require('chalk'),
    fs = require('fs'),
    config = require('./config'),
    proxyTarget = config.apiServerUrl,
    proxy = httpProxy.createProxyServer();


var handleError = function(err) {
  console.log(err);
};

proxy.on('error', function(error, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  console.error(chalk.red('[Proxy]'), error);
});


/*
 * The proxy middleware is an Express middleware added to BrowserSync to
 * handle backend request and proxy them to your backend.
 */
function proxyMiddleware(req, res, next) {
  /*
   * This test is the switch of each request to determine if the request is
   * for a static file to be handled by BrowserSync or a backend request to proxy.
   *
   * The existing test is a standard check on the files extensions but it may fail
   * for your needs. If you can, you could also check on a context in the url which
   * may be more reliable but can't be generic.
   */
  console.log(req.method, req.url);
  if (/\.(html|css|js|png|jpg|jpeg|gif|ico|xml|rss|txt|eot|svg|ttf|woff|cur)(\?((r|v|rel|rev)=[\-\.\w]*)?)?$/.test(req.url)) {
    console.log('Static file!');
    next();
  } else if (req.url.indexOf('/api/') >= 0) {
    console.log('Forward request to backend server:', proxyTarget + req.url);
    proxy.web(req, res, {
      target: proxyTarget
    });
  } else if (res.indexFile) {
    // read index.html
    fs.readFile(res.indexFile, function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
      res.write(data);
      res.end();
    });
  } else {
    next();
  }
}


gulp.task('browserify-dev', function() {
  gulp.src('src/router.js')
    .pipe(browserify({transform: 'reactify', debug: true}))
    .on('error', handleError)
    .pipe(gulp.dest('dist/src'));
});

gulp.task('browserify', function() {
  gulp.src('src/router.js')
    .pipe(browserify({transform: 'reactify'}))
    .on('error', handleError)
    .pipe(uglify())
    .pipe(gulp.dest('dist/src'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});


gulp.task('browser-reload', function() {
  browserSync.reload();
});

gulp.task('less', function() {
  gulp.src('src/style.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function() {
  return gulp.src('src/assets/images/**')
    .pipe($.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      }))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe($.size());
});

gulp.task('clean', function() {
  return gulp.src(['dist'], { read: false }).pipe($.rimraf());
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['browserify']);
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/assets/**', ['images']);
});

gulp.task('watch-bundle', function() {
  gulp.watch('dist/**/*.*', ['browser-reload']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './dist',
      middleware: [
        proxyMiddleware
      ]
    },
    port: config.port
  });
});

gulp.task('build', ['browserify', 'copy', 'less', 'images']);

gulp.task('default', ['browserify-dev', 'copy', 'less', 'images', 'browser-sync', 'watch', 'watch-bundle']);
