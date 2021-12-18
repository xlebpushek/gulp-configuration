const fs = require( "fs" )
const del = require( "del" )
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
const concatenation = require( "gulp-concat" )
const sourcemaps = require( "gulp-sourcemaps" )
const preprocess = require( "gulp-preprocess" )

const pages_minifier = require( "gulp-htmlmin" )
const pages_file_include = require( "gulp-file-include" )

const scripts_rigger = require( "gulp-rigger" )
const styles_sass = require( "gulp-sass" )( require("sass") )

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
const build = path.join(
  root,
  ".build"
)

const directories = {
  source: {
    pages: source + "/pages/libraries/**/index.html",
    styles: source + "/styles/**/*.scss",
    scripts: source + "/scripts/**/*.js",
    json: source + "/json/**/*.json",
    fonts: source + "/assets/fonts/**/*.*",
    icons: source + "/assets/media/icons/**/*.ico",
    audio: source + "/assets/media/audio/**/*.*",
    video: source + "/assets/media/video/**/*.*",
    images: source + "/assets/media/images/**/*.*"
  },
  build: {
    pages: build,
    styles: build + "/styles",
    scripts: build + "/scripts",
    json: build + "/json",
    icons: build + "/assets/media/icons",
    audio: build + "/assets/media/audio",
    video: build + "/assets/media/video",
    images: build + "/assets/media/images"
  }
}


function clean(path) {
  return del.sync( path, {force: true} )
}

function pages() {
  clean(path.join(
    directories.build.pages,
    "/**/index.html"
  ))
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
  clean( directories.build.styles )
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
  clean( directories.build.scripts )
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

function json() {
  clean( directories.build.json )
  return src( directories.source.json )
    .pipe(dest(
      directories.build.json
    ))
    .pipe(when(
      argv.development,
      browserSync.stream()
    ))
}

function icons() {
  clean( directories.build.icons )
  return src( directories.source.icons )
    .pipe(dest(
      directories.build.icons
    ))
    .pipe(when(
      argv.development,
      browserSync.stream()
    ))
}

function audio() {
  clean(directories.build.audio)
  return src( directories.source.audio )
    .pipe(dest(
      directories.build.audio
    ))
    .pipe(when(
      argv.development,
      browserSync.stream()
    ))
}

function video() {
  clean( directories.build.video )
  return src( directories.source.video )
    .pipe(dest(
      directories.build.video
    ))
    .pipe(when(
      argv.development,
      browserSync.stream()
    ))
}

function images() {
  clean( directories.build.images )
  return src( directories.source.images )
    .pipe(dest(
      directories.build.images
    ))
    .pipe(when(
      argv.development,
      browserSync.stream()
    ))
}

function server() {
  browserSync.init({
    server: {
      baseDir: build,
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
    watch( directories.source.json, json )
    watch( directories.source.icons, icons )
    watch( directories.source.audio, audio )
    watch( directories.source.video, video )
    watch( directories.source.images, images )

}

function main() {
  const production = parallel( pages, styles, scripts, json, icons, audio, video, images )
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