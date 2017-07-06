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
babelify = require("babelify"),
vueify = require('vueify');

var _stylescss = './front/sass/style.scss';
var _appjs = './front/js/app.js';

gulp.task('install',['sass','js'], function() {
  var libz = [
    './node_modules/jquery/dist/jquery.min.js',
    //'./node_modules/daemonite-material/css/material.min.css',
    './node_modules/daemonite-material/js/material.min.js'
  ];
  gulp.src(libz)
    .pipe(gulp.dest('./public/lib'))
});

gulp.task('js', function() {
  var bfy = browserify(_appjs)
  .transform("babelify", {presets: ["es2015"]})
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
