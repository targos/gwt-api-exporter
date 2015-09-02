'use strict';

var exporter = require('..');

describe('gwt-api-exporter', function () {
    it('should work with pretty file', function () {
        return exporter({
            input: './test/example/gwt.pretty.js',
            exports: 'example'
        });
    });
    it('should work with obfuscated file', function () {
        return exporter({
            input: './test/example/gwt.obf.js',
            exports: 'example'
        });
    });
});
