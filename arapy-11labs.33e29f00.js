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
})({"glgbu":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "eda868fb33e29f00";
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

},{}],"fF8uF":[function(require,module,exports,__globalThis) {
function e() {
    return (e = Object.assign ? Object.assign.bind() : function(e) {
        for(var t = 1; t < arguments.length; t++){
            var n = arguments[t];
            for(var o in n)({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
        return e;
    }).apply(null, arguments);
}
var t = new Blob([
    '\n      const BIAS = 0x84;\n      const CLIP = 32635;\n      const encodeTable = [\n        0,0,1,1,2,2,2,2,3,3,3,3,3,3,3,3,\n        4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,\n        5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,\n        5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,\n        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,\n        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,\n        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,\n        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,\n        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7\n      ];\n      \n      function encodeSample(sample) {\n        let sign;\n        let exponent;\n        let mantissa;\n        let muLawSample;\n        sign = (sample >> 8) & 0x80;\n        if (sign !== 0) sample = -sample;\n        sample = sample + BIAS;\n        if (sample > CLIP) sample = CLIP;\n        exponent = encodeTable[(sample>>7) & 0xFF];\n        mantissa = (sample >> (exponent+3)) & 0x0F;\n        muLawSample = ~(sign | (exponent << 4) | mantissa);\n        \n        return muLawSample;\n      }\n    \n      class RawAudioProcessor extends AudioWorkletProcessor {\n        constructor() {\n          super();\n                    \n          this.port.onmessage = ({ data }) => {\n            switch (data.type) {\n              case "setFormat":\n                this.isMuted = false;\n                this.buffer = []; // Initialize an empty buffer\n                this.bufferSize = data.sampleRate / 4;\n                this.format = data.format;\n\n                if (globalThis.LibSampleRate && sampleRate !== data.sampleRate) {\n                  globalThis.LibSampleRate.create(1, sampleRate, data.sampleRate).then(resampler => {\n                    this.resampler = resampler;\n                  });\n                }\n                break;\n              case "setMuted":\n                this.isMuted = data.isMuted;\n                break;\n            }\n          };\n        }\n        process(inputs) {\n          if (!this.buffer) {\n            return true;\n          }\n          \n          const input = inputs[0]; // Get the first input node\n          if (input.length > 0) {\n            let channelData = input[0]; // Get the first channel\'s data\n\n            // Resample the audio if necessary\n            if (this.resampler) {\n              channelData = this.resampler.full(channelData);\n            }\n\n            // Add channel data to the buffer\n            this.buffer.push(...channelData);\n            // Get max volume \n            let sum = 0.0;\n            for (let i = 0; i < channelData.length; i++) {\n              sum += channelData[i] * channelData[i];\n            }\n            const maxVolume = Math.sqrt(sum / channelData.length);\n            // Check if buffer size has reached or exceeded the threshold\n            if (this.buffer.length >= this.bufferSize) {\n              const float32Array = this.isMuted \n                ? new Float32Array(this.buffer.length)\n                : new Float32Array(this.buffer);\n\n              let encodedArray = this.format === "ulaw"\n                ? new Uint8Array(float32Array.length)\n                : new Int16Array(float32Array.length);\n\n              // Iterate through the Float32Array and convert each sample to PCM16\n              for (let i = 0; i < float32Array.length; i++) {\n                // Clamp the value to the range [-1, 1]\n                let sample = Math.max(-1, Math.min(1, float32Array[i]));\n\n                // Scale the sample to the range [-32768, 32767]\n                let value = sample < 0 ? sample * 32768 : sample * 32767;\n                if (this.format === "ulaw") {\n                  value = encodeSample(Math.round(value));\n                }\n\n                encodedArray[i] = value;\n              }\n\n              // Send the buffered data to the main script\n              this.port.postMessage([encodedArray, maxVolume]);\n\n              // Clear the buffer after sending\n              this.buffer = [];\n            }\n          }\n          return true; // Continue processing\n        }\n      }\n      registerProcessor("raw-audio-processor", RawAudioProcessor);\n  '
], {
    type: "application/javascript"
}), n = URL.createObjectURL(t);
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
var a = function() {
    function e(e, t, n, o) {
        this.context = void 0, this.analyser = void 0, this.worklet = void 0, this.inputStream = void 0, this.context = e, this.analyser = t, this.worklet = n, this.inputStream = o;
    }
    e.create = function(t) {
        var a = t.sampleRate, i = t.format, r = t.preferHeadphonesForIosDevices;
        try {
            var s = null, l = null;
            return Promise.resolve(function(t, c) {
                try {
                    var u = function() {
                        function t() {
                            function t() {
                                return Promise.resolve(s.audioWorklet.addModule(n)).then(function() {
                                    return Promise.resolve(navigator.mediaDevices.getUserMedia({
                                        audio: c
                                    })).then(function(t) {
                                        var n = s.createMediaStreamSource(l = t), o = new AudioWorkletNode(s, "raw-audio-processor");
                                        return o.port.postMessage({
                                            type: "setFormat",
                                            format: i,
                                            sampleRate: a
                                        }), n.connect(r), r.connect(o), Promise.resolve(s.resume()).then(function() {
                                            return new e(s, r, o, l);
                                        });
                                    });
                                });
                            }
                            var o = navigator.mediaDevices.getSupportedConstraints().sampleRate, r = (s = new window.AudioContext(o ? {
                                sampleRate: a
                            } : {})).createAnalyser(), u = function() {
                                if (!o) return Promise.resolve(s.audioWorklet.addModule("https://cdn.jsdelivr.net/npm/@alexanderolsen/libsamplerate-js@2.1.2/dist/libsamplerate.worklet.js")).then(function() {});
                            }();
                            return u && u.then ? u.then(t) : t();
                        }
                        var c = {
                            sampleRate: {
                                ideal: a
                            },
                            echoCancellation: {
                                ideal: !0
                            },
                            noiseSuppression: {
                                ideal: !0
                            }
                        }, u = function() {
                            if (o() && r) return Promise.resolve(window.navigator.mediaDevices.enumerateDevices()).then(function(e) {
                                var t = e.find(function(e) {
                                    return "audioinput" === e.kind && [
                                        "airpod",
                                        "headphone",
                                        "earphone"
                                    ].find(function(t) {
                                        return e.label.toLowerCase().includes(t);
                                    });
                                });
                                t && (c.deviceId = {
                                    ideal: t.deviceId
                                });
                            });
                        }();
                        return u && u.then ? u.then(t) : t();
                    }();
                } catch (e) {
                    return c(e);
                }
                return u && u.then ? u.then(void 0, c) : u;
            }(0, function(e) {
                var t, n;
                throw null == (t = l) || t.getTracks().forEach(function(e) {
                    return e.stop();
                }), null == (n = s) || n.close(), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    };
    var t = e.prototype;
    return t.close = function() {
        try {
            return this.inputStream.getTracks().forEach(function(e) {
                return e.stop();
            }), Promise.resolve(this.context.close()).then(function() {});
        } catch (e) {
            return Promise.reject(e);
        }
    }, t.setMuted = function(e) {
        this.worklet.port.postMessage({
            type: "setMuted",
            isMuted: e
        });
    }, e;
}(), i = new Blob([
    '\n      const decodeTable = [0,132,396,924,1980,4092,8316,16764];\n      \n      export function decodeSample(muLawSample) {\n        let sign;\n        let exponent;\n        let mantissa;\n        let sample;\n        muLawSample = ~muLawSample;\n        sign = (muLawSample & 0x80);\n        exponent = (muLawSample >> 4) & 0x07;\n        mantissa = muLawSample & 0x0F;\n        sample = decodeTable[exponent] + (mantissa << (exponent+3));\n        if (sign !== 0) sample = -sample;\n\n        return sample;\n      }\n      \n      class AudioConcatProcessor extends AudioWorkletProcessor {\n        constructor() {\n          super();\n          this.buffers = []; // Initialize an empty buffer\n          this.cursor = 0;\n          this.currentBuffer = null;\n          this.wasInterrupted = false;\n          this.finished = false;\n          \n          this.port.onmessage = ({ data }) => {\n            switch (data.type) {\n              case "setFormat":\n                this.format = data.format;\n                break;\n              case "buffer":\n                this.wasInterrupted = false;\n                this.buffers.push(\n                  this.format === "ulaw"\n                    ? new Uint8Array(data.buffer)\n                    : new Int16Array(data.buffer)\n                );\n                break;\n              case "interrupt":\n                this.wasInterrupted = true;\n                break;\n              case "clearInterrupted":\n                if (this.wasInterrupted) {\n                  this.wasInterrupted = false;\n                  this.buffers = [];\n                  this.currentBuffer = null;\n                }\n            }\n          };\n        }\n        process(_, outputs) {\n          let finished = false;\n          const output = outputs[0][0];\n          for (let i = 0; i < output.length; i++) {\n            if (!this.currentBuffer) {\n              if (this.buffers.length === 0) {\n                finished = true;\n                break;\n              }\n              this.currentBuffer = this.buffers.shift();\n              this.cursor = 0;\n            }\n\n            let value = this.currentBuffer[this.cursor];\n            if (this.format === "ulaw") {\n              value = decodeSample(value);\n            }\n            output[i] = value / 32768;\n            this.cursor++;\n\n            if (this.cursor >= this.currentBuffer.length) {\n              this.currentBuffer = null;\n            }\n          }\n\n          if (this.finished !== finished) {\n            this.finished = finished;\n            this.port.postMessage({ type: "process", finished });\n          }\n\n          return true; // Continue processing\n        }\n      }\n\n      registerProcessor("audio-concat-processor", AudioConcatProcessor);\n    '
], {
    type: "application/javascript"
}), r = URL.createObjectURL(i), s = function() {
    function e(e, t, n, o) {
        this.context = void 0, this.analyser = void 0, this.gain = void 0, this.worklet = void 0, this.context = e, this.analyser = t, this.gain = n, this.worklet = o;
    }
    return e.create = function(t) {
        var n = t.sampleRate, o = t.format;
        try {
            var a = null;
            return Promise.resolve(function(t, i) {
                try {
                    var s, l, c = (s = (a = new AudioContext({
                        sampleRate: n
                    })).createAnalyser(), (l = a.createGain()).connect(s), s.connect(a.destination), Promise.resolve(a.audioWorklet.addModule(r)).then(function() {
                        var t = new AudioWorkletNode(a, "audio-concat-processor");
                        return t.port.postMessage({
                            type: "setFormat",
                            format: o
                        }), t.connect(l), Promise.resolve(a.resume()).then(function() {
                            return new e(a, s, l, t);
                        });
                    }));
                } catch (e) {
                    return i(e);
                }
                return c && c.then ? c.then(void 0, i) : c;
            }(0, function(e) {
                var t;
                throw null == (t = a) || t.close(), e;
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
}(), l = function() {
    function e(e, t, n, o) {
        var a = this;
        this.socket = void 0, this.conversationId = void 0, this.inputFormat = void 0, this.outputFormat = void 0, this.queue = [], this.disconnectionDetails = null, this.onDisconnectCallback = null, this.onMessageCallback = null, this.socket = e, this.conversationId = t, this.inputFormat = n, this.outputFormat = o, this.socket.addEventListener("error", function(e) {
            setTimeout(function() {
                return a.disconnect({
                    reason: "error",
                    message: "The connection was closed due to a socket error.",
                    context: e
                });
            }, 0);
        }), this.socket.addEventListener("close", function(e) {
            a.disconnect(1e3 === e.code ? {
                reason: "agent",
                context: e
            } : {
                reason: "error",
                message: e.reason || "The connection was closed by the server.",
                context: e
            });
        }), this.socket.addEventListener("message", function(e) {
            try {
                var t = JSON.parse(e.data);
                if (!t.type) return;
                a.onMessageCallback ? a.onMessageCallback(t) : a.queue.push(t);
            } catch (e) {}
        });
    }
    e.create = function(t) {
        try {
            var n = null;
            return Promise.resolve(function(o, a) {
                try {
                    var i, r, s, l, u = (r = null != (i = t.origin) ? i : "wss://api.elevenlabs.io", s = t.signedUrl ? t.signedUrl : r + "/v1/convai/conversation?agent_id=" + t.agentId, l = [
                        "convai"
                    ], t.authorization && l.push("bearer." + t.authorization), n = new WebSocket(s, l), Promise.resolve(new Promise(function(e, o) {
                        n.addEventListener("open", function() {
                            var e, o, a, i, r, s = {
                                type: "conversation_initiation_client_data"
                            };
                            t.overrides && (s.conversation_config_override = {
                                agent: {
                                    prompt: null == (o = t.overrides.agent) ? void 0 : o.prompt,
                                    first_message: null == (a = t.overrides.agent) ? void 0 : a.firstMessage,
                                    language: null == (i = t.overrides.agent) ? void 0 : i.language
                                },
                                tts: {
                                    voice_id: null == (r = t.overrides.tts) ? void 0 : r.voiceId
                                }
                            }), t.customLlmExtraBody && (s.custom_llm_extra_body = t.customLlmExtraBody), t.dynamicVariables && (s.dynamic_variables = t.dynamicVariables), null == (e = n) || e.send(JSON.stringify(s));
                        }, {
                            once: !0
                        }), n.addEventListener("error", function(e) {
                            setTimeout(function() {
                                return o(e);
                            }, 0);
                        }), n.addEventListener("close", o), n.addEventListener("message", function(t) {
                            var n = JSON.parse(t.data);
                            n.type && ("conversation_initiation_metadata" === n.type ? e(n.conversation_initiation_metadata_event) : console.warn("First received message is not conversation metadata."));
                        }, {
                            once: !0
                        });
                    })).then(function(t) {
                        var o = t.conversation_id, a = t.agent_output_audio_format, i = t.user_input_audio_format, r = c(null != i ? i : "pcm_16000"), s = c(a);
                        return new e(n, o, r, s);
                    }));
                } catch (e) {
                    return a(e);
                }
                return u && u.then ? u.then(void 0, a) : u;
            }(0, function(e) {
                var t;
                throw null == (t = n) || t.close(), e;
            }));
        } catch (e) {
            return Promise.reject(e);
        }
    };
    var t = e.prototype;
    return t.close = function() {
        this.socket.close();
    }, t.sendMessage = function(e) {
        this.socket.send(JSON.stringify(e));
    }, t.onMessage = function(e) {
        this.onMessageCallback = e, this.queue.forEach(e), this.queue = [];
    }, t.onDisconnect = function(e) {
        this.onDisconnectCallback = e, this.disconnectionDetails && e(this.disconnectionDetails);
    }, t.disconnect = function(e) {
        var t;
        this.disconnectionDetails || (this.disconnectionDetails = e, null == (t = this.onDisconnectCallback) || t.call(this, e));
    }, e;
}();
function c(e) {
    var t = e.split("_"), n = t[0], o = t[1];
    if (![
        "pcm",
        "ulaw"
    ].includes(n)) throw Error("Invalid format: " + e);
    var a = parseInt(o);
    if (isNaN(a)) throw Error("Invalid sample rate: " + o);
    return {
        format: n,
        sampleRate: a
    };
}
function u(e, t) {
    try {
        var n = e();
    } catch (e) {
        return t(e);
    }
    return n && n.then ? n.then(void 0, t) : n;
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
}, f = function() {
    function t(e, t, n, o, a) {
        var i = this, r = this, s = this;
        this.options = void 0, this.connection = void 0, this.input = void 0, this.output = void 0, this.wakeLock = void 0, this.lastInterruptTimestamp = 0, this.mode = "listening", this.status = "connecting", this.inputFrequencyData = void 0, this.outputFrequencyData = void 0, this.volume = 1, this.currentEventId = 1, this.lastFeedbackEventId = 1, this.canSendFeedback = !1, this.endSession = function() {
            return s.endSessionWithDetails({
                reason: "user"
            });
        }, this.endSessionWithDetails = function(e) {
            try {
                var t = function() {
                    return i.connection.close(), Promise.resolve(i.input.close()).then(function() {
                        return Promise.resolve(i.output.close()).then(function() {
                            i.updateStatus("disconnected"), i.options.onDisconnect(e);
                        });
                    });
                };
                if ("connected" !== i.status && "connecting" !== i.status) return Promise.resolve();
                i.updateStatus("disconnecting");
                var n = u(function() {
                    var e;
                    return Promise.resolve(null == (e = i.wakeLock) ? void 0 : e.release()).then(function() {
                        i.wakeLock = null;
                    });
                }, function() {});
                return Promise.resolve(n && n.then ? n.then(t) : t());
            } catch (e) {
                return Promise.reject(e);
            }
        }, this.updateMode = function(e) {
            e !== s.mode && (s.mode = e, s.options.onModeChange({
                mode: e
            }));
        }, this.updateStatus = function(e) {
            e !== s.status && (s.status = e, s.options.onStatusChange({
                status: e
            }));
        }, this.updateCanSendFeedback = function() {
            var e = s.currentEventId !== s.lastFeedbackEventId;
            s.canSendFeedback !== e && (s.canSendFeedback = e, s.options.onCanSendFeedbackChange({
                canSendFeedback: e
            }));
        }, this.onMessage = function(e) {
            try {
                switch(e.type){
                    case "interruption":
                        return e.interruption_event && (r.lastInterruptTimestamp = e.interruption_event.event_id), r.fadeOutAudio(), Promise.resolve();
                    case "agent_response":
                        return r.options.onMessage({
                            source: "ai",
                            message: e.agent_response_event.agent_response
                        }), Promise.resolve();
                    case "user_transcript":
                        return r.options.onMessage({
                            source: "user",
                            message: e.user_transcription_event.user_transcript
                        }), Promise.resolve();
                    case "internal_tentative_agent_response":
                        return r.options.onDebug({
                            type: "tentative_agent_response",
                            response: e.tentative_agent_response_internal_event.tentative_agent_response
                        }), Promise.resolve();
                    case "client_tool_call":
                        return Promise.resolve(function() {
                            if (r.options.clientTools.hasOwnProperty(e.client_tool_call.tool_name)) {
                                var t = u(function() {
                                    return Promise.resolve(r.options.clientTools[e.client_tool_call.tool_name](e.client_tool_call.parameters)).then(function(t) {
                                        var n = "object" == typeof t ? JSON.stringify(t) : String(t);
                                        r.connection.sendMessage({
                                            type: "client_tool_result",
                                            tool_call_id: e.client_tool_call.tool_call_id,
                                            result: n,
                                            is_error: !1
                                        });
                                    });
                                }, function(t) {
                                    r.onError("Client tool execution failed with following error: " + (null == t ? void 0 : t.message), {
                                        clientToolName: e.client_tool_call.tool_name
                                    }), r.connection.sendMessage({
                                        type: "client_tool_result",
                                        tool_call_id: e.client_tool_call.tool_call_id,
                                        result: "Client tool execution failed: " + (null == t ? void 0 : t.message),
                                        is_error: !0
                                    });
                                });
                                if (t && t.then) return t.then(function() {});
                            } else {
                                if (r.options.onUnhandledClientToolCall) return void r.options.onUnhandledClientToolCall(e.client_tool_call);
                                r.onError("Client tool with name " + e.client_tool_call.tool_name + " is not defined on client", {
                                    clientToolName: e.client_tool_call.tool_name
                                }), r.connection.sendMessage({
                                    type: "client_tool_result",
                                    tool_call_id: e.client_tool_call.tool_call_id,
                                    result: "Client tool with name " + e.client_tool_call.tool_name + " is not defined on client",
                                    is_error: !0
                                });
                            }
                        }());
                    case "audio":
                        return r.lastInterruptTimestamp <= e.audio_event.event_id && (r.options.onAudio(e.audio_event.audio_base_64), r.addAudioBase64Chunk(e.audio_event.audio_base_64), r.currentEventId = e.audio_event.event_id, r.updateCanSendFeedback(), r.updateMode("speaking")), Promise.resolve();
                    case "ping":
                        return r.connection.sendMessage({
                            type: "pong",
                            event_id: e.ping_event.event_id
                        }), Promise.resolve();
                    default:
                        return r.options.onDebug(e), Promise.resolve();
                }
            } catch (e) {
                return Promise.reject(e);
            }
        }, this.onInputWorkletMessage = function(e) {
            var t;
            "connected" === s.status && s.connection.sendMessage({
                user_audio_chunk: (t = new Uint8Array(e.data[0].buffer), window.btoa(String.fromCharCode.apply(String, t)))
            });
        }, this.onOutputWorkletMessage = function(e) {
            var t = e.data;
            "process" === t.type && s.updateMode(t.finished ? "listening" : "speaking");
        }, this.addAudioBase64Chunk = function(e) {
            s.output.gain.gain.value = s.volume, s.output.worklet.port.postMessage({
                type: "clearInterrupted"
            }), s.output.worklet.port.postMessage({
                type: "buffer",
                buffer: function(e) {
                    for(var t = window.atob(e), n = t.length, o = new Uint8Array(n), a = 0; a < n; a++)o[a] = t.charCodeAt(a);
                    return o.buffer;
                }(e)
            });
        }, this.fadeOutAudio = function() {
            s.updateMode("listening"), s.output.worklet.port.postMessage({
                type: "interrupt"
            }), s.output.gain.gain.exponentialRampToValueAtTime(1e-4, s.output.context.currentTime + 2), setTimeout(function() {
                s.output.gain.gain.value = s.volume, s.output.worklet.port.postMessage({
                    type: "clearInterrupted"
                });
            }, 2e3);
        }, this.onError = function(e, t) {
            console.error(e, t), s.options.onError(e, t);
        }, this.calculateVolume = function(e) {
            if (0 === e.length) return 0;
            for(var t = 0, n = 0; n < e.length; n++)t += e[n] / 255;
            return (t /= e.length) < 0 ? 0 : t > 1 ? 1 : t;
        }, this.getId = function() {
            return s.connection.conversationId;
        }, this.isOpen = function() {
            return "connected" === s.status;
        }, this.setVolume = function(e) {
            s.volume = e.volume;
        }, this.setMicMuted = function(e) {
            s.input.setMuted(e);
        }, this.getInputByteFrequencyData = function() {
            return null != s.inputFrequencyData || (s.inputFrequencyData = new Uint8Array(s.input.analyser.frequencyBinCount)), s.input.analyser.getByteFrequencyData(s.inputFrequencyData), s.inputFrequencyData;
        }, this.getOutputByteFrequencyData = function() {
            return null != s.outputFrequencyData || (s.outputFrequencyData = new Uint8Array(s.output.analyser.frequencyBinCount)), s.output.analyser.getByteFrequencyData(s.outputFrequencyData), s.outputFrequencyData;
        }, this.getInputVolume = function() {
            return s.calculateVolume(s.getInputByteFrequencyData());
        }, this.getOutputVolume = function() {
            return s.calculateVolume(s.getOutputByteFrequencyData());
        }, this.sendFeedback = function(e) {
            s.canSendFeedback ? (s.connection.sendMessage({
                type: "feedback",
                score: e ? "like" : "dislike",
                event_id: s.currentEventId
            }), s.lastFeedbackEventId = s.currentEventId, s.updateCanSendFeedback()) : console.warn(0 === s.lastFeedbackEventId ? "Cannot send feedback: the conversation has not started yet." : "Cannot send feedback: feedback has already been sent for the current response.");
        }, this.sendContextualUpdate = function(e) {
            s.connection.sendMessage({
                type: "contextual_update",
                text: e
            });
        }, this.options = e, this.connection = t, this.input = n, this.output = o, this.wakeLock = a, this.options.onConnect({
            conversationId: t.conversationId
        }), this.connection.onDisconnect(this.endSessionWithDetails), this.connection.onMessage(this.onMessage), this.input.worklet.port.onmessage = this.onInputWorkletMessage, this.output.worklet.port.onmessage = this.onOutputWorkletMessage, this.updateStatus("connected");
    }
    return t.startSession = function(n) {
        try {
            var i = function() {
                return u(function() {
                    return Promise.resolve(navigator.mediaDevices.getUserMedia({
                        audio: !0
                    })).then(function(i) {
                        function u() {
                            return Promise.resolve(l.create(n)).then(function(o) {
                                return f = o, Promise.resolve(Promise.all([
                                    a.create(e({}, f.inputFormat, {
                                        preferHeadphonesForIosDevices: n.preferHeadphonesForIosDevices
                                    })),
                                    s.create(f.outputFormat)
                                ])).then(function(e) {
                                    var n;
                                    return c = e[0], p = e[1], null == (n = m) || n.getTracks().forEach(function(e) {
                                        return e.stop();
                                    }), m = null, new t(r, f, c, p, v);
                                });
                            });
                        }
                        m = i;
                        var d, h, g, y = null != (h = n.connectionDelay) ? h : {
                            default: 0,
                            android: 3e3
                        }, w = y.default;
                        /android/i.test(navigator.userAgent) ? w = null != (g = y.android) ? g : w : o() && (w = null != (d = y.ios) ? d : w);
                        var _ = function() {
                            if (w > 0) return Promise.resolve(new Promise(function(e) {
                                return setTimeout(e, w);
                            })).then(function() {});
                        }();
                        return _ && _.then ? _.then(u) : u();
                    });
                }, function(e) {
                    var t, n, o;
                    return r.onStatusChange({
                        status: "disconnected"
                    }), null == (t = m) || t.getTracks().forEach(function(e) {
                        return e.stop();
                    }), null == (n = f) || n.close(), Promise.resolve(null == (o = c) ? void 0 : o.close()).then(function() {
                        var t;
                        return Promise.resolve(null == (t = p) ? void 0 : t.close()).then(function() {
                            function t() {
                                throw e;
                            }
                            var n = u(function() {
                                var e;
                                return Promise.resolve(null == (e = v) ? void 0 : e.release()).then(function() {
                                    v = null;
                                });
                            }, function() {});
                            return n && n.then ? n.then(t) : t();
                        });
                    });
                });
            }, r = e({}, d, h, n);
            r.onStatusChange({
                status: "connecting"
            }), r.onCanSendFeedbackChange({
                canSendFeedback: !1
            });
            var c = null, f = null, p = null, m = null, v = null, g = function(e) {
                if (null == (e = n.useWakeLock) || e) {
                    var t = u(function() {
                        return Promise.resolve(navigator.wakeLock.request("screen")).then(function(e) {
                            v = e;
                        });
                    }, function() {});
                    if (t && t.then) return t.then(function() {});
                }
            }();
            return Promise.resolve(g && g.then ? g.then(i) : i());
        } catch (e) {
            return Promise.reject(e);
        }
    }, t;
}();
let p = null, m = null, v = null, g = null, y = null, w = null, _ = "idle", k = null;
const b = new WeakMap, M = new WeakMap, S = new Set;
let C = null, P = null, E = !1, I = 0;
const A = async ()=>{
    if (p || (p = new (window.AudioContext || window.webkitAudioContext)), "suspended" === p.state) try {
        await p.resume();
    } catch  {}
}, F = (e)=>{
    e !== _ && (console.log("[viz] mode ->", e), _ = e);
}, D = (e)=>{
    if (m = p && p.createAnalyser ? p.createAnalyser() : null) {
        m.fftSize = 2048, v = new Uint8Array(m.frequencyBinCount);
        try {
            e.disconnect();
        } catch  {}
        e.connect(m), k || ((k = p.createGain()).gain.value = 0, k.connect(p.destination));
        try {
            m.disconnect();
        } catch  {}
        m.connect(k);
    }
}, L = async (e)=>{
    if (!(e instanceof HTMLMediaElement)) return;
    await A();
    let t = b.get(e);
    if (!t) {
        try {
            t = p.createMediaElementSource(e);
        } catch (e) {
            console.warn("[viz] createMediaElementSource failed", e);
        }
        t && b.set(e, t);
    }
    t && D(t);
    try {
        e.crossOrigin = "anonymous";
    } catch  {}
    console.log("[viz] MediaElement connected", {
        src: e.currentSrc || e.src
    }), e.addEventListener("play", ()=>{
        S.add(e), F("line"), console.log("[viz] element play");
    });
    let n = ()=>{
        S.delete(e), 0 === S.size && F("idle"), console.log("[viz] element stop/pause, playing count:", S.size);
    };
    e.addEventListener("pause", n), e.addEventListener("ended", n);
}, x = async (e)=>{
    if (!(e instanceof MediaStream)) return;
    await A();
    let t = M.get(e);
    if (!t) {
        try {
            t = p.createMediaStreamSource(e);
        } catch (e) {
            console.warn("[viz] createMediaStreamSource failed", e);
        }
        t && M.set(e, t);
    }
    t && D(t), F("line"), console.log("[viz] MediaStream connected with tracks:", e.getTracks().map((e)=>e.kind + ":" + e.readyState)), e.getTracks().forEach((t)=>t.addEventListener("ended", ()=>{
            e.getTracks().every((e)=>"ended" === e.readyState) && (F("idle"), console.log("[viz] stream ended"));
        }));
}, T = async (e)=>{
    try {
        if (!e) return;
        let t = e.audioElement || e.audioEl || e.audio;
        if (t instanceof HTMLMediaElement) return void await L(t);
        let n = e.mediaStream || e.outputStream || e.remoteStream || e.stream;
        if (n instanceof MediaStream) return void await x(n);
        new MutationObserver((e)=>{
            e.forEach((e)=>{
                e.addedNodes?.forEach((e)=>{
                    e instanceof HTMLMediaElement && L(e), e.querySelectorAll && e.querySelectorAll("audio,video").forEach(L);
                });
            });
        }).observe(document.documentElement, {
            childList: !0,
            subtree: !0
        });
    } catch (e) {
        console.warn("[viz] hookConversationAudio failed", e);
    }
}, B = (e)=>{
    C = e;
}, q = (e)=>{
    if (!(y = document.getElementById(e))) return;
    w = y.getContext("2d");
    let t = ()=>{
        let e = window.devicePixelRatio || 1, t = y.clientWidth || window.innerWidth, n = y.clientHeight || window.innerHeight;
        y.width = Math.floor(t * e), y.height = Math.floor(n * e), w.setTransform(e, 0, 0, e, 0, 0);
    };
    t(), window.addEventListener("resize", t);
}, z = (e)=>{
    if (!w || !y) return;
    let t = y.clientWidth, n = y.clientHeight;
    w.clearRect(0, 0, t, n);
    let o = .12 * Math.min(t, n) * (1 + .06 * Math.sin(2 * e * Math.PI * .9));
    w.shadowColor = "#00ff80", w.shadowBlur = 20, w.strokeStyle = "#00ff80", w.lineWidth = 3, w.beginPath(), w.arc(t / 2, n / 2, o, 0, 2 * Math.PI), w.stroke();
}, R = ()=>{
    if (!w || !y) return;
    let e = y.clientWidth, t = y.clientHeight;
    w.clearRect(0, 0, e, t), w.beginPath(), w.lineWidth = 3, w.strokeStyle = "#00ff80", w.shadowColor = "#00ff80", w.shadowBlur = 16;
    let n = Math.floor(t / 2), o = 0;
    if (m && v) {
        m.getByteTimeDomainData(v);
        let a = 0;
        for(let e = 0; e < v.length; e++)a += v[e];
        a /= v.length;
        let i = e / v.length, r = 0;
        for(let e = 0; e < v.length; e++){
            let o = (v[e] - a) / 128, s = e * i, l = n + .22 * t * o;
            0 === e ? w.moveTo(s, l) : w.lineTo(s, l), r += o * o;
        }
        o = Math.sqrt(r / v.length);
    } else if (C?.getOutputByteFrequencyData) {
        try {
            let e = C.getOutputByteFrequencyData();
            e && "function" == typeof e.then ? e.then((e)=>{
                P = e;
            }).catch(()=>{}) : e instanceof Uint8Array && (P = e);
        } catch  {}
        let a = P, i = a?.length || 0;
        if (i > 0) {
            let r = 0;
            for(let e = 0; e < i; e++)r += a[e];
            r /= i || 1;
            let s = e / i, l = 0;
            for(let e = 0; e < i; e++){
                let o = (a[e] - r) / 255, i = e * s, c = n + 2 * o * (.22 * t);
                0 === e ? w.moveTo(i, c) : w.lineTo(i, c), l += o * o;
            }
            o = Math.sqrt(l / i) / 1.1;
        }
    }
    let a = o > .015;
    a && !E && console.log("[viz] audio signal detected, rms=", o.toFixed(3)), a ? I = 0 : (I++, E && I > 20 && console.log("[viz] audio gone silent")), E = a, w.stroke();
}, O = document.getElementById("startBtn"), W = document.getElementById("stopBtn"), U = document.getElementById("status");
let j = null, N = null;
const H = new URLSearchParams(window.location.search);
let V = {
    name: H.get("name"),
    agentId: H.get("id"),
    mode: H.get("mode") || "default"
};
(async ()=>{
    if (!V.agentId) try {
        let e = await fetch(`./agents/${V.name}.json`);
        if (!e.ok) throw Error(`HTTP ${e.status}: ${e.statusText}`);
        V = await e.json(), console.log("Config loaded:", V);
    } catch (e) {
        console.error("Error loading config:", e);
    }
    if (document.getElementById("name").textContent = V.name, !V.agentId) {
        let e = document.getElementById("startBtn");
        e.disabled = !0, e.innerText = "Agente n\xe3o encontrado!";
    }
    V.mode = H.get("mode") || V.mode || "default", G();
})();
const G = ()=>{
    if ("full" === V.mode && V.backgroundImage) {
        let e = document.getElementById("fullMode");
        e && (e.style.setProperty("--bg-image", `url('${V.backgroundImage}')`), e.classList.add("has-bg"), console.log("Background image configured:", V.backgroundImage));
    }
}, J = (e)=>{
    U.textContent = "Status: " + e;
};
async function $() {
    try {
        if (await navigator.mediaDevices.getUserMedia({
            audio: !0
        }), J("Microfone liberado"), V.startAudio) {
            O.classList.add("hidden"), W.classList.remove("hidden"), N = new Audio(V.startAudio);
            try {
                N.crossOrigin = "anonymous";
            } catch  {}
            "full" === V.mode && (await L(N), F("line")), N.play(), J("Reproduzindo \xe1udio de boas-vindas"), await new Promise((e)=>{
                N.onended = ()=>{
                    "full" === V.mode && F("idle"), e();
                };
            });
        }
        j = await f.startSession({
            agentId: V.agentId,
            onConnect: ()=>{
                console.log("Conectado ao agente!"), J("Conectado");
            },
            onDisconnect: ()=>{
                console.log("Conex\xe3o encerrada."), J("Desconectado");
            },
            onMessage: (e)=>{
                console.log("Mensagem recebida:", e);
            },
            onError: (e)=>{
                console.error("Erro na sess\xe3o:", e), J("Erro");
            },
            onStatusChange: (e)=>{
                console.log("Status alterado:", e);
            },
            onModeChange: (e)=>{
                console.log("Modo alterado:", e);
                try {
                    "full" === V.mode && ("speaking" == e.mode ? (F("line"), console.log("[viz] speaking!!!")) : (F("idle"), console.log("[viz] idle!")));
                } catch  {}
            }
        }), "full" === V.mode && (await T(j), B(j));
    } catch (e) {
        console.error("Erro ao iniciar a conversa:", e), J("Erro ao iniciar");
    }
}
async function K() {
    N && (N.pause(), N = null), F("idle"), j && (await j.endSession(), j = null), J("Desconectado"), O.classList.remove("hidden"), W.classList.add("hidden");
}
O.addEventListener("click", $), W.addEventListener("click", K);
const Q = document.getElementById("card"), X = document.getElementById("fullMode");
if ("full" === V.mode) {
    Q && Q.classList.add("hidden"), X && X.classList.remove("hidden"), ((e = "vizCanvas")=>{
        q(e), cancelAnimationFrame(g);
        let t = (e)=>{
            "line" === _ ? R() : z(e / 1e3), g = requestAnimationFrame(t);
        };
        g = requestAnimationFrame(t);
    })("vizCanvas");
    let e = async (e, t)=>{
        t instanceof HTMLMediaElement && ("play" === e ? (await L(t), S.add(t), F("line"), console.log("[viz] global play", t.tagName)) : (S.delete(t), 0 === S.size && F("idle"), console.log("[viz] global", e, "playing count:", S.size)));
    };
    document.addEventListener("play", (t)=>e("play", t.target), !0), document.addEventListener("pause", (t)=>e("pause", t.target), !0), document.addEventListener("ended", (t)=>e("ended", t.target), !0), X.addEventListener("click", async ()=>{
        j ? await K() : await $();
    }), F("idle");
}

},{}]},["glgbu","fF8uF"], "fF8uF", "parcelRequire94c2", {})

//# sourceMappingURL=arapy-11labs.33e29f00.js.map
