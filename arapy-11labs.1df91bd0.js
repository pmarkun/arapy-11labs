// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"aEb5F":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "e4fc2bc01df91bd0";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"llgqt":[function(require,module,exports,__globalThis) {
function e() {
    return (e = Object.assign ? Object.assign.bind() : function(e) {
        for(var n = 1; n < arguments.length; n++){
            var t = arguments[n];
            for(var o in t)({}).hasOwnProperty.call(t, o) && (e[o] = t[o]);
        }
        return e;
    }).apply(null, arguments);
}
var n = new Blob([
    '\n      const BIAS = 0x84;\n      const CLIP = 32635;\n      const encodeTable = [\n        0,0,1,1,2,2,2,2,3,3,3,3,3,3,3,3,\n        4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,\n        5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,\n        5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,\n        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,\n        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,\n        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,\n        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7\n      ];\n      \n      function encodeSample(sample) {\n        let sign;\n        let exponent;\n        let mantissa;\n        let muLawSample;\n        sign = (sample >> 8) & 0x80;\n        if (sign !== 0) sample = -sample;\n        sample = sample + BIAS;\n        if (sample > CLIP) sample = CLIP;\n        exponent = encodeTable[(sample>>7) & 0xFF];\n        mantissa = (sample >> (exponent+3)) & 0x0F;\n        muLawSample = ~(sign | (exponent << 4) | mantissa);\n        \n        return muLawSample;\n      }\n    \n      class RawAudioProcessor extends AudioWorkletProcessor {\n        constructor() {\n          super();\n                    \n          this.port.onmessage = ({ data }) => {\n            switch (data.type) {\n              case "setFormat":\n                this.isMuted = false;\n                this.buffer = []; // Initialize an empty buffer\n                this.bufferSize = data.sampleRate / 4;\n                this.format = data.format;\n\n                if (globalThis.LibSampleRate && sampleRate !== data.sampleRate) {\n                  globalThis.LibSampleRate.create(1, sampleRate, data.sampleRate).then(resampler => {\n                    this.resampler = resampler;\n                  });\n                }\n                break;\n              case "setMuted":\n                this.isMuted = data.isMuted;\n                break;\n            }\n          };\n        }\n        process(inputs) {\n          if (!this.buffer) {\n            return true;\n          }\n          \n          const input = inputs[0]; // Get the first input node\n          if (input.length > 0) {\n            let channelData = input[0]; // Get the first channel\'s data\n\n            // Resample the audio if necessary\n            if (this.resampler) {\n              channelData = this.resampler.full(channelData);\n            }\n\n            // Add channel data to the buffer\n            this.buffer.push(...channelData);\n            // Get max volume \n            let sum = 0.0;\n            for (let i = 0; i < channelData.length; i++) {\n              sum += channelData[i] * channelData[i];\n            }\n            const maxVolume = Math.sqrt(sum / channelData.length);\n            // Check if buffer size has reached or exceeded the threshold\n            if (this.buffer.length >= this.bufferSize) {\n              const float32Array = this.isMuted \n                ? new Float32Array(this.buffer.length)\n                : new Float32Array(this.buffer);\n\n              let encodedArray = this.format === "ulaw"\n                ? new Uint8Array(float32Array.length)\n                : new Int16Array(float32Array.length);\n\n              // Iterate through the Float32Array and convert each sample to PCM16\n              for (let i = 0; i < float32Array.length; i++) {\n                // Clamp the value to the range [-1, 1]\n                let sample = Math.max(-1, Math.min(1, float32Array[i]));\n\n                // Scale the sample to the range [-32768, 32767]\n                let value = sample < 0 ? sample * 32768 : sample * 32767;\n                if (this.format === "ulaw") {\n                  value = encodeSample(Math.round(value));\n                }\n\n                encodedArray[i] = value;\n              }\n\n              // Send the buffered data to the main script\n              this.port.postMessage([encodedArray, maxVolume]);\n\n              // Clear the buffer after sending\n              this.buffer = [];\n            }\n          }\n          return true; // Continue processing\n        }\n      }\n      registerProcessor("raw-audio-processor", RawAudioProcessor);\n  '
], {
    type: "application/javascript"
}), t = URL.createObjectURL(n);
function o() {
    return [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod"
    ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
var r = function() {
    function e(e, n, t, o) {
        this.context = void 0, this.analyser = void 0, this.worklet = void 0, this.inputStream = void 0, this.context = e, this.analyser = n, this.worklet = t, this.inputStream = o;
    }
    e.create = function(n) {
        var r = n.sampleRate, a = n.format, s = n.preferHeadphonesForIosDevices;
        try {
            var i = null, u = null;
            return Promise.resolve(function(n, c) {
                try {
                    var l = function() {
                        function n() {
                            function n() {
                                return Promise.resolve(i.audioWorklet.addModule(t)).then(function() {
                                    return Promise.resolve(navigator.mediaDevices.getUserMedia({
                                        audio: c
                                    })).then(function(n) {
                                        var t = i.createMediaStreamSource(u = n), o = new AudioWorkletNode(i, "raw-audio-processor");
                                        return o.port.postMessage({
                                            type: "setFormat",
                                            format: a,
                                            sampleRate: r
                                        }), t.connect(s), s.connect(o), Promise.resolve(i.resume()).then(function() {
                                            return new e(i, s, o, u);
                                        });
                                    });
                                });
                            }
                            var o = navigator.mediaDevices.getSupportedConstraints().sampleRate, s = (i = new window.AudioContext(o ? {
                                sampleRate: r
                            } : {})).createAnalyser(), l = function() {
                                if (!o) return Promise.resolve(i.audioWorklet.addModule("https://cdn.jsdelivr.net/npm/@alexanderolsen/libsamplerate-js@2.1.2/dist/libsamplerate.worklet.js")).then(function() {});
                            }();
                            return l && l.then ? l.then(n) : n();
                        }
                        var c = {
                            sampleRate: {
                                ideal: r
                            },
                            echoCancellation: {
                                ideal: !0
                            },
                            noiseSuppression: {
                                ideal: !0
                            }
                        }, l = function() {
                            if (o() && s) return Promise.resolve(window.navigator.mediaDevices.enumerateDevices()).then(function(e) {
                                var n = e.find(function(e) {
                                    return "audioinput" === e.kind && [
                                        "airpod",
                                        "headphone",
                                        "earphone"
                                    ].find(function(n) {
                                        return e.label.toLowerCase().includes(n);
                                    });
                                });
                                n && (c.deviceId = {
                                    ideal: n.deviceId
                                });
                            });
                        }();
                        return l && l.then ? l.then(n) : n();
                    }();
                } catch (e) {
                    return c(e);
                }
                return l && l.then ? l.then(void 0, c) : l;
            }(0, function(e) {
                var n, t;
                throw null == (n = u) || n.getTracks().forEach(function(e) {
                    return e.stop();
                }), null == (t = i) || t.close(), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    };
    var n = e.prototype;
    return n.close = function() {
        try {
            return this.inputStream.getTracks().forEach(function(e) {
                return e.stop();
            }), Promise.resolve(this.context.close()).then(function() {});
        } catch (e) {
            return Promise.reject(e);
        }
    }, n.setMuted = function(e) {
        this.worklet.port.postMessage({
            type: "setMuted",
            isMuted: e
        });
    }, e;
}(), a = new Blob([
    '\n      const decodeTable = [0,132,396,924,1980,4092,8316,16764];\n      \n      export function decodeSample(muLawSample) {\n        let sign;\n        let exponent;\n        let mantissa;\n        let sample;\n        muLawSample = ~muLawSample;\n        sign = (muLawSample & 0x80);\n        exponent = (muLawSample >> 4) & 0x07;\n        mantissa = muLawSample & 0x0F;\n        sample = decodeTable[exponent] + (mantissa << (exponent+3));\n        if (sign !== 0) sample = -sample;\n\n        return sample;\n      }\n      \n      class AudioConcatProcessor extends AudioWorkletProcessor {\n        constructor() {\n          super();\n          this.buffers = []; // Initialize an empty buffer\n          this.cursor = 0;\n          this.currentBuffer = null;\n          this.wasInterrupted = false;\n          this.finished = false;\n          \n          this.port.onmessage = ({ data }) => {\n            switch (data.type) {\n              case "setFormat":\n                this.format = data.format;\n                break;\n              case "buffer":\n                this.wasInterrupted = false;\n                this.buffers.push(\n                  this.format === "ulaw"\n                    ? new Uint8Array(data.buffer)\n                    : new Int16Array(data.buffer)\n                );\n                break;\n              case "interrupt":\n                this.wasInterrupted = true;\n                break;\n              case "clearInterrupted":\n                if (this.wasInterrupted) {\n                  this.wasInterrupted = false;\n                  this.buffers = [];\n                  this.currentBuffer = null;\n                }\n            }\n          };\n        }\n        process(_, outputs) {\n          let finished = false;\n          const output = outputs[0][0];\n          for (let i = 0; i < output.length; i++) {\n            if (!this.currentBuffer) {\n              if (this.buffers.length === 0) {\n                finished = true;\n                break;\n              }\n              this.currentBuffer = this.buffers.shift();\n              this.cursor = 0;\n            }\n\n            let value = this.currentBuffer[this.cursor];\n            if (this.format === "ulaw") {\n              value = decodeSample(value);\n            }\n            output[i] = value / 32768;\n            this.cursor++;\n\n            if (this.cursor >= this.currentBuffer.length) {\n              this.currentBuffer = null;\n            }\n          }\n\n          if (this.finished !== finished) {\n            this.finished = finished;\n            this.port.postMessage({ type: "process", finished });\n          }\n\n          return true; // Continue processing\n        }\n      }\n\n      registerProcessor("audio-concat-processor", AudioConcatProcessor);\n    '
], {
    type: "application/javascript"
}), s = URL.createObjectURL(a), i = function() {
    function e(e, n, t, o) {
        this.context = void 0, this.analyser = void 0, this.gain = void 0, this.worklet = void 0, this.context = e, this.analyser = n, this.gain = t, this.worklet = o;
    }
    return e.create = function(n) {
        var t = n.sampleRate, o = n.format;
        try {
            var r = null;
            return Promise.resolve(function(n, a) {
                try {
                    var i, u, c = (i = (r = new AudioContext({
                        sampleRate: t
                    })).createAnalyser(), (u = r.createGain()).connect(i), i.connect(r.destination), Promise.resolve(r.audioWorklet.addModule(s)).then(function() {
                        var n = new AudioWorkletNode(r, "audio-concat-processor");
                        return n.port.postMessage({
                            type: "setFormat",
                            format: o
                        }), n.connect(u), Promise.resolve(r.resume()).then(function() {
                            return new e(r, i, u, n);
                        });
                    }));
                } catch (e) {
                    return a(e);
                }
                return c && c.then ? c.then(void 0, a) : c;
            }(0, function(e) {
                var n;
                throw null == (n = r) || n.close(), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    }, e.prototype.close = function() {
        try {
            return Promise.resolve(this.context.close()).then(function() {});
        } catch (e) {
            return Promise.reject(e);
        }
    }, e;
}(), u = function() {
    function e(e, n, t, o) {
        var r = this;
        this.socket = void 0, this.conversationId = void 0, this.inputFormat = void 0, this.outputFormat = void 0, this.queue = [], this.disconnectionDetails = null, this.onDisconnectCallback = null, this.onMessageCallback = null, this.socket = e, this.conversationId = n, this.inputFormat = t, this.outputFormat = o, this.socket.addEventListener("error", function(e) {
            setTimeout(function() {
                return r.disconnect({
                    reason: "error",
                    message: "The connection was closed due to a socket error.",
                    context: e
                });
            }, 0);
        }), this.socket.addEventListener("close", function(e) {
            r.disconnect(1e3 === e.code ? {
                reason: "agent",
                context: e
            } : {
                reason: "error",
                message: e.reason || "The connection was closed by the server.",
                context: e
            });
        }), this.socket.addEventListener("message", function(e) {
            try {
                var n = JSON.parse(e.data);
                if (!n.type) return;
                r.onMessageCallback ? r.onMessageCallback(n) : r.queue.push(n);
            } catch (e) {}
        });
    }
    e.create = function(n) {
        try {
            var t = null;
            return Promise.resolve(function(o, r) {
                try {
                    var a, s, i, u, l = (s = null != (a = n.origin) ? a : "wss://api.elevenlabs.io", i = n.signedUrl ? n.signedUrl : s + "/v1/convai/conversation?agent_id=" + n.agentId, u = [
                        "convai"
                    ], n.authorization && u.push("bearer." + n.authorization), t = new WebSocket(i, u), Promise.resolve(new Promise(function(e, o) {
                        t.addEventListener("open", function() {
                            var e, o, r, a, s, i = {
                                type: "conversation_initiation_client_data"
                            };
                            n.overrides && (i.conversation_config_override = {
                                agent: {
                                    prompt: null == (o = n.overrides.agent) ? void 0 : o.prompt,
                                    first_message: null == (r = n.overrides.agent) ? void 0 : r.firstMessage,
                                    language: null == (a = n.overrides.agent) ? void 0 : a.language
                                },
                                tts: {
                                    voice_id: null == (s = n.overrides.tts) ? void 0 : s.voiceId
                                }
                            }), n.customLlmExtraBody && (i.custom_llm_extra_body = n.customLlmExtraBody), n.dynamicVariables && (i.dynamic_variables = n.dynamicVariables), null == (e = t) || e.send(JSON.stringify(i));
                        }, {
                            once: !0
                        }), t.addEventListener("error", function(e) {
                            setTimeout(function() {
                                return o(e);
                            }, 0);
                        }), t.addEventListener("close", o), t.addEventListener("message", function(n) {
                            var t = JSON.parse(n.data);
                            t.type && ("conversation_initiation_metadata" === t.type ? e(t.conversation_initiation_metadata_event) : console.warn("First received message is not conversation metadata."));
                        }, {
                            once: !0
                        });
                    })).then(function(n) {
                        var o = n.conversation_id, r = n.agent_output_audio_format, a = n.user_input_audio_format, s = c(null != a ? a : "pcm_16000"), i = c(r);
                        return new e(t, o, s, i);
                    }));
                } catch (e) {
                    return r(e);
                }
                return l && l.then ? l.then(void 0, r) : l;
            }(0, function(e) {
                var n;
                throw null == (n = t) || n.close(), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    };
    var n = e.prototype;
    return n.close = function() {
        this.socket.close();
    }, n.sendMessage = function(e) {
        this.socket.send(JSON.stringify(e));
    }, n.onMessage = function(e) {
        this.onMessageCallback = e, this.queue.forEach(e), this.queue = [];
    }, n.onDisconnect = function(e) {
        this.onDisconnectCallback = e, this.disconnectionDetails && e(this.disconnectionDetails);
    }, n.disconnect = function(e) {
        var n;
        this.disconnectionDetails || (this.disconnectionDetails = e, null == (n = this.onDisconnectCallback) || n.call(this, e));
    }, e;
}();
function c(e) {
    var n = e.split("_"), t = n[0], o = n[1];
    if (![
        "pcm",
        "ulaw"
    ].includes(t)) throw Error("Invalid format: " + e);
    var r = parseInt(o);
    if (isNaN(r)) throw Error("Invalid sample rate: " + o);
    return {
        format: t,
        sampleRate: r
    };
}
function l(e, n) {
    try {
        var t = e();
    } catch (e) {
        return n(e);
    }
    return t && t.then ? t.then(void 0, n) : t;
}
var d = {
    clientTools: {}
}, h = {
    onConnect: function() {},
    onDebug: function() {},
    onDisconnect: function() {},
    onError: function() {},
    onMessage: function() {},
    onAudio: function() {},
    onModeChange: function() {},
    onStatusChange: function() {},
    onCanSendFeedbackChange: function() {}
}, p = function() {
    function n(e, n, t, o, r) {
        var a = this, s = this, i = this;
        this.options = void 0, this.connection = void 0, this.input = void 0, this.output = void 0, this.wakeLock = void 0, this.lastInterruptTimestamp = 0, this.mode = "listening", this.status = "connecting", this.inputFrequencyData = void 0, this.outputFrequencyData = void 0, this.volume = 1, this.currentEventId = 1, this.lastFeedbackEventId = 1, this.canSendFeedback = !1, this.endSession = function() {
            return i.endSessionWithDetails({
                reason: "user"
            });
        }, this.endSessionWithDetails = function(e) {
            try {
                var n = function() {
                    return a.connection.close(), Promise.resolve(a.input.close()).then(function() {
                        return Promise.resolve(a.output.close()).then(function() {
                            a.updateStatus("disconnected"), a.options.onDisconnect(e);
                        });
                    });
                };
                if ("connected" !== a.status && "connecting" !== a.status) return Promise.resolve();
                a.updateStatus("disconnecting");
                var t = l(function() {
                    var e;
                    return Promise.resolve(null == (e = a.wakeLock) ? void 0 : e.release()).then(function() {
                        a.wakeLock = null;
                    });
                }, function() {});
                return Promise.resolve(t && t.then ? t.then(n) : n());
            } catch (e) {
                return Promise.reject(e);
            }
        }, this.updateMode = function(e) {
            e !== i.mode && (i.mode = e, i.options.onModeChange({
                mode: e
            }));
        }, this.updateStatus = function(e) {
            e !== i.status && (i.status = e, i.options.onStatusChange({
                status: e
            }));
        }, this.updateCanSendFeedback = function() {
            var e = i.currentEventId !== i.lastFeedbackEventId;
            i.canSendFeedback !== e && (i.canSendFeedback = e, i.options.onCanSendFeedbackChange({
                canSendFeedback: e
            }));
        }, this.onMessage = function(e) {
            try {
                switch(e.type){
                    case "interruption":
                        return e.interruption_event && (s.lastInterruptTimestamp = e.interruption_event.event_id), s.fadeOutAudio(), Promise.resolve();
                    case "agent_response":
                        return s.options.onMessage({
                            source: "ai",
                            message: e.agent_response_event.agent_response
                        }), Promise.resolve();
                    case "user_transcript":
                        return s.options.onMessage({
                            source: "user",
                            message: e.user_transcription_event.user_transcript
                        }), Promise.resolve();
                    case "internal_tentative_agent_response":
                        return s.options.onDebug({
                            type: "tentative_agent_response",
                            response: e.tentative_agent_response_internal_event.tentative_agent_response
                        }), Promise.resolve();
                    case "client_tool_call":
                        return Promise.resolve(function() {
                            if (s.options.clientTools.hasOwnProperty(e.client_tool_call.tool_name)) {
                                var n = l(function() {
                                    return Promise.resolve(s.options.clientTools[e.client_tool_call.tool_name](e.client_tool_call.parameters)).then(function(n) {
                                        var t = "object" == typeof n ? JSON.stringify(n) : String(n);
                                        s.connection.sendMessage({
                                            type: "client_tool_result",
                                            tool_call_id: e.client_tool_call.tool_call_id,
                                            result: t,
                                            is_error: !1
                                        });
                                    });
                                }, function(n) {
                                    s.onError("Client tool execution failed with following error: " + (null == n ? void 0 : n.message), {
                                        clientToolName: e.client_tool_call.tool_name
                                    }), s.connection.sendMessage({
                                        type: "client_tool_result",
                                        tool_call_id: e.client_tool_call.tool_call_id,
                                        result: "Client tool execution failed: " + (null == n ? void 0 : n.message),
                                        is_error: !0
                                    });
                                });
                                if (n && n.then) return n.then(function() {});
                            } else {
                                if (s.options.onUnhandledClientToolCall) return void s.options.onUnhandledClientToolCall(e.client_tool_call);
                                s.onError("Client tool with name " + e.client_tool_call.tool_name + " is not defined on client", {
                                    clientToolName: e.client_tool_call.tool_name
                                }), s.connection.sendMessage({
                                    type: "client_tool_result",
                                    tool_call_id: e.client_tool_call.tool_call_id,
                                    result: "Client tool with name " + e.client_tool_call.tool_name + " is not defined on client",
                                    is_error: !0
                                });
                            }
                        }());
                    case "audio":
                        return s.lastInterruptTimestamp <= e.audio_event.event_id && (s.options.onAudio(e.audio_event.audio_base_64), s.addAudioBase64Chunk(e.audio_event.audio_base_64), s.currentEventId = e.audio_event.event_id, s.updateCanSendFeedback(), s.updateMode("speaking")), Promise.resolve();
                    case "ping":
                        return s.connection.sendMessage({
                            type: "pong",
                            event_id: e.ping_event.event_id
                        }), Promise.resolve();
                    default:
                        return s.options.onDebug(e), Promise.resolve();
                }
            } catch (e) {
                return Promise.reject(e);
            }
        }, this.onInputWorkletMessage = function(e) {
            var n;
            "connected" === i.status && i.connection.sendMessage({
                user_audio_chunk: (n = new Uint8Array(e.data[0].buffer), window.btoa(String.fromCharCode.apply(String, n)))
            });
        }, this.onOutputWorkletMessage = function(e) {
            var n = e.data;
            "process" === n.type && i.updateMode(n.finished ? "listening" : "speaking");
        }, this.addAudioBase64Chunk = function(e) {
            i.output.gain.gain.value = i.volume, i.output.worklet.port.postMessage({
                type: "clearInterrupted"
            }), i.output.worklet.port.postMessage({
                type: "buffer",
                buffer: function(e) {
                    for(var n = window.atob(e), t = n.length, o = new Uint8Array(t), r = 0; r < t; r++)o[r] = n.charCodeAt(r);
                    return o.buffer;
                }(e)
            });
        }, this.fadeOutAudio = function() {
            i.updateMode("listening"), i.output.worklet.port.postMessage({
                type: "interrupt"
            }), i.output.gain.gain.exponentialRampToValueAtTime(1e-4, i.output.context.currentTime + 2), setTimeout(function() {
                i.output.gain.gain.value = i.volume, i.output.worklet.port.postMessage({
                    type: "clearInterrupted"
                });
            }, 2e3);
        }, this.onError = function(e, n) {
            console.error(e, n), i.options.onError(e, n);
        }, this.calculateVolume = function(e) {
            if (0 === e.length) return 0;
            for(var n = 0, t = 0; t < e.length; t++)n += e[t] / 255;
            return (n /= e.length) < 0 ? 0 : n > 1 ? 1 : n;
        }, this.getId = function() {
            return i.connection.conversationId;
        }, this.isOpen = function() {
            return "connected" === i.status;
        }, this.setVolume = function(e) {
            i.volume = e.volume;
        }, this.setMicMuted = function(e) {
            i.input.setMuted(e);
        }, this.getInputByteFrequencyData = function() {
            return null != i.inputFrequencyData || (i.inputFrequencyData = new Uint8Array(i.input.analyser.frequencyBinCount)), i.input.analyser.getByteFrequencyData(i.inputFrequencyData), i.inputFrequencyData;
        }, this.getOutputByteFrequencyData = function() {
            return null != i.outputFrequencyData || (i.outputFrequencyData = new Uint8Array(i.output.analyser.frequencyBinCount)), i.output.analyser.getByteFrequencyData(i.outputFrequencyData), i.outputFrequencyData;
        }, this.getInputVolume = function() {
            return i.calculateVolume(i.getInputByteFrequencyData());
        }, this.getOutputVolume = function() {
            return i.calculateVolume(i.getOutputByteFrequencyData());
        }, this.sendFeedback = function(e) {
            i.canSendFeedback ? (i.connection.sendMessage({
                type: "feedback",
                score: e ? "like" : "dislike",
                event_id: i.currentEventId
            }), i.lastFeedbackEventId = i.currentEventId, i.updateCanSendFeedback()) : console.warn(0 === i.lastFeedbackEventId ? "Cannot send feedback: the conversation has not started yet." : "Cannot send feedback: feedback has already been sent for the current response.");
        }, this.sendContextualUpdate = function(e) {
            i.connection.sendMessage({
                type: "contextual_update",
                text: e
            });
        }, this.options = e, this.connection = n, this.input = t, this.output = o, this.wakeLock = r, this.options.onConnect({
            conversationId: n.conversationId
        }), this.connection.onDisconnect(this.endSessionWithDetails), this.connection.onMessage(this.onMessage), this.input.worklet.port.onmessage = this.onInputWorkletMessage, this.output.worklet.port.onmessage = this.onOutputWorkletMessage, this.updateStatus("connected");
    }
    return n.startSession = function(t) {
        try {
            var a = function() {
                return l(function() {
                    return Promise.resolve(navigator.mediaDevices.getUserMedia({
                        audio: !0
                    })).then(function(a) {
                        function l() {
                            return Promise.resolve(u.create(t)).then(function(o) {
                                return p = o, Promise.resolve(Promise.all([
                                    r.create(e({}, p.inputFormat, {
                                        preferHeadphonesForIosDevices: t.preferHeadphonesForIosDevices
                                    })),
                                    i.create(p.outputFormat)
                                ])).then(function(e) {
                                    var t;
                                    return c = e[0], f = e[1], null == (t = m) || t.getTracks().forEach(function(e) {
                                        return e.stop();
                                    }), m = null, new n(s, p, c, f, v);
                                });
                            });
                        }
                        m = a;
                        var d, h, g, y = null != (h = t.connectionDelay) ? h : {
                            default: 0,
                            android: 3e3
                        }, _ = y.default;
                        /android/i.test(navigator.userAgent) ? _ = null != (g = y.android) ? g : _ : o() && (_ = null != (d = y.ios) ? d : _);
                        var w = function() {
                            if (_ > 0) return Promise.resolve(new Promise(function(e) {
                                return setTimeout(e, _);
                            })).then(function() {});
                        }();
                        return w && w.then ? w.then(l) : l();
                    });
                }, function(e) {
                    var n, t, o;
                    return s.onStatusChange({
                        status: "disconnected"
                    }), null == (n = m) || n.getTracks().forEach(function(e) {
                        return e.stop();
                    }), null == (t = p) || t.close(), Promise.resolve(null == (o = c) ? void 0 : o.close()).then(function() {
                        var n;
                        return Promise.resolve(null == (n = f) ? void 0 : n.close()).then(function() {
                            function n() {
                                throw e;
                            }
                            var t = l(function() {
                                var e;
                                return Promise.resolve(null == (e = v) ? void 0 : e.release()).then(function() {
                                    v = null;
                                });
                            }, function() {});
                            return t && t.then ? t.then(n) : n();
                        });
                    });
                });
            }, s = e({}, d, h, t);
            s.onStatusChange({
                status: "connecting"
            }), s.onCanSendFeedbackChange({
                canSendFeedback: !1
            });
            var c = null, p = null, f = null, m = null, v = null, g = function(e) {
                if (null == (e = t.useWakeLock) || e) {
                    var n = l(function() {
                        return Promise.resolve(navigator.wakeLock.request("screen")).then(function(e) {
                            v = e;
                        });
                    }, function() {});
                    if (n && n.then) return n.then(function() {});
                }
            }();
            return Promise.resolve(g && g.then ? g.then(a) : a());
        } catch (e) {
            return Promise.reject(e);
        }
    }, n;
}();
const f = document.getElementById("startBtn"), m = document.getElementById("stopBtn"), v = document.getElementById("status");
let g = null, y = null;
const _ = new URLSearchParams(window.location.search);
let w = {
    name: _.get("name"),
    agentId: _.get("id")
};
(async ()=>{
    if (!w.agentId) try {
        let e = await fetch(`agents/${w.name}.json`);
        w = await e.json(), console.log("Config loaded:", w);
    } catch (e) {
        console.error("Error loading config:", e);
    }
    if (document.getElementById("name").textContent = w.name, !w.agentId) {
        let e = document.getElementById("startBtn");
        e.disabled = !0, e.innerText = "Agente n\xe3o encontrado!";
    }
})();
const b = (e)=>{
    v.textContent = "Status: " + e;
};
async function k() {
    try {
        await navigator.mediaDevices.getUserMedia({
            audio: !0
        }), b("Microfone liberado"), w.startAudio && (f.classList.add("hidden"), m.classList.remove("hidden"), (y = new Audio(w.startAudio)).play(), b("Reproduzindo \xe1udio de boas-vindas"), await new Promise((e)=>{
            y.onended = e;
        })), g = await p.startSession({
            agentId: w.agentId,
            onConnect: ()=>{
                console.log("Conectado ao agente!"), b("Conectado");
            },
            onDisconnect: ()=>{
                console.log("Conex\xe3o encerrada."), b("Desconectado");
            },
            onMessage: (e)=>{
                console.log("Mensagem recebida:", e);
            },
            onError: (e)=>{
                console.error("Erro na sess\xe3o:", e), b("Erro");
            },
            onStatusChange: (e)=>{
                console.log("Status alterado:", e);
            },
            onModeChange: (e)=>{
                console.log("Modo alterado:", e);
            }
        });
    } catch (e) {
        console.error("Erro ao iniciar a conversa:", e), b("Erro ao iniciar");
    }
}
async function S() {
    y && (y.pause(), y = null), g && (await g.endSession(), g = null), b("Desconectado"), f.classList.remove("hidden"), m.classList.add("hidden");
}
f.addEventListener("click", k), m.addEventListener("click", S);

},{}]},["aEb5F","llgqt"], "llgqt", "parcelRequire94c2", {})

//# sourceMappingURL=arapy-11labs.1df91bd0.js.map
