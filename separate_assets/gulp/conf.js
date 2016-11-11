
var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
var baseDistDir = 'dist';

exports.paths = {
    src: 'src',
    dist: baseDistDir,
    distAssets: baseDistDir + '/assets',
    tmp: '.tmp'
};
/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
    'use strict';

    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
