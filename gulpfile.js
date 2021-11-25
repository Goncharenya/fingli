const gulp = require('gulp');
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("gulp-autoprefixer");
const csso = require('gulp-postcss');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('style', function () {
    return gulp.src("src/scss/style.scss")
        .pipe(sass())
        .pipe(plumber())
        .pipe(rename("style.min.css"))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
})

gulp.task('watch', function () {
    gulp.watch('src/scss/*.+scss', gulp.parallel('style'));

})

gulp.task('default', gulp.parallel('watch', 'server', 'style'))