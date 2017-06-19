/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webext_omnibox_highlight__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["b"] = handleInputChanged;
/* harmony export (immutable) */ __webpack_exports__["c"] = handleInputEntered;
const BASE_URL = `https://developer.mozilla.org`;
const SEARCH_API_URL = `${BASE_URL}/en-US/search.json?topic=css&topic=js&q=`;
/* unused harmony export SEARCH_API_URL */

const SEARCH_DEFAULT_URL = `${BASE_URL}/en-US/search?q=`;
/* unused harmony export SEARCH_DEFAULT_URL */




const defaultSuggestion = {
  description: `Search MDN (e.g. "margin" | "splice")`
};
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultSuggestion;


function handleInputChanged(text, addSuggestions) {
  const headers = new Headers({ Accept: 'application/json' });
  const init = { method: 'GET', headers };
  const q = encodeURIComponent(text);
  const url = `${SEARCH_API_URL}${q}`;
  const request = new Request(url, init);

  fetch(request).then(handleResponse).then(addSuggestions);
}

function handleResponse(response) {
  return new Promise(resolve => {
    response.json().then(json => {
      const pages = json.documents.filter(doc => doc.tags.includes('Reference')).slice(0, 5);

      return resolve(pages.map(page => {
        return {
          content: page.url,
          description: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_webext_omnibox_highlight__["a" /* match */])(page.title, json.query)
        };
      }));
    });
  });
}

function handleInputEntered(text, disposition) {
  const url = text.startsWith('https://') ? text : `${SEARCH_DEFAULT_URL}${text}`;

  switch (disposition) {
    case 'currentTab':
      return chrome.tabs.update({ url });
    case 'newForegroundTab':
      return chrome.tabs.create({ url });
    case 'newBackgroundTab':
      return chrome.tabs.create({ url, active: false });
  }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__omnibox__ = __webpack_require__(0);


// Provide help text to the user.
chrome.omnibox.setDefaultSuggestion(__WEBPACK_IMPORTED_MODULE_0__omnibox__["a" /* defaultSuggestion */]);

// Update the suggestions whenever the input is changed.
chrome.omnibox.onInputChanged.addListener(__WEBPACK_IMPORTED_MODULE_0__omnibox__["b" /* handleInputChanged */]);

// Open the page based on how the user clicks on a suggestion.
chrome.omnibox.onInputEntered.addListener(__WEBPACK_IMPORTED_MODULE_0__omnibox__["c" /* handleInputEntered */]);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = match;
/* harmony export (immutable) */ __webpack_exports__["c"] = url;
/* harmony export (immutable) */ __webpack_exports__["d"] = dim;
// https://developer.chrome.com/extensions/omnibox#type-SuggestResult
function match(text = '', match = '') {
  return text.replace(RegExp(match, 'g'), `<match>${match}</match>`);
}

function url(text = '', match = '') {
  return text.replace(RegExp(match, 'g'), `<url>${match}</url>`);
}

function dim(text = '', match = '') {
  return text.replace(RegExp(match, 'g'), `<dim>${match}</dim>`);
}

const isChrome = navigator.userAgent.indexOf('Firefox') === -1;
/* harmony export (immutable) */ __webpack_exports__["a"] = isChrome;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = match;
/* harmony export (immutable) */ __webpack_exports__["b"] = url;
/* unused harmony export dim */
// Firefox doesn't support any of the XML syntax that Chrome supports so
// these functions are all just dummy functions
function match(text) {
  return text;
}

function url(text) {
  return text;
}

function dim(text) {
  return text;
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chrome__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firefox__ = __webpack_require__(3);



const match = __WEBPACK_IMPORTED_MODULE_0__chrome__["a" /* isChrome */] ? __WEBPACK_IMPORTED_MODULE_0__chrome__["b" /* match */] : __WEBPACK_IMPORTED_MODULE_1__firefox__["a" /* match */];
/* harmony export (immutable) */ __webpack_exports__["a"] = match;

const url = __WEBPACK_IMPORTED_MODULE_0__chrome__["a" /* isChrome */] ? __WEBPACK_IMPORTED_MODULE_0__chrome__["c" /* url */] : __WEBPACK_IMPORTED_MODULE_1__firefox__["b" /* url */];
/* unused harmony export url */

const dim = __WEBPACK_IMPORTED_MODULE_0__chrome__["a" /* isChrome */] ? __WEBPACK_IMPORTED_MODULE_0__chrome__["d" /* dim */] : __WEBPACK_IMPORTED_MODULE_1__firefox__["b" /* url */];
/* unused harmony export dim */



/***/ })
/******/ ]);