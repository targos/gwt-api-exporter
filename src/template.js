function noop() {}

function getExports($wnd) {
  const $doc = $wnd.document;
  const $gwt = {};
  const navigator = {
    userAgent: 'webkit'
  };

  const __gwtModuleFunction = noop;
  __gwtModuleFunction.__moduleStartupDone = noop;
  const $sendStats = noop;
  let $moduleName, $moduleBase;

  // Start GWT code <%= gwtContent %>
  // End GWT code

  const toReturn = $wnd<%= exportsName %>;

  toReturn.version = '<%= version %>';

  return toReturn;
}

const isBrowserWindow = typeof window !== 'undefined' && typeof window.document !== 'undefined';
let gwtWindow;
if (isBrowserWindow && !<%= useFake %>) {
  gwtWindow = window;
} else {
  gwtWindow = {
    document: {
      compatMode: 'CSS1Compat',
    }
  };
  gwtWindow.setTimeout = globalThis.setTimeout ? globalThis.setTimeout.bind(globalThis) : noop;
  gwtWindow.clearTimeout = globalThis.clearTimeout ? globalThis.clearTimeout.bind(globalThis) : noop;
  gwtWindow.setInterval = globalThis.setInterval ? globalThis.setInterval.bind(globalThis) : noop;
  gwtWindow.clearInterval = globalThis.clearInterval ? globalThis.clearInterval.bind(globalThis) : noop;
  gwtWindow.Error = globalThis.Error;
  gwtWindow.Map = globalThis.Map;
  gwtWindow.Math = globalThis.Math;
  gwtWindow.RegExp = globalThis.RegExp;
  gwtWindow.TypeError = globalThis.TypeError;
}

const exportedApi = getExports(gwtWindow);

export default exportedApi;
