var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var $ = require('gulp-load-plugins')();
var critical = require('critical');
var del = require('del');
var fs = require('fs');
var sequence = require('run-sequence');

var build = false;

gulp.task('html:build', function() {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src(['./tmp/scripts/*.js']);
  return target.pipe($.inject(sources, {ignorePath: 'tmp/'}))
    .pipe(gulp.dest('./tmp'));
})

gulp.task('clean:tmp', function(cb) {
  del(['./tmp/*'], cb);
})

gulp.task('css:compile', function() {

  return gulp.src('./src/styles/**/**/*.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('./tmp/styles/'))

});

gulp.task('css:inject', function(cb) {
  var css = fs.readFileSync('./tmp/styles/main.min.css').toString();
  var target = fs.readFileSync('./tmp/index.html').toString();
  target = target.replace('/* inline:css */', css);
  fs.writeFile('./tmp/index.html', target, function(err) {
    if (err) throw err;
    console.log('Injected inline style');
    cb();
  })
})

gulp.task('css:minify', ['css:compile'], function() {

  return gulp.src('./tmp/styles/main.css')
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe($.cssmin())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('./tmp/styles'))
})

gulp.task('browser-sync', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: './tmp'
    }
  })
  gulp.watch('./src/**/**').on('change', browserSync.reload);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
})

// gulp.task('build:tmp', funciton())

gulp.task('serve', ['browser-sync']);

gulp.task('js:build', function() {
  return gulp.src('./src/scripts/**/*.js')
    .pipe($.uglify())
    .pipe($.concat('bundle.js'))
    .pipe(gulp.dest('tmp/scripts/'));
});

gulp.task('img:build', function() {
  return gulp.src('./src/img/*')
    .pipe($.imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('./tmp/img'))
})

gulp.task('build', function(cb) {
  sequence('clean:tmp', ['js:build', 'css:compile', 'img:build'], 'css:minify', 'html:build', 'css:inject', cb);
});
