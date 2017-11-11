var gulp = require('gulp'),
  connect = require('gulp-connect');
var inject = require('gulp-inject');
var bundle = require('gulp-bundle-assets');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

gulp.task('connect', function () {
  connect.server({
    port: 8889
  });
});



gulp.task('bundle', function () {
  return gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(gulp.dest('./public'));
});

gulp.task('index', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], { read: false });

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./src'));
});


gulp.task('build', function (callback) {
  runSequence('bundle', 'rename', 'index', 'clean', 'connect');
});

gulp.task('rename', function () {
  var nameMap = [
    { './public/main*.css': 'main.css' },
    { './public/main*.js': 'main.js' },
    { './public/main*.css': 'vendor.css' },
    { './public/main*.css': 'vendor.js' }]


  gulp.src('./public/main*.css')
    .pipe(rename(function (path) {
      console.log(path);
      path.basename = 'main';
      path.extname = '.css';
    }))
    .pipe(gulp.dest('dist'));
  gulp.src('./public/main*.js')
    .pipe(rename(function (path) {
      path.basename = 'main';
      path.extname = '.js';
    }))
    .pipe(gulp.dest('dist'));
  gulp.src('./public/vendor*.js')
    .pipe(rename(function (path) {
      path.basename = 'vendor';
      path.extname = '.js';
    }))
    .pipe(gulp.dest('dist'));

});

gulp.task('clean', function () {
  return gulp.src('./public', { read: false })
    .pipe(clean());
});

gulp.task('default', ['build']);