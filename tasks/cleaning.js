const { src } = require("gulp")
const clean = require("gulp-clean")


module.exports = cleaning = () => {
  return src(DIRECTORIES.cleaning, { allowEmpty: true })
  .pipe(clean({force: true}))
}