var gulp = require('gulp');
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var critical = require('critical');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass:compile', function() {
  gulp.src('./src/styles/**/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/tmp/styles/'))
    .pipe(browserSync.stream())
});


gulp.task('css:minify', function() {
  gulp.src('./src/tmp/styles/main.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/styles'));
})

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  })
  gulp.watch('./src/**/**').on('change', browserSync.reload);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
})

gulp.task('serve', ['browser-sync']);

gulp.task('js:build', function() {
  gulp.src('./src/scripts/**/*.js')
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('build', function() {

});
