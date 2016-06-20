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
});

var handlebars = require("gulp-handlebars");
var wrap = require("gulp-wrap");
var declare = require("gulp-declare");
var concat = require("gulp-concat");

gulp.task("templates", function(){
  gulp.src('templates/*.handlebars')
    .pipe(handlebars({
      handlebars: require("handlebars")
    }))
    .pipe(wrap("Handlebars.template(<%= contents %>)"))
    .pipe(declare({
      namespace: "Handlebars.templates",
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./js/"));
});
