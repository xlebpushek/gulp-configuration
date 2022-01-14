const { src, dest } = require("gulp")
const otf2ttf = require("gulp-fonter")
const ttf2woff = require("gulp-ttf2woff")
const ttf2woff2 = require("gulp-ttf2woff2")


module.exports = fonts = () => {
  src(DIRECTORIES.source + "/fonts/**/*.otf")
  .pipe(otf2ttf({
    formats: ["ttf"]
  }))
  .pipe(dest(DIRECTORIES.source + "/fonts"))

  src(DIRECTORIES.source + "/fonts/**/*.ttf")
  .pipe(ttf2woff())
  .pipe(dest(DIRECTORIES.source + "/fonts"))

  src(DIRECTORIES.source + "/fonts/**/*.ttf")
  .pipe(ttf2woff2())
  .pipe(dest(DIRECTORIES.source + "/fonts"))

  return src(DIRECTORIES.source + "/fonts/**/*.{WOFF, WOFF2}")
  .pipe(dest(DIRECTORIES.build + "/fonts"))
}