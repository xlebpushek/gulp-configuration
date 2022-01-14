const { src } = require("gulp")
const clean = require("gulp-clean")


module.exports = cleaning = () => {
  return src(DIRECTORIES.cleaning)
  .pipe(clean({force: true}))
}