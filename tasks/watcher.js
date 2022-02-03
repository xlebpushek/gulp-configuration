const colors = require("colors")
const gulp = require("gulp")
const browsersync = require("browser-sync")
const cleaning = require("./cleaning.js")
const media = require("./media.js")
const pages = require("./pages.js")
const fonts = require("./fonts.js")
const styles = require("./styles.js")
const json = require("./json.js")
const scripts = require("./scripts.js")


module.exports = watcher = () => {
  gulp.watch(DIRECTORIES.source + "/media/**/*.*", media)
  gulp.watch(DIRECTORIES.source + "/**/*.html", pages)
  gulp.watch(DIRECTORIES.source + "/**/*.{otf, ttf, WOFF, WOFF2}", fonts)
  gulp.watch(DIRECTORIES.source + "/**/*.scss", styles)
  gulp.watch(DIRECTORIES.source + "/**/*.json", json)
  gulp.watch(DIRECTORIES.source + "/**/*.js", scripts)

  gulp.watch(DIRECTORIES.source + "/**/*.*").on('all', () => {
    browsersync.reload()
  })
}