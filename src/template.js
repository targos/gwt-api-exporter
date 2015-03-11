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

    var fakeWindow = {};

    if (typeof module !== 'undefined' && module.exports) { // NodeJS
        var timers = require('timers');
        fakeWindow.setTimeout = timers.setTimeout;
        fakeWindow.clearTimeout = timers.clearTimeout;
        fakeWindow.setInterval = timers.setInterval;
        fakeWindow.clearInterval = timers.clearInterval;
        fakeWindow.document = {};
        module.exports = getExports(fakeWindow);
    } else { // Browser
        if (<%= useFake %>) {
            // Timer proxies
            fakeWindow.setTimeout = window.setTimeout.bind(window);
            fakeWindow.clearTimeout = window.clearTimeout.bind(window);
            fakeWindow.setInterval = window.setInterval.bind(window);
            fakeWindow.clearInterval = window.clearInterval.bind(window);
            fakeWindow.document = window.document;
        } else {
            fakeWindow = window;
        }

        if (typeof define === 'function' && define.amd) { // AMD
            define(function () {
                return getExports(fakeWindow);
            });
        } else { // Global
            var path = <%= exportsPath %>;
            var l = path.length - 1;
            var obj = window;
            for (var i = 0; i < l; i++) {
                obj = obj[path[i]] || (obj[path[i]] = {});
            }
            obj[path[l]] = getExports(fakeWindow);
        }
    }

})();
