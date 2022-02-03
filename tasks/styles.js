const { src, dest } = require("gulp")
const when = require("gulp-if")
const sourcemaps = require("gulp-sourcemaps")
const sass = require("gulp-sass")(require("sass"))
const preprocess = require("gulp-preprocess")
const minification = require("gulp-cssmin")


module.exports = styles = () => {
  return src(DIRECTORIES.source + "/styles/**/*.scss")
  .pipe(when(
    SETTINGS.mode.production, sourcemaps.init()
  ))
  .pipe(sass())
  .pipe(preprocess())
  .pipe(when(
    SETTINGS.mode.production, minification()
  ))
  .pipe(when(
    SETTINGS.mode.production, sourcemaps.write(".")
  ))
  .pipe(dest(DIRECTORIES.build + "/styles"))
}