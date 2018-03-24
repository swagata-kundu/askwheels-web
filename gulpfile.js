var gulp = require("gulp");
var clean = require("gulp-clean");
var minifyCSS = require("gulp-minify-css");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');

var path = {
  JS: ["src/js/*.js", "src/js/**/*.js"],
  CSS: ["app/css/*.css"],
  IMG: ["src/img/**"],
  VENDOR: [
    "app/bower_components/angular/angular.js",
    "app/bower_components/jquery/dist/jquery.min.js",
    "app/bower_components/jquery-ui/jquery-ui.js",
    "app/bower_components/bootstrap/dist/js/bootstrap.min.js",
    "app/bower_components/angular-ui-router/release/angular-ui-router.js",
    "app/bower_components/angular-local-storage/dist/angular-local-storage.min.js",
    "app/bower_components/angular-bootstrap/ui-bootstrap.js",
    "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
    "app/bower_components/angular-animate/angular-animate.js",
    "app/bower_components/ng-tags-input/ng-tags-input.js",
    "app/bower_components/moment/moment.js",
    "app/bower_components/lightslider/dist/js/lightslider.min.js",
    "app/bower_components/Easy-Responsive-Tabs-to-Accordion/js/easyResponsiveTabs.js",
    "app/bower_components/ng-file-upload/ng-file-upload.min.js",
    "app/bower_components/async/dist/async.min.js",
    "app/bower_components/lodash/dist/lodash.min.js",
    "app/js/scripts/bootbox.min.js",
    "app/js/scripts/script.js"
  ],
  DIST: "./dist/app"
};

/* clean up dist dir */
gulp.task("clean", function() {
  return gulp.src("./dist/*", { force: true }).pipe(clean());
});

/* move css */
gulp.task("css", function() {
  gulp
    .src(path.CSS)
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.DIST + "/css"));
});

/* concat vendor dependencies */
gulp.task("vendor", function() {
  gulp
    .src(path.VENDOR)
    .pipe(concat("vendor.js"))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(path.DIST + "/js"));
});

gulp.task("clean-build-app-prod", ["clean", "css","vendor"]);

gulp.task("default", ["clean-build-app-prod"]);
