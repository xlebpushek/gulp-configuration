const fs = require( "fs" )
const path = require( "path" )
const colors = require( "colors" )
const argv = require( "minimist" )( process.argv.slice(2), {
  string: [
    "root",
    "port",
    "uiport"
  ],
  boolean: [
    "production",
    "development"
  ],
  default: {
    production: false,
    production: false
  },
  unknown: (arg) => {
    console.error( "Unknown flag:".red, (arg).bold )
    process.exit( 1 )
  }
})

const {
  src,
  dest,
  watch,
  series,
  parallel
} = require( "gulp" )

const when = require( "gulp-if" )
const sourcemaps = require( "gulp-sourcemaps" )
const preprocess = require( "gulp-preprocess" )
const concatenation = require( "gulp-concat" )

const pages_file_include = require( "gulp-file-include" )
const pages_minifier = require( "gulp-htmlmin" )

const styles_sass = require( "gulp-sass" )( require("sass") )
const scripts_rigger = require( "gulp-rigger" )

const browserSync = require( "browser-sync" ).create()


const settings = JSON.parse(fs.readFileSync(
  "settings.json",
  "utf8"
))

const root = argv.root || settings.root || process.env.PWD
const source = path.join(
  root,
  ".source"
)

const directories = {
  source: {
    pages: source + "/pages/**/index.html",
    styles: source + "/styles/*.scss",
    scripts: source + "/scripts/*.js",
    json: source + "/json/*.json",
    fonts: source + "/assets/fonts/*.*",
    audio: source + "/assets/media/audio/*.*",
    images: source + "/assets/media/images/*.*",
    video: source + "/assets/media/video/*.*"
  },
  build: {
    pages: root + "/",
    styles: root + "/styles/",
    scripts: root + "/scripts/",
    json: root + "/json/",
    fonts: root + "/assets/fonts/",
    audio: root + "/assets/media/audio/",
    images: root + "/assets/media/images/",
    video: root + "/assets/media/video/"
  }
}


function pages() {
  return src( directories.source.pages )
    .pipe(when(
      argv.production,
      sourcemaps.init()
    ))
    .pipe(pages_file_include())
    .pipe(when(
      argv.development,
      preprocess({
        context: {
          mode: "development",
        }
      })
    ))
    .pipe(when(
      argv.production,
      pages_minifier({
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeEmptyElements: true,
        removeOptionalTags: true,
        useShortDoctype: true
      })
    ))
    .pipe(when(
      argv.production,
      sourcemaps.write(".")
    ))
    .pipe(dest(
      directories.build.pages
    ))
    .pipe(when(
      argv.development,
      browserSync.stream()
    ))
}

function styles() {
  return src( directories.source.styles )
    .pipe(when(
      argv.production,
      sourcemaps.init()
    ))
    .pipe(styles_sass())
    .pipe(when(
      argv.production,
      sourcemaps.write(".")
    ))
    .pipe(dest(
      directories.build.styles
    ))
    .pipe(when(
      argv.development,
      browserSync.stream()
    ))
}

function scripts() {
  return src( directories.source.scripts )
    .pipe(when(
      argv.production,
      sourcemaps.init()
    ))
    .pipe(scripts_rigger())
    .pipe(when(
      argv.production,
      sourcemaps.write(".")
    ))
    .pipe(dest(
      directories.build.scripts
    ))
    .pipe(when(
      argv.development,
      browserSync.stream()
    ))
}

function server() {
  browserSync.init({
    server: {
      baseDir: root,
    },
    port: argv.port || settings.port || 4307,
    ui: {
      port: argv.uiport || settings.uiport || 8080,
    },
    logPrefix: "gulp-configuration",
    open: false,
    reloadOnRestart: true,
    })

    watch( directories.source.pages, pages )
    watch( directories.source.styles, styles )
    watch( directories.source.scripts, scripts )
}

function main() {
  const production = parallel( pages, styles, scripts )
  const development = series( production, server )

  if ( !argv.production && !argv.development ) {
    if ( settings.mode != "--production" && settings.mode != "--development" ) {
      console.error( "Unknown flag:".red, (settings.mode).bold )
      process.exit( 1 )
    }
  }

  if ( settings.mode == "--production" || argv.production ) {
    exports.default = production
  } else if ( settings.mode == "--development" || argv.development ) {
    exports.default = development
  }
}

main()