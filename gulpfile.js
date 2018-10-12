const gulp = require('gulp');
const src = gulp.src;
const dest = gulp.dest;
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const connect = require('gulp-connect');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

const path = {
    favicon: 'assets/favicon.ico',
    pug: 'src/index.pug',
    es6: 'src/app.js',
    sass: 'src/style.sass',
    build: 'docs'
};

gulp.task('copy-favicon', () => {
    src(path.favicon)
        .pipe(dest(path.build));
})

gulp.task('build-html', () =>
    src(path.pug)
        .pipe(pug())
        .pipe(dest(path.build)));

gulp.task('build-css', () =>
    src(path.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(argv.production !== undefined, cleanCSS()))
        .pipe(dest(path.build)));

gulp.task('build-js', () =>
    src(path.es6)
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(gulpif(argv.production !== undefined, uglify()))
        .pipe(dest(path.build)));

gulp.task('clean', () =>
    src(path.build)
        .pipe(clean()));

gulp.task('build', () => runSequence('build-js', 'build-css', 'build-html', 'copy-favicon'))

gulp.task('devserver', () =>
    connect.server({
        root: path.build,
        livereload: true,
        port: 3000
    }));

gulp.task('devserver-reload', () => connect.reload())

gulp.task('watch', () => {
    gulp.watch(path.es6, runSequence('build-js', 'devserver-reload'));
    gulp.watch(path.sass, runSequence('build-css', 'devserver-reload'));
    gulp.watch(path.pug, runSequence('build-html', 'devserver-reload'))
});

gulp.task('default', () => runSequence('build', ['watch', 'devserver']))






