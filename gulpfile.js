const gulp = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const sassGlob = require("gulp-sass-glob");
const postcss = require('gulp-postcss');
const postcss100vhfix = require('postcss-100vh-fix');
const postcssPresetEnv = require('postcss-preset-env');

const htmlbeautify = require("gulp-html-beautify");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const ejs =require("gulp-ejs");

const cssPlugins = [
  postcssPresetEnv({
    // features の中から rem: false を削除
    // 他に必要な設定があればここに追加
  }),
  postcss100vhfix,
];

//vendor
gulp.task("vendor", () => {
  return gulp.src([
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/jquery/dist/jquery.min.map",
  ], { base: "node_modules" })
    .pipe(plumber())
    .pipe(rename(path => {
      path.dirname =
        path.dirname
          .replace(/\/dist(?=\/|$)/, "")
          .replace(/\\dist(?=\\|$)/, "");
      path.extname =
        path.extname
          .replace(/\.less$/, ".css");
    }))
    .pipe(gulp.dest("fdocs/js/vendor"));
});
//scss
gulp.task("scss", () => {
  return gulp.src([
    "src/scss/**/*.scss",
  ])
    .pipe(sassGlob())
    .pipe(gulpSass({ outputStyle: "expanded", indentType: "tab", indentWidth: 1 }))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest("fdocs/css"));
});
//html
gulp.task("html", () => {
  return gulp.src([
    "src/html/*.html", "!src/html/_*.html",
  ]).pipe(gulp.dest("fdocs/"));
});
//ejs
gulp.task("ejs", () => {
	return gulp.src([
		"src/ejs/**/*.ejs", "!src/ejs/**/_*.ejs"
	]).pipe(ejs())
    .pipe(htmlbeautify({
      "indent_size": 1,
      "indent_char": "\t",
      "max_preserve_newlines": 0,
      "preserve_newlines": true,
      "extra_liners": [],
    }))
		.pipe(rename({ extname: ".html" }))
		.pipe(gulp.dest("fdocs/"));
});
//js
gulp.task("js", () => {
	return gulp.src([
		"src/js/**/*.js"
	]).pipe(gulp.dest("fdocs/js"));
});
//images
gulp.task("images", () => {
  return gulp.src([
    "src/images/**/*",
  ]).pipe(gulp.dest("fdocs/images"));
});
//fabicon
gulp.task("fabicon", () => {
  return gulp.src([
    "src/*.ico", "src/*.png",
  ]).pipe(gulp.dest("fdocs"));
});


function watchChangeFlie(done) {
  gulp.watch("src/scss/**/*.scss",   gulp.task("scss"));
  gulp.watch("src/html/*.html",   gulp.task("html"));
  gulp.watch("src/ejs/**/*.ejs",  gulp.task("ejs"));
  gulp.watch("src/js/**/*.js",    gulp.task("js"));
  gulp.watch("src/images/**/*",   gulp.task("images"));
  gulp.watch(["src/*.ico", "src/*.png"], gulp.task("fabicon"));
  done();
}

gulp.task("default", gulp.series("vendor", "scss", "html", "ejs", "js", "images", "fabicon", ));
gulp.task("watch", gulp.series("vendor", "scss", "html", "ejs", "js", "images", "fabicon", gulp.parallel(watchChangeFlie)));