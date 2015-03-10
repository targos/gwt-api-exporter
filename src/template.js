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
        // Timer proxies
        fakeWindow.setTimeout = window.setTimeout.bind(window);
        fakeWindow.clearTimeout = window.clearTimeout.bind(window);
        fakeWindow.setInterval = window.setInterval.bind(window);
        fakeWindow.clearInterval = window.clearInterval.bind(window);
        // Other methods that can be used by GWT
        fakeWindow.addEventListener = window.addEventListener.bind(window);
        fakeWindow.getComputedStyle = window.getComputedStyle.bind(window);

        fakeWindow.document = window.document;
        if (typeof define === 'function' && define.amd) { // AMD
            define(function () {
                return getExports(fakeWindow);
            });
        } else { // Global
            var path = <%= exportsPath %>,
                l = path.length - 1,
                obj = window;
            for (var i = 0; i < l; i++) {
                obj = obj[path[i]] || (obj[path[i]] = {});
            }
            obj[path[l]] = getExports(fakeWindow);
        }
    }

})();
