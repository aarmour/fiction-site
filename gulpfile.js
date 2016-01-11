const gulp = require('gulp');
const tape = require('gulp-tape');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');

const paths = {
  src: [
    './lib/**/*.js',
    './models/**/*.js',
    './routes/**/*.js',
    'keystone.js'
  ],
  test: [
    './lib/**/*.test.js',
    './models/**/*.test.js',
    './routes/**/*.test.js'
  ],
  style: {
    all: './public/styles/**/*.scss',
    output: './public/styles/'
  }
};

gulp.task('test', () => {
  gulp.src(paths.test)
    .pipe(tape());
});

gulp.task('lint', () => {
  gulp.src(paths.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('sass', () => {
  gulp.src(paths.style.all)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.style.output));
});

gulp.task('runKeystone', () => {
  nodemon({
    script: 'keystone.js',
    ext: 'js html hbs'
  });
});

gulp.task('watch:lint', () => {
  const lintAndPrint = eslint();

  lintAndPrint.pipe(eslint.formatEach());

  return gulp.watch(paths.src, event => {
    if (event.type !== 'deleted') {
      gulp.src(event.path)
        .pipe(lintAndPrint, { end: false });
    }
  });
});

gulp.task('watch:sass', () => {
  gulp.watch(paths.style.all, ['sass']);
});

gulp.task('watch', [
  'watch:sass',
  'watch:lint'
]);

gulp.task('default', ['watch', 'runKeystone']);
