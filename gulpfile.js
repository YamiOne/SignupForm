var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

gulp.task('webserver', ['sass:watch'], function() {
    gulp.src('./')
    .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: 'index.html'
    }));
});

gulp.task('sass', function () {
    return gulp.src('./app/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/styles'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./app/styles/*.scss', ['sass']);
});
