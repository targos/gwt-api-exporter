#!/usr/bin/env node

'use strict';

var exporter = require('./index');
var program = require('commander');
var pkgInfo = require('../package.json');

program
    .version(pkgInfo.version)
    .option('-i, --input <file>', 'Input file')
    .option('-o, --output [file]', 'Output file', 'lib.js')
    .option('-e, --exports <path>', 'Exported path from GWT')
    .option('-p, --package [file]', 'Take information from a package.json file')
    .parse(process.argv);

exporter(program).then(function () {
    console.log(require('path').resolve(program.output) + ' written');
}, function (e) {
    console.error(e.message);
    process.exit(1);
});
