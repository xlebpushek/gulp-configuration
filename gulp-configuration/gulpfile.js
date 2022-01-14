global.SETTINGS = require("./configuration/settings.js")
global.DIRECTORIES = require("./configuration/directories.js")


const { parallel, series } = require("gulp")
const cleaning = require("./tasks/cleaning.js")
const pages = require("./tasks/pages.js")
const fonts = require("./tasks/fonts.js")
const styles = require("./tasks/styles.js")
const json = require("./tasks/json.js")
const scripts = require("./tasks/scripts.js")
const watcher = require("./tasks/watcher.js")
const server = require("./tasks/server.js")


const production = series(cleaning, parallel(pages, fonts, styles, json, scripts))
const development = series(production, parallel(watcher, server))


exports.default = SETTINGS.mode.production ? production : development