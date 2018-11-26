const path = require('path')
const fs = require('fs')
const zipObject = require('lodash/zipObject')
const has = require('lodash/has')
const isEmpty = require('lodash/isEmpty')

const client = require('./')

const configFile = path.resolve(process.cwd(), 'deploy.config.js')
if (!fs.existsSync(configFile)) {
  console.log(`No configuration file found, create "deploy.config.js" in the root directory.`)
  process.exit(0)
}
const config = require(configFile)

const { target, argvs } = getArgvs()
const Options = config[target]

if (!Options) {
  console.log(`No configuration found.`)
  process.exit(0)
}
console.log(`Concent to the Server ==> ${Options.name}`)
var ftpType = getFtpType(Options)
client[ftpType](Options[ftpType]).exec(null, err => {
  runScripts(Options, argvs, ftpType)
})

function getArgvs() {
  let { target } = zipObject([,,'target'], process.argv)
  let argvs = process.argv.filter((o, i) => i > 2 && /^(\-){2}/.test(o))
  return { target, argvs }
}

function getFtpType (options) {
  return Object.keys(options).find( o => /(ftp)$/.test(o) )
}

function runScripts (options, argvs, type = 'ftp') {
  if (type === 'ftp') return
  for (let argv of argvs) {
    let argvValue = argv.match(/^(\-){2}(script)(\=)([^&]*)(&|$)/)
    if (!argvValue) continue
    let { key, val } = zipObject([,,'key',,'val'], argvValue)
    if (!val) continue
    let isArgv = has(Options, `${key}s.${val}`) && !isEmpty(options[`${key}s`][`${val}`])
    if (!isArgv) continue
    let scripts = options[`${key}s`][`${val}`]
    let execSh = Array.isArray(scripts) ? scripts.join(' && ') : scripts.toString()
    client.ssh(options[type]).exec(execSh)
  }
}