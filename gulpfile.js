var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

//ПРИ ПРОБЛЕМАХ С Гульпом 
//Error: watch /home/underproof/Frontends/interior.studio/public/assets/js/ ENOSPC
// at exports._errnoException (util.js:1020:11)
// at FSWatcher.start (fs.js:1451:19)
// at Object.fs.watch (fs.js:1478:11)
//ДАЕМ КОМАНДУ
// echo fs.inotify.max_user_watches=500000 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

var babel  = require('gulp-babel');

gulp.task('serve', ['autoprefix-scss'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("app/assets/*.scss", ['autoprefix-scss']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('autoprefix-scss', function() {
    return gulp.src("app/assets/style.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({browsers: ['last 3 versions']}))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
        
});

gulp.task('default', ['serve']);