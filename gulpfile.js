'use strict';

var gulp = require('gulp'),
    $$   = require('gulp-load-plugins')();

var runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    exec        = require('child_process').exec,
    path        = require('path');

var name     = 'regexp-like',
    srcDir   = './src/',
    testDir  = './test/',
    buildDir = './build/';

//  //  //  //  //  //  //  //  //  //  //  //

gulp.task('lint', lint);
gulp.task('test', test);
gulp.task('doc', doc);
gulp.task('browserify', browserify);
gulp.task('serve', browserSyncLaunchServer);

gulp.task('build', function(callback) {
    clearBashScreen();
    runSequence(
        'lint',
        'test',
        'doc',
        'browserify',
        callback);
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('watch', function () {
    gulp.watch([
        srcDir + '**',
        testDir + '**',
        buildDir + 'demo.html'
    ], [
        'build'
    ]);
    gulp.watch([
        buildDir + name + '.js'
    ], [
        'reload'
    ]);
});

gulp.task('default', ['watch', 'build'], browserSyncLaunchServer);

//  //  //  //  //  //  //  //  //  //  //  //

function lint() {
    return gulp.src(srcDir + 'index.js')
        .pipe($$.excludeGitignore())
        .pipe($$.eslint())
        .pipe($$.eslint.format())
        .pipe($$.eslint.failAfterError());
}

function test() {
    return gulp.src(testDir + 'index.js')
        .pipe($$.mocha({reporter: 'spec'}));
}

function doc(cb) {
    exec(path.resolve('jsdoc.sh'), function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

function browserify() {
    return gulp.src(srcDir + 'index.js')
        .pipe($$.rename(name + '.js'))
        .pipe($$.replace(
            'module.exports =',
            'window.regExpLIKE ='
        ))
        .pipe(gulp.dest(buildDir))
        .pipe($$.rename(name + '.min.js'))
        .pipe($$.uglify())
        .pipe(gulp.dest(buildDir));
}

function browserSyncLaunchServer() {
    browserSync.init({
        server: {
            // Serve up our build folder
            baseDir: buildDir,
            index: "demo.html"
        },
        port: 5004
    });
}

function clearBashScreen() {
    var ESC = '\x1B';
    console.log(ESC + 'c'); // (VT-100 escape sequence)
}

