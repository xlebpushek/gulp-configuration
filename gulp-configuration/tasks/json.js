const { src, dest } = require("gulp")
const when = require("gulp-if")
const preprocess = require("gulp-preprocess")
const minification = require("gulp-jsonmin")


module.exports = json = () => {
  return src(DIRECTORIES.source + "/json/**/*.json")
  .pipe(preprocess())
  .pipe(when(
    SETTINGS.mode.production, minification()
  ))
  .pipe(dest(DIRECTORIES.build + "/json"))
}