//require all needed vars
var gulp = require('gulp'); 
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var purify = require('gulp-purifycss');

//Detect when a change in .scss and .css is made and auto sync
gulp.task('check-server',function(){
  browserSync.init({
    server: "dist"
  });
  gulp.watch("src/sass/*.scss",['compile-sass']);
  gulp.watch("dist/css/*.css",['clean-css']);
  gulp.watch("src/*.html",['move-html']);
  gulp.watch("src/*.html").on('change',browserSync.reload);
});

//Compile scss into css
gulp.task('compile-sass', function () {
  return gulp.src('src/sass/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(browserSync.stream());
 });

gulp.task('move-html', function() {
  gulp.src("src/index.html")
      .pipe(gulp.dest('dist/'));
});

//Remove all unused css
gulp.task('clean-css', function() {
  return gulp.src('dist/assets/css/main.css')
    .pipe(purify(['src/*.css']))
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(browserSync.stream());
});