
const util = require('./util')
const Client = require('ssh2').Client
const conn = new Client()

function Ssh (options) {
  this.options = util.takeServerInfo(options.server, options.privateKey)
}

Ssh.prototype.exec = function (command) {
  conn.on('ready', () => {
    console.log('Client :: ready')
    conn.exec(command, (err, stream) => {
      if (err) throw err
      stream
        .on('close', (code, signal) => conn.end() )
        .on('data', (data) => console.log('' + data) )
        .stderr.on('data', (data) => console.log('STDERR: ' + data) )
    })
  })
  .connect(this.options)
}

module.exports = Ssh