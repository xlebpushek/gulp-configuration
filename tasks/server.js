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
    notify: false,
    open: false,
    reloadOnRestart: true,
  })
}