const Sftp = require('./sftp')
const Ftp = require('./ftp')
const Ssh = require('./ssh')

/**
 * usage:
 * const deploy = require('deploy-kit')
 * deploy.sftp({
 *   ...
 * })
 */

exports.sftp = function(options) {
  return new Sftp(options)
}

exports.ftp = function(options) {
  return new Ftp(options)
}

exports.ssh = function(options) {
  return new Ssh(options)
}
