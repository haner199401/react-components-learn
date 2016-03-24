/**
 * Created by haner on 15/11/10.
 */
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    port = process.env.port || 3838;


// live reload
gulp.task('server',function(){
    browserSync.init({
        server:'./app/',
        port:port,
        notify:true
    });
});

//watch for reload
gulp.task('watch',function(){
    gulp.watch('./app/**',browserSync.reload);
});


//default
gulp.task('default',['server','watch']);
