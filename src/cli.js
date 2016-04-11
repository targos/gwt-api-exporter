#!/usr/bin/env node
'use strict';
const program = require('commander');

//noinspection JSCheckFunctionSignatures
program
    .version(require('../package.json').version)
    .option('-i, --input <file>', 'Input file')
    .option('-o, --output [file]', 'Output file', 'lib.js')
    .option('-e, --exports <path>', 'Exported path from GWT')
    .option('-p, --package [file]', 'Take information from a package.json file')
    .option('-t, --template [file]', 'Take information from a package.json file')
    .option('-f, --no-fake', 'Do not use fakeWindow in browser')
    .parse(process.argv);

require('./index')(program)
    .then(() => {
        console.log(`${require('path').resolve(program['output'])} written`);
    })
    .catch(err => {
        console.error(err.message);
        process.exit(1);
    });