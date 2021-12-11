"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwindow_app"] = self["webpackChunkwindow_app"] || []).push([["main"],{

/***/ "./src/bootstrap.style.less":
/*!**********************************!*\
  !*** ./src/bootstrap.style.less ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://window-app/./src/bootstrap.style.less?");

/***/ }),

/***/ "./src/bootstrap.tsx":
/*!***************************!*\
  !*** ./src/bootstrap.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\r\nconst react_dom_1 = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\r\n__webpack_require__(/*! ~/bootstrap.style */ \"./src/bootstrap.style.less\");\r\nconst _events_1 = __webpack_require__(/*! ~events */ \"./src/events/index.ts\");\r\nconsole.log(_events_1.name);\r\nfunction App() {\r\n    return (0, jsx_runtime_1.jsx)(\"div\", { children: \"123\" }, void 0);\r\n}\r\nconst container = document.getElementById(\"bootstrap\");\r\n(0, react_dom_1.render)((0, jsx_runtime_1.jsx)(App, {}, void 0), container);\r\n\n\n//# sourceURL=webpack://window-app/./src/bootstrap.tsx?");

/***/ }),

/***/ "./src/events/index.ts":
/*!*****************************!*\
  !*** ./src/events/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.name = void 0;\r\nexports.name = \"event\";\r\n\n\n//# sourceURL=webpack://window-app/./src/events/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n__webpack_require__(/*! ./bootstrap */ \"./src/bootstrap.tsx\");\r\n\n\n//# sourceURL=webpack://window-app/./src/index.ts?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor-node_modules_react-dom_index_js-node_modules_react_jsx-runtime_js"], () => (__webpack_exec__("./src/index.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);