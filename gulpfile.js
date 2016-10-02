var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var del = require('del');
var runSequence = require('run-sequence');
//var path = require('path');
var colors = require('colors');

function exceptionLog (error) {
	console.log(error.toString());
	this.emit('end');
}

// Сборка js
gulp.task('webpack', function() {
	var webpackTime = new Date();
	console.log('---------- Start webpack ----------'.bold.green.bgBlack);
	gulp.src('./assets/js/main.js')
		.pipe( webpack( require('./webpack.config.js') )
		.on('error', exceptionLog) )
		.on('end', function() {
			console.log( ('-------- Finished webpack ---------').bold.green.bgBlack.inverse );
			console.log( ('------ build time: ' + (new Date() - webpackTime)/1000 + ' sec ------' ).bold.yellow );
		})
		.pipe(gulp.dest('./public/js/'))
});

// del
gulp.task('del-build', function() {
	console.log('--------- Delete old build ---------'.bold.yellow);
	del([
		'public/js/build.js',
		'public/js/build.js.gz',
		'public/js/build.js.map',
		'public/js/styles.css'
	])
	.then(function (paths) {
		console.log('---- Finished Delete old build ----'.bold.green.bgBlack.inverse);
	});
});

// watcher
gulp.task('default', function () {
	runSequence('del-build', ['webpack'])
	gulp.watch(['./assets/css/**/*.css', './assets/js/**/*.js', './assets/js/**/*.jsx', './webpack.config.js'], ['webpack']);
});