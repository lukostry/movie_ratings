var gulp = require("gulp");
var jshint = require("gulp-jshint");
var sass = require("gulp-sass");

gulp.task("checkJsFiles", function(){
    return gulp.src("js/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

gulp.task("sass", function(){
    return gulp.src("scss/main.scss")
    .pipe(sass({errLogToConsole: true, outputStyle: "expanded", sourceComments: "map"}))
    .pipe(gulp.dest("css"))
});

gulp.task("watch", function(){
    gulp.watch("scss/**/*.scss", ["sass"]);
})
