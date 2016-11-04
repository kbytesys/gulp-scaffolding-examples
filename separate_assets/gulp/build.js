'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');


var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


gulp.task('clean', function () {
    return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});


gulp.task('html', ['inject', 'scripts', 'styles'], function () {
    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
        .pipe($.useref())
        /*.pipe($.if('*.js', $.sourcemaps.init({'debug': true})))
        .pipe($.if('*.js', $.uglify({ preserveComments: $.uglifySaveLicense }).on('error', conf.errorHandler('Uglify'))))
        .pipe($.if('*.js', $.sourcemaps.write('maps',  {'debug': true})))
        .pipe($.if('*.css', $.sourcemaps.init()))
        .pipe($.if('*.css', $.minifyCss({ processImport: false })))
        .pipe($.if('*.css', $.sourcemaps.write('maps', {'debug': true})))*/
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

gulp.task('minifyuglify', ['html'], function() {
    return gulp.src(path.join(conf.paths.distAssets, '/**'))
        .pipe($.if('*.js', $.sourcemaps.init()))
        .pipe($.if('*.js', $.uglify({ preserveComments: $.uglifySaveLicense }).on('error', conf.errorHandler('Uglify'))))
        .pipe($.if('*.js', $.sourcemaps.write('maps')))
        .pipe($.if('*.css', $.sourcemaps.init()))
        .pipe($.if('*.css', $.minifyCss({ processImport: false })))
        .pipe($.if('*.css', $.sourcemaps.write('maps')))
        .pipe(gulp.dest(path.join(conf.paths.distAssets, '/')))
        .pipe($.size({ title: path.join(conf.paths.distAssets, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles('**/*.{eot,svg,ttf,woff,woff2}'))
        //.pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.distAssets, '/fonts/')));
});


gulp.task('images', function () {
    return gulp.src(path.join(conf.paths.src, 'images/**/*'))
        .pipe(gulp.dest(path.join(conf.paths.distAssets, '/images/')));
});

gulp.task('build', ['html', 'fonts', 'images', 'minifyuglify']);