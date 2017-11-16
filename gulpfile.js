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


/*
bundle task will take the bundle.config.js as the configuration file and does the following tasks
1. concatenate all custom js files, uglify them, name the files as  main-*.js and place it in the public folder
2. concatenate all the vendor js files configured in the config file, uglify them, and name the file as vendor-*.js
3. Do exactly the same thing for css files as well

*/

gulp.task('bundle', function () {
  return gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(gulp.dest('./public'));
});

/*
This task takes all the files that match the glob pattern and injects them into the index.html file mentioned in the variable target
-try changing the dest('./src') to some other folder
 */

gulp.task('index', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], { read: false });

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./src'));
});


/*
This task will execute other tasks in the mentioned order
 */

gulp.task('build', function (callback) {
  runSequence('bundle', 'rename', 'index', 'clean', 'connect');
});


/*this task renames the files */
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
/*
this task deletes the folder and mentioned in the glob
*/
gulp.task('clean', function () {
  return gulp.src('./public', { read: false })
    .pipe(clean());
});

gulp.task('default', ['build']);

