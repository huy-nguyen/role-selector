'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var module$1 = require('module');

const require$1 = module$1.createRequire((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('playwright-label.cjs', document.baseURI).href)));
const selectorScript = {
    path: require$1.resolve('../label-eval'),
};

exports.selectorScript = selectorScript;
