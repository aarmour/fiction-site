const gulp = require('gulp');
const eslint = require('gulp-eslint');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');

const paths = {
  'src': [
    './lib/**/*.js',
    './models/**/*.js',
    './routes/**/*.js',
    'keystone.js'
  ],
  'style': {
    all: './public/styles/**/*.scss',
    output: './public/styles/'
  }
};

// gulp lint
gulp.task('lint', () => {
  gulp.src(paths.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// gulp watcher for lint
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

gulp.task('watch', [
  'watch:sass',
  'watch:lint'
]);

gulp.task('default', ['watch', 'runKeystone']);
