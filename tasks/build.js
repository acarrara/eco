var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('../gulp.config')();
var inject = require('gulp-inject');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var Builder = require('systemjs-builder');

/* Prepare build using SystemJS Builder */
gulp.task('build', function (done) {
    runSequence('test', 'build-sjs', done);
});

gulp.task('build-sjs', function (done) {
    runSequence('build-assets', 'tsc-app', buildSJS);
    function buildSJS () {
        var builder = new Builder();
        builder.loadConfig('./systemjs.conf.js')
        .then(function() {
            return builder
                .bundle(config.app + 'main',
                        config.build.path + config.app + 'main.js', 
                config.systemJs.builder);
        })
        .then(function() {
            console.log('Build complete');
            done();
        })
        .catch(function (ex) {
            console.log('error', ex);
            done('Build failed.');
        });
    }
});

/* Concat and minify/uglify all css, js*/
gulp.task('build-assets', function (done) {
    runSequence('clean-build', ['wiredep'], function () {
        done();

        gulp.src(config.app + '**/*.html', {
            base: config.app
        })
        .pipe(gulp.dest(config.build.app));

        gulp.src(config.app + '**/*.css', {
            base: config.app
        })
        .pipe(cssnano())
        .pipe(gulp.dest(config.build.app));

        gulp.src(config.assetsPath.images + '**/*.*', {
            base: config.assetsPath.images
        })
        .pipe(gulp.dest(config.build.assetPath + 'images'));

        return gulp.src(config.index)
            .pipe(useref())
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', cssnano()))
            .pipe(gulpif('!*.html', rev()))
            .pipe(revReplace())
            .pipe(gulp.dest(config.build.path));
    });
});

/* Wiredep to index file */
gulp.task('wiredep', ['sass'], function () {
    return gulp.src(config.index)
        .pipe(inject(
            gulp.src(config.assetsPath.styles + 'main.css', {
                read: false
            })
        , {
            name: 'app'
        }))
        .pipe(gulp.dest(config.root));
});