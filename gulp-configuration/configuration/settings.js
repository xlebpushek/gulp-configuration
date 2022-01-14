const fs = require("fs")
const argv = require("minimist")


const external = argv(process.argv.slice(2), {
  string: [
    "root",
  ],
  boolean: [
    "production",
    "development"
  ],
  default: {
    production: false,
    production: false
  }
})
const internal = JSON.parse(fs.readFileSync(
  "./configuration/settings.json",
  "utf8"
))

const getRoot = (() => {
  let root = external.root || internal.root

  if (!root) root = process.cwd()

  return root
})()
const getMode = (() => {
  if (external.production) external.mode = "--production"
  if (external.development) external.mode = "--development"

  let mode = external.mode || internal.mode

  if (!mode) mode = "--development"

  return mode
})()

module.exports = {
  root: getRoot,
  mode: getMode
}