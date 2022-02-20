// const gulp = require('gulp');
// const plumber = require("gulp-plumber");
// const sourcemap = require("gulp-sourcemaps");
// const postcss = require("gulp-postcss");
// const autoprefixer = require("gulp-autoprefixer");
// const csso = require('gulp-postcss');
// const rename = require('gulp-rename');
// const browserSync = require('browser-sync');
// const sass = require('gulp-sass')(require('sass'));
//
// gulp.task('server', function () {
//     browserSync.init({
//         server: {
//             baseDir: 'src'
//         }
//     });
//     gulp.watch('src/*.html').on('change', browserSync.reload);
// });
//
// gulp.task('style', function () {
//     return gulp.src("src/scss/style.scss")
//         .pipe(sass())
//         .pipe(plumber())
//         .pipe(rename("style.min.css"))
//         .pipe(sourcemap.write("."))
//         .pipe(gulp.dest("src/css"))
//         .pipe(browserSync.stream());
// })
//
// gulp.task('watch', function () {
//     gulp.watch('src/scss/*.+scss', gulp.parallel('style'));
//
// })
//
// gulp.task('default', gulp.parallel('watch', 'server', 'style'))

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const htmlmin = require('gulp-htmlmin');
const csso = require('postcss-csso');
const rename = require('gulp-rename');
const jsmin = require('gulp-terser');
const del = require("del");
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const svgStore = require('gulp-svgstore');


// Styles

const styles = () => {
    return gulp.src("src/scss/style.scss")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer(),
            csso()
        ]))
        .pipe(rename("style.min.css"))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("build/css"))
        .pipe(sync.stream());
}

exports.styles = styles;

const buildHtml = () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'));
}

// Server

const server = (done) => {
    sync.init({
        server: {
            baseDir: 'build'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

exports.server = server;

const reload = (done) => {
    sync.reload();
    done();
}

// Watcher

const watcher = () => {
    gulp.watch("src/scss/**/*.scss", gulp.series(styles));
    gulp.watch("src/*.html", gulp.series(buildHtml, reload));
    gulp.watch("src/js/script.js", gulp.series(buildJs));
}

// build tasks

const buildJs = () => {
    return gulp.src('src/js/*.js')
        .pipe(jsmin())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('build/js'));
    // .pipe(sync.stream());
}

exports.buildJs = buildJs;

const clean = () => {
    return del("build");
};

const optimizeImages = () => {
    return gulp.src('src/img/**/*.{jpg,png}')
        .pipe(imagemin([
            imagemin.mozjpeg({progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/img"))
}

const copyImages = () => {
    return gulp.src('src/img/**/*.{jpg,png,svg}')
        .pipe(gulp.dest('build/img'));
}

const createWebp = () => {
    return gulp.src('src/img/**/*{jpg,png}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('build/img'));
}

const createSprite = () => {
    return gulp.src('src/img/icon/*.svg')
        .pipe(svgStore({
            inlineSvg: true
        }))
        .pipe(rename('sprite_v2.svg'))
        .pipe(gulp.dest('build/img'));
}

const copyOther = (done) => {
    gulp.src([
        "src/fonts/*.{woff,woff2}",
        "src/*.ico",
        "src/img/*.svg",
        "!src/img/icons/*.svg"
    ], {
        base: "source"
    })
        .pipe(gulp.dest('build'));
    done();
}

const build = gulp.series(
    clean,
    copyOther,
    copyImages,
    gulp.parallel(
        styles,
        buildHtml,
        buildJs,
        createSprite,
        createWebp
    ),
);

exports.build = build;

// exports.build = gulp.series(
//   build
// );

exports.default = gulp.series(
    clean,
    copyOther,
    copyImages,
    gulp.parallel(
        styles,
        buildHtml,
        buildJs,
        createSprite,
        createWebp
    ),
    gulp.series(
        server,
        watcher
    ));

exports.build = gulp.series(
    clean,
    copyOther,
    optimizeImages,
    gulp.parallel(
        styles,
        buildHtml,
        buildJs,
        createSprite,
        createWebp
    )
);
