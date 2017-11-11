var gulp = require('gulp'),
  connect = require('gulp-connect');
var inject = require('gulp-inject');
var bundle = require('gulp-bundle-assets');
var runSequence = require('run-sequence');

gulp.task('connect', function() {
  connect.server({
    port: 8889
  });
});



gulp.task('bundle', function() {
 return gulp.src('./bundle.config.js')
   .pipe(bundle())
   .pipe(gulp.dest('./public'));
});

gulp.task('index', function () {
 var target = gulp.src('./src/index.html');
 // It's not necessary to read the files (will speed up things), we're only after their paths:
 var sources = gulp.src(['./public/**/*.js', './public/**/*.css'], {read: false});

 return target.pipe(inject(sources))
   .pipe(gulp.dest('./src'));
});


gulp.task('build', function(callback) {
  runSequence('bundle','index','connect');
});

gulp.task('default', ['build']);