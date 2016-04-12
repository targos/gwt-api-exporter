'use strict';
const exporter = require('..');
const mocha = require('mocha/lib/mocha.js');
const it = mocha.it;
const describe = mocha.describe;

describe('gwt-api-exporter', () => {
    it('should work with pretty file', () => exporter({
        input: './test/example/gwt.pretty.js',
        exports: 'example'
    }));

    it('should work with obfuscated file', () => exporter({
        input: './test/example/gwt.obf.js',
        exports: 'example'
    }));
});
