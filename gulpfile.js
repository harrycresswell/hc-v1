var gulp         = require('gulp');
    sass         = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    hash         = require('gulp-hash');
    del          = require('del');


// Compile SCSS files to CSS
gulp.task('scss', function () {

    //Delete our old css files
    del(['static/css/**/*'])

    //compile hashed css files
    gulp.src('src/scss/**/*.scss')
        .pipe(sass({outputStyle : 'compressed'}))
        .pipe(autoprefixer({browsers : ['last 20 versions']}))
        .pipe(hash()) // Add hashes to the files' names
        .pipe(gulp.dest('static/css')) // Write the renamed files
        //Create a hash map
        .pipe(hash.manifest('hash.json'))
        //Put the map in the data directory
        .pipe(gulp.dest('data/css'))
});


// Hash images
gulp.task('images', function () {
    del(['static/images/**/*'])
    gulp.src('src/images/**/*')
        .pipe(hash())
        .pipe(gulp.dest('static/images'))
        //Create a hash map
        .pipe(hash.manifest('hash.json'))
        //Put the map in the data directory
        .pipe(gulp.dest('data/images'))
});


// Hash javascript
gulp.task('js', function () {
    del(['static/js/**/*'])
    gulp.src('src/js/**/*')
        .pipe(hash())
        .pipe(gulp.dest('static/js'))
        //Create a hash map
        .pipe(hash.manifest('hash.json'))
        //Put the map in the data directory
        .pipe(gulp.dest('data/js'))
});

// pipe fonts
gulp.task('fonts', function() {
    del(['static/fonts/**/*'])
    gulp.src(['src/fonts/**/*'])
      .pipe(gulp.dest('static/fonts'));
});


// Watch asset folder for changes
gulp.task('watch', ['scss', 'images', 'js', 'fonts'], function () {
    gulp.watch('src/scss/**/*', ['scss']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/js/**/*', ['js']);
    gulp.watch('src/fonts/**/*', ['fonts']);
});


// Set watch as default task
gulp.task('default', ['watch']);
