var gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
babel = require('gulp-babel'),
browserify = require('browserify'),
buffer = require('vinyl-buffer'),
cleanCSS = require('gulp-clean-css'),
concat = require('gulp-concat'),
fs = require('fs'),
ggf = require('gulp-google-fonts'),
livereload = require('gulp-livereload'),
rename = require('gulp-rename'),
sass = require('gulp-sass'),
source = require('vinyl-source-stream'),
vueify = require('vueify');

var _stylescss = './front/sass/style.scss';
var _appjs = './front/js/app.js';

gulp.task('install', function() {
  var libz = [
  ];
  gulp.src(libz)
    .pipe(concat('libz.js'))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('js', function() {
  var bfy = browserify(_appjs)
  .transform(vueify)
  .bundle();

  return bfy
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload());
});

gulp.task('js:watch', function () {
  livereload.listen();
  gulp.watch('./front/js/**/*', ['js']);
});

gulp.task('sass', function() {
  gulp.src([_stylescss])
  .pipe(sass())
  .pipe(gulp.dest('./public/css'))
  .pipe(livereload());
});

gulp.task('sass:watch', function () {
  livereload.listen();
  gulp.watch(_stylescss, ['sass']);
});


gulp.task('ggfont', function () {
  return gulp.src('config.neon')
    .pipe(ggf())
    .pipe(gulp.dest('./public/fonts'));
});
