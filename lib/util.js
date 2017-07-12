var chalk = require('chalk')

exports.success = function(file) {
  file.to = file.to || file.dest
  var desc = chalk.cyan(`${file.filename} ${chalk.white('===>')} ${file.to}`)
  console.log(chalk.greenBright('upload success :'), desc)
}

exports.failure = function(file) {
  file.to = file.to || file.dest
  var desc = chalk.yellow(`${file.filename} ${chalk.white('===>')} ${file.to}`)
  console.log(chalk.redBright('upload failure :'), desc)
}