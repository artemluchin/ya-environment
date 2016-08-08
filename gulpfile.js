'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
// const uglify = require('gulp-uglify');
const merge = require('merge-stream');


gulp.task('public.css', function () {
  var sassStream, cssStream;
  
  sassStream = gulp.src('src/sass/*.scss')
    .pipe(concat('sass-styles.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename('styles.css'));
	
  cssStream = gulp.src(['node_modules/reset-css/reset.css', 'src/css/*.css'])
    .pipe(concat('css-styles.css'));

  return merge(cssStream, sassStream)
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('public.js', function() {
  return gulp.src(['src/js/app.js', 'src/js/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('public.assets', function() {
    return gulp.src('src/assets/**/*')
      .pipe(gulp.dest('public/assets'));
});

gulp.task('build', ['public.css', 'public.js', 'public.assets']);