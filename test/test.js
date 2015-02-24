'use strict';

var exporter = require('..');

describe('gwt-api-exporter', function () {
    it('should work with pretty file', function (done) {
        exporter({
            input: './test/example/gwt.pretty.js',
            exports: 'example'
        }).then(function () {
            done();
        }, done);
    });
    it('should work with obfuscated file', function (done) {
        exporter({
            input: './test/example/gwt.obf.js',
            exports: 'example'
        }).then(function () {
            done();
        }, done);
    });
});
