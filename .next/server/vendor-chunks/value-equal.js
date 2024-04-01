"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/value-equal";
exports.ids = ["vendor-chunks/value-equal"];
exports.modules = {

/***/ "(ssr)/./node_modules/value-equal/esm/value-equal.js":
/*!*****************************************************!*\
  !*** ./node_modules/value-equal/esm/value-equal.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction valueOf(obj) {\n  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);\n}\n\nfunction valueEqual(a, b) {\n  // Test for strict equality first.\n  if (a === b) return true;\n\n  // Otherwise, if either of them == null they are not equal.\n  if (a == null || b == null) return false;\n\n  if (Array.isArray(a)) {\n    return (\n      Array.isArray(b) &&\n      a.length === b.length &&\n      a.every(function(item, index) {\n        return valueEqual(item, b[index]);\n      })\n    );\n  }\n\n  if (typeof a === 'object' || typeof b === 'object') {\n    var aValue = valueOf(a);\n    var bValue = valueOf(b);\n\n    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);\n\n    return Object.keys(Object.assign({}, a, b)).every(function(key) {\n      return valueEqual(a[key], b[key]);\n    });\n  }\n\n  return false;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (valueEqual);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdmFsdWUtZXF1YWwvZXNtL3ZhbHVlLWVxdWFsLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLHVDQUF1QztBQUN2QztBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLFVBQVUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL25vZGVfbW9kdWxlcy92YWx1ZS1lcXVhbC9lc20vdmFsdWUtZXF1YWwuanM/NzVjNiJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB2YWx1ZU9mKG9iaikge1xuICByZXR1cm4gb2JqLnZhbHVlT2YgPyBvYmoudmFsdWVPZigpIDogT2JqZWN0LnByb3RvdHlwZS52YWx1ZU9mLmNhbGwob2JqKTtcbn1cblxuZnVuY3Rpb24gdmFsdWVFcXVhbChhLCBiKSB7XG4gIC8vIFRlc3QgZm9yIHN0cmljdCBlcXVhbGl0eSBmaXJzdC5cbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIC8vIE90aGVyd2lzZSwgaWYgZWl0aGVyIG9mIHRoZW0gPT0gbnVsbCB0aGV5IGFyZSBub3QgZXF1YWwuXG4gIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgQXJyYXkuaXNBcnJheShiKSAmJlxuICAgICAgYS5sZW5ndGggPT09IGIubGVuZ3RoICYmXG4gICAgICBhLmV2ZXJ5KGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGl0ZW0sIGJbaW5kZXhdKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFWYWx1ZSA9IHZhbHVlT2YoYSk7XG4gICAgdmFyIGJWYWx1ZSA9IHZhbHVlT2YoYik7XG5cbiAgICBpZiAoYVZhbHVlICE9PSBhIHx8IGJWYWx1ZSAhPT0gYikgcmV0dXJuIHZhbHVlRXF1YWwoYVZhbHVlLCBiVmFsdWUpO1xuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIGEsIGIpKS5ldmVyeShmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGFba2V5XSwgYltrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsdWVFcXVhbDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/value-equal/esm/value-equal.js\n");

/***/ })

};
;