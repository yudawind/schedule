var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var paths = {
    css:['less/**/*.less']
};

gulp.task('css', function () {
    var processor = [
        autoprefixer({browsers: ['last 2 version']}),
        cssnano()
    ];
    return gulp.src('less/template.less')
        .pipe(less())
        .pipe(postcss(processor))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('www'))
        .on('error', gutil.log);

});


gulp.task('watcher',function(){
    gulp.watch(paths.css, ['css']);
});

gulp.task('default', [
    'css',
    'watcher'
]);