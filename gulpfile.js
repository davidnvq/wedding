"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass")(require("node-sass"));
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var connect = require("gulp-connect");

gulp.task("connect", function (done) {
  connect.server({
    root: "./",
    livereload: true,
    port: 1337,
  });
  done();
});

// compile scss to css
gulp.task("sass", function () {
  return gulp
    .src("./sass/styles.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ basename: "styles.min" }))
    .pipe(gulp.dest("./css"))
    .pipe(connect.reload());
});

gulp.task("html", function () {
  return gulp.src("./*.html").pipe(gulp.dest("./")).pipe(connect.reload());
});

// watch changes in scss files and run sass task
gulp.task("sass:watch", function () {
  gulp.watch("./sass/**/*.scss", ["sass"]);
});

// minify js
gulp.task("minify-js", function () {
  return gulp
    .src("./js/scripts.js")
    .pipe(uglify())
    .pipe(rename({ basename: "scripts.min" }))
    .pipe(gulp.dest("./js"))
    .pipe(connect.reload());
});

gulp.task("watch", gulp.parallel("sass", "html", "minify-js"));

// default task
gulp.task(
  "default",
  gulp.series("connect", "watch", "html", "sass", "minify-js")
);
