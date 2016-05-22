#!/usr/bin/env node

var join = require('path').join
var express = require('express')
var ramlStore = require('express-raml-store')
var open = require('open')

var argv = require('yargs')
  .usage('Usage: $0 -p [num]')
  .option('p', {
    alias: 'port',
    default: 3000,
    describe: 'Port number to run the API designer',
    type: 'number'
  }).option('d', {
    alias: 'directory',
    describe: 'Directory relative to this script pwd that contains the directory of raml files',
    type: 'string'
  })
  .argv

var app = express()

app.use('/', ramlStore(join(__dirname, argv.d)))

app.listen(argv.p, function () {
  console.log('API designer running on port ' + argv.p + '...')

  open('http://localhost:' + argv.p)
})
