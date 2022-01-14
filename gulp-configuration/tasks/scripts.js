const { src, dest } = require("gulp")
const when = require("gulp-if")
const sourcemaps = require("gulp-sourcemaps")
const rigger = require("gulp-rigger")
const preprocess = require("gulp-preprocess")
const minification = require("gulp-jsmin")


module.exports = scripts = () => {
  return src(DIRECTORIES.source + "/scripts/**/*.js")
  .pipe(when(
    SETTINGS.mode.production, sourcemaps.init()
  ))
  .pipe(rigger())
  .pipe(preprocess())
  .pipe(when(
    SETTINGS.mode.production, minification()
  ))
  .pipe(when(
    SETTINGS.mode.production, sourcemaps.write(".")
  ))
  .pipe(dest(DIRECTORIES.build + "/scripts"))
}