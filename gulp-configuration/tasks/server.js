const browsersync = require('browser-sync')


module.exports = server = () => {
  browsersync.init({
    server: {
      baseDir: DIRECTORIES.build,
    },
    port: 4307,
    ui: {
      port: 8080,
    },
    logPrefix: "gulp-configuration",
    open: false,
    reloadOnRestart: true,
  })
}