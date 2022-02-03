const { src, dest } = require("gulp")
const when = require("gulp-if")
const inclusion = require("gulp-file-include")
const preprocess = require("gulp-preprocess")
const minification = require("gulp-htmlmin")


module.exports = pages = () => {
  return src(DIRECTORIES.source + "/pages/**/index.html")
  .pipe(inclusion())
  .pipe(preprocess())
  .pipe(when(
    SETTINGS.mode.production, minification()
  ))
  .pipe(dest(DIRECTORIES.build))
}