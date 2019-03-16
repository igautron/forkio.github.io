const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sync = require('browser-sync').create(),
    terser = require('gulp-terser'),
    cleanCSS = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');

function cssIssues() {
    return gulp.src('./src/css/**/*.css')
    // return gulp.src('./src/scss/**/*.scss')
        // .pipe(sass())
        // .pipe(cleanCSS({
            // compatibility: 'ie8'
        // }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(sync.stream());
}

function copyhtml(){
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist/'));
}

gulp.task('copyhtml', copyhtml); 

gulp.task('dev', function (cb) {
    sync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('./src/scss/*.scss', cssIssues);
    gulp.watch('./src/js/**/*.js').on('change', sync.reload);
    gulp.watch('./src/*.html', copyhtml).on('change', sync.reload);
    cb;
});

gulp.task('sass', cssIssues);

gulp.task('terser', function () {
    return gulp.src('./dist/js/*.js')
        .pipe(terser())
        .pipe(gulp.dest('./dist/js/'))
});

gulp.task('concat', function () {
    return gulp.src('./src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('cleanCSS', function () {
    return gulp.src('./dist/stylesheets/*.css')

        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src('./dist/**/*', {
            read: false
        })
        .pipe(clean());
});

gulp.task('imagemin', function () {
   return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'))
});

gulp.task('prefixer', function () {
    gulp.src('./src/sass/*.scss')

        .pipe(gulp.dest('dist'))
});

gulp.task('fontsfiles', function(){
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'))
})

gulp.task('libsfiles', function(){
    return gulp.src('./src/libs/**/*')
        .pipe(gulp.dest('./dist/libs/'))
})


gulp.task('build', gulp.series('clean','copyhtml', 'imagemin', 'fontsfiles', 'libsfiles', 'concat', 'terser', 'sass'));
