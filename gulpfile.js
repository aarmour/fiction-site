const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jshintReporter = require('jshint-stylish');
const watch = require('gulp-watch');
const shell = require('gulp-shell')
const sass = require('gulp-sass');

const paths = {
  'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
  'style': {
    all: './public/styles/**/*.scss',
    output: './public/styles/'
  }
};

// gulp lint
gulp.task('lint', () => {
  gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', () => {
  gulp.watch(paths.src, ['lint']);
});

gulp.task('watch:sass', () => {
  gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', () => {
  gulp.src(paths.style.all)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.style.output));
});

gulp.task('runKeystone', shell.task('node keystone.js'));

gulp.task('watch', [
  'watch:sass',
  'watch:lint'
]);

gulp.task('default', ['watch', 'runKeystone']);
