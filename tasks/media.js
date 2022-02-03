const { src, dest } = require("gulp")


module.exports = media = () => {
  return src(DIRECTORIES.source + "/media/**/*.*")
  .pipe(dest(DIRECTORIES.build + "/media"))
}