'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function () {
    browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function () {
    var injectStyles = gulp.src([
        path.join(conf.paths.tmp, '/serve/**/main.css'),
        path.join('!' + conf.paths.tmp, '/serve/**/vendor.css')
    ], {read: false});

    var injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    var injectScripts = gulp.src([
        path.join(conf.paths.src, '/assets/js/**/*.js'),
        path.join(conf.paths.src, '/js/**/*.js')
    ]);

    return gulp.src([path.join(conf.paths.src, '**/*.html'), path.join('!' + conf.paths.src, 'partials/**')])
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe($.inject(gulp.src(path.join('!' + conf.paths.src, 'partials/partial1.html')), {
            starttag: '<!-- inject:partial1:{{ext}} -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(wiredep(_.extend({})))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
