(function () {
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

    var isBrowser, globalEnv;

    if (typeof window !== 'undefined') { // usual browser window
        isBrowser = true;
        globalEnv = window;
    } else if (typeof self !== 'undefined') { // Web Worker
        isBrowser = true;
        globalEnv = self;
    } else { // Node.js
        isBrowser = false;
        globalEnv = global;
    }

    var fakeWindow;
    if (isBrowser && !<%= useFake %>) {
        fakeWindow = globalEnv;
    } else {
        fakeWindow = {};
        fakeWindow.setTimeout = globalEnv.setTimeout.bind(globalEnv);
        fakeWindow.clearTimeout = globalEnv.clearTimeout.bind(globalEnv);
        fakeWindow.setInterval = globalEnv.setInterval.bind(globalEnv);
        fakeWindow.clearInterval = globalEnv.clearInterval.bind(globalEnv);
        if (isBrowser) {
            fakeWindow.document = globalEnv.document
        } else {
            fakeWindow.document = {};
        }
    }

    if (typeof module !== 'undefined' && module.exports) { // NodeJS
        module.exports = getExports(fakeWindow);
    } else if (typeof define === 'function' && define.amd) { // AMD
        define(function () {
            return getExports(fakeWindow);
        });
    } else { // Global
        var path = <%= exportsPath %>;
        var l = path.length - 1;
        var obj = globalEnv;
        for (var i = 0; i < l; i++) {
            obj = obj[path[i]] || (obj[path[i]] = {});
        }
        obj[path[l]] = getExports(fakeWindow);
    }

})();
