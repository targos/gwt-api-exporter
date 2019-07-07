# [2.0.0](https://github.com/targos/gwt-api-exporter/compare/v1.2.1...v2.0.0) (2019-07-07)


### chore

* remove support for Node.js 4 and 6 ([8b6aad2](https://github.com/targos/gwt-api-exporter/commit/8b6aad2))


### Features

* add an option to extend the API before it is exported. ([795980a](https://github.com/targos/gwt-api-exporter/commit/795980a))


### BREAKING CHANGES

* Node.js 4 and 6 are no longer supported.



1.2.1 / 2016-01-09
==================

* fix: normalize detection of Window and Worker environments

1.2.0 / 2016-09-01
==================

* feat: add support for other CommonJS environments such as CouchDB

1.1.10 / 2016-08-16
===================

* fix: copy more global objects to fakeWindow 

1.1.9 / 2016-08-16
==================

* fix: copy Error in fakeWindow

1.1.8 / 2016-04-25
==================

* remove GWT-generated sourceURL

1.1.7 / 2016-04-20
==================

* always use window.document if available

1.1.6 / 2015-09-30
==================

* fix setting fakeWindow.document

1.1.5 / 2015-09-28
==================

* fix overwriting document in real window

1.1.4 / 2015-09-18
==================

* documentation improvements

1.1.3 / 2015-09-03
==================

* fix document object in web workers

1.1.2 / 2015-09-03
==================

* fix export template for webpack compatibility

1.1.1 / 2015-09-02
==================

* make it work in Web Workers

1.1.0 / 2015-03-10
==================

* add --no-fake option

1.0.1 / 2015-02-24
==================

* no more global variable

1.0.0 / 2015-02-09
==================

* first release
