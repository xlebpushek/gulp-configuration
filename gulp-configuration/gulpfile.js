// ### Connecting modules
// ## General
const argv = require("minimist")(process.argv.slice(2), {
  string: ["path"],
  boolean: ["production", "development"],
  alias: {
    "production": "p",
    "development": "d"
  },
  default: {
    "production": false,
    "production": false
  },
  unknown: (arg) => {
    console.error(colors.red("Unknown flag: ") + arg)
    process.exit()
  },
})
const colors = require('ansi-colors')
// ## Gulp
// # General
const { src, dest, watch, series, parallel } = require("gulp")
const when = require("gulp-if")
const sourcemaps = require("gulp-sourcemaps")
const concatenation = require("gulp-concat")
// # html
const fileinclude = require("gulp-file-include")
// # styles
const sass = require("gulp-sass")(require("sass"))
// # scripts
const rigger = require("gulp-rigger")
// # server
const browserSync = require("browser-sync").create()

// ### Variables
const root = argv.path || process.env.PWD
const source = root + "/.source"


class Tasks {
  
  constructor() {
    
    const base = parallel(this.html, this.styles, this.scripts)
    
    if (argv.development) {
        exports.default = series(base, this.server)
    } else {
        exports.default = base
    }
    
  }

  html() {
    
    return src(source + "/html/*.html")
    .pipe(fileinclude())
    .pipe(dest(root))
    .pipe(when(argv.devServ, browserSync.stream()))
    
  }
  
  styles() {
    
    return src(source + "/styles/*.scss")
    .pipe(when(argv.dev, sourcemaps.init()))
	    .pipe(sass())
	    // .pipe(concatenation("style.css"))
    .pipe(when(argv.dev, sourcemaps.write(".")))
    .pipe(dest(root + "/styles/"))
    .pipe(when(argv.devServ, browserSync.stream()))
    
  }
  
  scripts() {
    
    return src(source + "/scripts/*.js")
    .pipe(when(argv.dev, sourcemaps.init()))
	    // .pipe(concatenation("script.js"))
	    .pipe(rigger())
    .pipe(when(argv.dev, sourcemaps.write(".")))
    .pipe(dest(root + "/scripts"))
    .pipe(when(argv.devServ, browserSync.stream()))
    
  }
  
  server() {
    
    browserSync.init({
      server: {
        baseDir: root,
      },
      port: 4307,
      ui: {
        port: 8080,
      },
      ghostMode: {
        clicks: true,
        scroll: false,
        location: false,
        forms: false,
      },
      logPrefix: "Web",
      open: false,
      reloadOnRestart: true,
      notify: false,
    })

    watch([source + "/html/*.html"], tasks.html)
    watch([source + "/styles/*.scss"], tasks.styles)
    watch([source + "/scripts/*.js"], tasks.scripts)
  }
  
}


const tasks = new Tasks()