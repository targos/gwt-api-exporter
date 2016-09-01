(function (root) {
    'use strict';

    function getExports($wnd) {

        var $doc = $wnd.document;
        var $gwt = {};
        var navigator = {
            userAgent: 'webkit'
        };

        function noop(){}

        var __gwtModuleFunction = noop;
        __gwtModuleFunction.__moduleStartupDone = noop;
        var $sendStats = noop;
        var $moduleName, $moduleBase;

        // Start GWT code <%= gwtContent %>
        // End GWT code

        var toReturn = $wnd<%= exportsName %>;

        toReturn.version = '<%= version %>';

        return toReturn;
    }

    var isBrowser, globalEnv, document;

    if (typeof window !== 'undefined') { // usual browser window
        isBrowser = true;
        globalEnv = window;
        document = window.document;
    } else if (typeof self !== 'undefined') { // Web Worker
        isBrowser = true;
        globalEnv = self;
        document = {};
    } else if (typeof global !== 'undefined') { // Node.js
        isBrowser = false;
        globalEnv = global;
        document = {};
    } else { // Other environment (example: CouchDB)
        isBrowser = false;
        globalEnv = root;
        document = {};
    }

    var fakeWindow;
    if (isBrowser && !<%= useFake %>) {
        fakeWindow = globalEnv;
    } else {
        fakeWindow = {};
        fakeWindow.setTimeout = globalEnv.setTimeout ? globalEnv.setTimeout.bind(globalEnv) : noop;
        fakeWindow.clearTimeout = globalEnv.clearTimeout ? globalEnv.clearTimeout.bind(globalEnv) : noop;
        fakeWindow.setInterval = globalEnv.setInterval ? globalEnv.setInterval.bind(globalEnv) : noop;
        fakeWindow.clearInterval = globalEnv.clearInterval ? globalEnv.clearInterval.bind(globalEnv) : noop;
        // required since GWT 2.8.0
        fakeWindow.Error = globalEnv.Error;
        fakeWindow.Math = globalEnv.Math;
        fakeWindow.RegExp = globalEnv.RegExp;
        fakeWindow.TypeError = globalEnv.TypeError;
    }

    if (!fakeWindow.document) {
        fakeWindow.document = document;
    }

    var exportedApi = getExports(fakeWindow);

    if (typeof exports !== 'undefined') { // NodeJS
        fillExports(exportedApi, exports);
    } else if (typeof define === 'function' && define.amd) { // AMD
        define(function () {
            var exportsObj = {};
            fillExports(exportedApi, exportsObj);
            return exportsObj;
        });
    } else { // Global
        var path = <%= exportsPath %>;
        var l = path.length - 1;
        var obj = globalEnv;
        for (var i = 0; i < l; i++) {
            obj = obj[path[i]] || (obj[path[i]] = {});
        }
        obj[path[l]] = {};
        fillExports(exportedApi, obj[path[l]]);
    }

    function fillExports(obj, exports) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            exports[keys[i]] = obj[keys[i]];
        }
    }

    function noop() {}

})(this);
