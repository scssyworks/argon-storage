(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("jquerystorage", [], factory);
	else if(typeof exports === 'object')
		exports["jquerystorage"] = factory();
	else
		root["jquerystorage"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var hide = __webpack_require__(3);
var redefine = __webpack_require__(43);
var setGlobal = __webpack_require__(17);
var copyConstructorProperties = __webpack_require__(46);

/*
  options.target - name of the target object
  options.global - target is the global object
  options.stat   - export as static methods of target
  options.proto  - export as prototype methods of target
  options.real   - real prototype method for the `pure` version
  options.forced - export even if the native feature is available
  options.bind   - bind methods to the target, required for the `pure` version
  options.wrap   - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe - use the simple assignment of property instead of delete + defineProperty
  options.sham   - add a flag to not completely full polyfills
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var target, key, targetProperty, sourceProperty;
  if (options.global) {
    target = global;
  } else if (options.stat) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    targetProperty = target[key];
    sourceProperty = source[key];
    // contained in target
    if (!options.forced && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options.unsafe);
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var definePropertyModule = __webpack_require__(16);
var createPropertyDescriptor = __webpack_require__(27);

module.exports = __webpack_require__(4) ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var bind = __webpack_require__(36);
var call = Function.call;

module.exports = function (CONSTRUCTOR, METHOD, length) {
  return bind(call, global[CONSTRUCTOR].prototype[METHOD], length);
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);

module.exports = function (it) {
  if (!isObject(it)) throw TypeError(String(it) + ' is not an object!');
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var setGlobal = __webpack_require__(17);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.0.0-beta.3',
  mode: __webpack_require__(44) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(10)('wks');
var uid = __webpack_require__(30);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = __webpack_require__(50);

module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(13);
var requireObjectCoercible = __webpack_require__(15);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var classof = __webpack_require__(14);
var split = ''.split;
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(24);
var anObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(26);
var nativeDefineProperty = Object.defineProperty;

exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var hide = __webpack_require__(3);

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (e) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(64);
var requireObjectCoercible = __webpack_require__(15);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(requireObjectCoercible(that));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(11)('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(12);
var toLength = __webpack_require__(7);
var toAbsoluteIndex = __webpack_require__(42);

// `Array.prototype.{ indexOf, includes }` methods implementation
// false -> Array#indexOf
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
// true  -> Array#includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4) && !__webpack_require__(8)(function () {
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var exist = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return exist ? document.createElement(it) : {};
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10)('native-function-to-string', Function.toString);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(10)('keys');
var uid = __webpack_require__(30);

module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);
var toIndexedObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(22)(false);
var hiddenKeys = __webpack_require__(18);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = nativeGetOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = nativeGetOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var UNSCOPABLES = __webpack_require__(11)('unscopables');
var create = __webpack_require__(51);
var hide = __webpack_require__(3);
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) hide(ArrayPrototype, UNSCOPABLES, create(null));

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var internalObjectKeys = __webpack_require__(31);
var enumBugKeys = __webpack_require__(19);

module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(54);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(15);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resetCookie = exports.removeCookie = exports.getCookie = exports.setCookie = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * JQuery storage extends default storage API to resolve cross-browser issues
                                                                                                                                                                                                                                                                               * @author       Sachin Singh
                                                                                                                                                                                                                                                                               * @dependencies jQuery 1.11+
                                                                                                                                                                                                                                                                               * @date         26/05/2018
                                                                                                                                                                                                                                                                               */

// Include needed polyfills


__webpack_require__(39);

__webpack_require__(55);

__webpack_require__(61);

__webpack_require__(65);

__webpack_require__(68);

__webpack_require__(71);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var messages = {
    params: 'Insufficient parameters'
};

var _hasOwn = Object.prototype.hasOwnProperty;

/**
 * Check if passed value is a pure object
 * @param {*} key Any type of value which needs to be checked if it's an object
 */
function _isObject(value) {
    return !Array.isArray(value) && value !== null && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object';
}

/**
 * Sets user cookie
 * @param {string} key name of cookie
 * @param {string} value cookie value
 * @param {string} exp cookie expiry
 * @param {string} path url path
 * @param {string} domain supported domain
 */
function setCookie() {
    if (arguments.length > 1) {
        var _arguments = Array.prototype.slice.call(arguments),
            key = _arguments[0],
            _arguments$ = _arguments[1],
            value = _arguments$ === undefined ? '' : _arguments$,
            exp = _arguments[2],
            _arguments$2 = _arguments[3],
            path = _arguments$2 === undefined ? '/' : _arguments$2,
            _arguments$3 = _arguments[4],
            domain = _arguments$3 === undefined ? window.location.hostname : _arguments$3;

        var updateValue = value;
        if (value !== null && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
            updateValue = JSON.stringify(value);
        }
        var dt = new Date();
        // If expiry is specified, then set the correct expiry date
        if (typeof exp === 'number') {
            // If exp is Infinity value then set a future date of year 2037 which is the estimated date of singularity
            if (exp === Infinity) {
                dt = new Date('Thu, 31 Dec 2037 00:00:00 GMT');
            } else {
                // Else reset the time to specified expiry date
                dt.setTime(dt.getTime() + exp * 24 * 60 * 60 * 1000);
            }
        }
        // Set expiry parameter
        var expires = exp ? "; expires=" + dt.toUTCString() : '';
        // Set cookie path parameter
        var cookiePath = "; path=" + path.trim();
        var cookieDomain = '';
        // IE does not allow localhost domains
        if (!['localhost', '127.0.0.1', null].includes(domain)) {
            cookieDomain = "; domain=" + domain.trim();
        }
        // Mark the cookie as secure if created in secure context
        var secureCookieFlag = '';
        if (window.location.protocol === 'https:') {
            secureCookieFlag = '; secure';
        }
        // Set the cookie value
        document.cookie = key + "=" + updateValue + expires + cookieDomain + cookiePath + secureCookieFlag;
    } else if (this.config && this.config.debug) {
        console.log(messages.params);
    }
}

/**
 * Gets cookie value
 * @param {string} key name of cookie
 */
function getCookie() {
    if (arguments.length > 0) {
        var _arguments2 = Array.prototype.slice.call(arguments),
            key = _arguments2[0];
        // Decode the cookie value if it is stored in encoded form


        var cookieString = decodeURIComponent(document.cookie);
        var allCookies = null;
        // Split the cookie string to get individual values
        allCookies = cookieString.split(';');
        if (allCookies.length) {
            // Check if any one key value pair matches the key
            // If yes then return its corresponding value
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = allCookies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var c = _step.value;

                    c = c.trim(); // Trim the key value pair to remove extra spaces
                    if (c.includes(key + "=")) {
                        // Return the value substring
                        return c.substring((key + "=").length, c.length).trim();
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }
    return '';
}

/**
 * Removes a cookie
 * @param {string} key name of cookie
 * @param {string} path url path
 * @param {string} domain supported domain
 */
function removeCookie() {
    if (arguments.length > 0) {
        var _arguments3 = Array.prototype.slice.call(arguments),
            key = _arguments3[0],
            _arguments3$ = _arguments3[1],
            path = _arguments3$ === undefined ? '/' : _arguments3$,
            _arguments3$2 = _arguments3[2],
            domain = _arguments3$2 === undefined ? window.location.hostname : _arguments3$2;

        var cookieDomain = '';
        var deletedCookieString = '';
        // IE does not allow localhost domains
        // Hence check if passed domain is not localhost or null
        if (!['localhost', '127.0.0.1', null].includes(domain)) {
            cookieDomain = "; domain=" + domain.trim();
        }
        deletedCookieString = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC" + cookieDomain + "; path=" + path;
        document.cookie = deletedCookieString;
        // Check updated value to get deletion status
        return !getCookie(key).length;
    }
    return false;
}

/**
 * Resets existing cookie with new expiry
 * @param {string} key name of cookie
 * @param {string} value cookie value
 * @param {string} exp cookie expiry
 * @param {string} path url path
 * @param {string} domain supported domain
 */
function resetCookie(key, value, exp, path, domain) {
    // Remove the existing cookie
    removeCookie(key, path, domain);
    // Set a new cookie with same name
    setCookie(key, value, exp, path, domain);
}

var store = {
    config: {
        // To enable or disable console logging
        debug: false
    },
    available: function available() {
        try {
            // If localStorage object is missing or setItem does not function properly on localStorage (e.g. Safari incognito)
            // This methos will throw an error which will tell us if storage API is usable
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    },
    set: function set() {
        if (arguments.length > 1) {
            var _arguments4 = Array.prototype.slice.call(arguments),
                key = _arguments4[0],
                value = _arguments4[1],
                _arguments4$ = _arguments4[2],
                isSession = _arguments4$ === undefined ? false : _arguments4$;

            var savedValue = value;
            // Check if value is stringifiable
            // All values are stores are string in storages
            if (value !== null && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
                savedValue = JSON.stringify(value);
            }
            // If storage is available, set the value in local or session storage based on flag
            if (this.available()) {
                try {
                    window[isSession ? 'sessionStorage' : 'localStorage'].setItem(key, savedValue);
                } catch (e) {
                    if (this.config.debug) {
                        console.error(e);
                    }
                }
            } else {
                // Else set the value in cookie
                setCookie(key, savedValue, isSession ? Infinity : undefined);
            }
        } else {
            if (this.config.debug) {
                console.log(messages.params);
            }
        }
    },
    remove: function remove() {
        if (arguments.length > 0) {
            var _arguments5 = Array.prototype.slice.call(arguments),
                key = _arguments5[0];

            if (this.available()) {
                try {
                    // Try to remove the value from both the storages
                    window.localStorage.removeItem(key);
                    window.sessionStorage.removeItem(key);
                    // Try to remove from cookie as well and return the combined result
                    return !window.localStorage.key(key) || !window.sessionStorage.key(key) || removeCookie(key);
                } catch (e) {
                    if (this.config.debug) {
                        console.error(e);
                    }
                }
            }
            return removeCookie(key);
        } else {
            if (this.config.debug) {
                console.log(messages.params);
            }
        }
    },
    getAll: function getAll() {
        var _this = this;

        if (arguments.length > 0) {
            var _arguments6 = Array.prototype.slice.call(arguments),
                key = _arguments6[0],
                _arguments6$ = _arguments6[1],
                isSession = _arguments6$ === undefined ? false : _arguments6$;

            var returnValue = [];
            if (this.available()) {
                try {
                    // Specify where to search for value
                    // session storage is default as it will be searched regardless of flag
                    var searchIn = ['sessionStorage'];
                    if (!isSession) {
                        // If session flag is not set expand the search to local storage
                        searchIn.push('localStorage');
                    }
                    // Search for value in all specified storages and combine the results
                    searchIn.forEach(function (type) {
                        if (_hasOwn.call(window[type], key)) {
                            returnValue.push({
                                value: window[type].getItem(key),
                                storage: type
                            });
                        }
                    });
                } catch (e) {
                    if (this.config.debug) {
                        console.error(e);
                    }
                }
            }
            // Complete the search by looking up the key in cookie
            var cookieValue = getCookie(key);
            if (cookieValue) {
                returnValue.push({
                    value: cookieValue,
                    storage: 'cookie'
                });
            }
            // Return the combined results
            // Make sure that parsable data is parsed before the actual results are send
            return returnValue.map(function (data) {
                try {
                    data.value = JSON.parse(data.value);
                } catch (e) {
                    if (_this.config.debug) {
                        console.log(e);
                    }
                }
                return data;
            });
        }
        return [];
    },
    get: function get() {
        if (arguments.length > 0) {
            var _arguments7 = Array.prototype.slice.call(arguments),
                key = _arguments7[0],
                _arguments7$ = _arguments7[1],
                isSession = _arguments7$ === undefined ? false : _arguments7$;

            var valueList = this.getAll(key, isSession);
            // If not value is returned then return undefined
            if (valueList.length === 0) {
                return;
            }
            // If only one value is returned it means that value was present in only one of the storages
            // Or the browser supported only one type of storage (probably the cookie store)
            if (valueList.length === 1) {
                return valueList[0].value;
            }
            // Else the browser does have value stored either is session or local storage which will get preference over cookie
            // If stored in all three stores, fetch value based on isSession flag
            if (valueList.length === 3) {
                return valueList.find(function (valueOb) {
                    return valueOb.storage === (isSession ? 'sessionStorage' : 'localStorage');
                }).value;
            }
            // If only two stores are returned, value can be in any two combination of stores:
            // 1. [localStorage, cookie]
            // 2. [sessionStorage, cookie]
            // Get the combination of stores to determine from where the value needs to be fetched
            var storageTypes = valueList.map(function (valueOb) {
                return valueOb.storage;
            });
            // If session flag is true check if value was stored in session storage
            // If not then return the cookie value
            if (isSession) {
                if (storageTypes.includes('sessionStorage')) {
                    return valueList.find(function (valueOb) {
                        return valueOb.storage === 'sessionStorage';
                    }).value;
                }
                return valueList.find(function (valueOb) {
                    return valueOb.storage === 'cookie';
                }).value;
            }
            // If session flag is false, cookie value doesn't matter
            // Check for session or local storage and return the value
            return valueList.find(function (valueOb) {
                return ['sessionStorage', 'localStorage'].includes(valueOb.storage);
            }).value;
        } else {
            if (this.config.debug) {
                console.log(messages.params);
            }
        }
    },
    update: function update() {
        // This method has been revamped to treat different values differently and allow
        // more control over how we want to update the value with least amount of code
        // required to be written.
        // For example if value is a JSON object, you can use a callback and return an object
        // With the only key which requires updation. Rest the method will take care how
        // the value is updated
        // :::::Disclaimer:::::
        // This method is not ideal for updating cookies as it will modify the expiry value
        // Use it only if you don't care about cookie expiry date
        // Also, this method always runs an update even if nothing is changed. Therefore
        // Use it only if you really want to update something
        if (arguments.length === 2) {
            var self = this;
            // Make sure that both arguments are passed

            var _arguments8 = Array.prototype.slice.call(arguments),
                key = _arguments8[0],
                callback = _arguments8[1];
            // Get all the values


            var values = this.getAll(key);
            // Get the updated value
            var updatedValue = null;
            if (typeof callback === 'function') {
                // It means that the second parameter was passed as a function which can work in number
                // of ways. It may or may not return a value.
                // It it returns a value, then directly use that value as an update
                // Else assume that the data value was modified directly in the stored object
                updatedValue = callback.apply(undefined, _toConsumableArray(values)); // All values are passed a separate parameters
            } else if ((typeof callback === "undefined" ? "undefined" : _typeof(callback)) !== undefined) {
                // It means that the updated value was directly passed to the method
                try {
                    updatedValue = JSON.parse(callback);
                } catch (e) {
                    if (this.config.debug) {
                        console.error(e);
                    }
                    updatedValue = callback;
                }
            }
            // Check if we have a valid updated value
            if (updatedValue !== undefined) {
                // Check if update value is an object and target key also has an object value
                // In this scenario we need to update the object instead of replacing it
                values.forEach(function (valueOb) {
                    var value = valueOb.value;

                    if (_isObject(value) && _isObject(updatedValue)) {
                        valueOb.value = Object.assign(value, updatedValue);
                    } else {
                        valueOb.value = updatedValue;
                    }
                });
            }
            // Write back all the values to their destinations
            values.forEach(function (_ref) {
                var value = _ref.value,
                    store = _ref.storage;

                if (['sessionStorage', 'localStorage'].includes(store)) {
                    self.set(key, value, store === 'sessionStorage');
                }
                if (store === 'cookie') {
                    setCookie(key, value);
                }
            });
        } else {
            if (this.config.debug) {
                console.log(messages.params);
            }
        }
    }
};
var publishObject = _extends({}, store, {
    setCookie: setCookie,
    getCookie: getCookie,
    removeCookie: removeCookie,
    resetCookie: resetCookie
});
if (window.jQuery) {
    window.jQuery.store = publishObject;
} else {
    window.commonStore = publishObject;
}
exports.default = store;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.removeCookie = removeCookie;
exports.resetCookie = resetCookie;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(40);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);

module.exports = __webpack_require__(6)('Array', 'includes');


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var internalIncludes = __webpack_require__(22)(true);

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
__webpack_require__(1)({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return internalIncludes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
__webpack_require__(34)('includes');


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var hide = __webpack_require__(3);
var has = __webpack_require__(5);
var setGlobal = __webpack_require__(17);
var nativeFunctionToString = __webpack_require__(28);
var InternalStateModule = __webpack_require__(45);
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

__webpack_require__(10)('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, unsafe) {
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    setGlobal(key, value);
  } else if (!unsafe) {
    delete O[key];
    hide(O, key, value);
  } else if (O[key]) {
    O[key] = value;
  } else {
    hide(O, key, value);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var nativeFunctionToString = __webpack_require__(28);
var isObject = __webpack_require__(2);
var hide = __webpack_require__(3);
var objectHas = __webpack_require__(5);
var sharedKey = __webpack_require__(29);
var hiddenKeys = __webpack_require__(18);
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
    } return state;
  };
};

if (typeof WeakMap == 'function' && /native code/.test(nativeFunctionToString.call(WeakMap))) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);
var ownKeys = __webpack_require__(47);
var getOwnPropertyDescriptorModule = __webpack_require__(49);
var definePropertyModule = __webpack_require__(16);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var getOwnPropertyNamesModule = __webpack_require__(48);
var getOwnPropertySymbolsModule = __webpack_require__(32);
var anObject = __webpack_require__(9);
var Reflect = __webpack_require__(0).Reflect;

// all object keys, includes non-enumerable and symbols
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var internalObjectKeys = __webpack_require__(31);
var hiddenKeys = __webpack_require__(19).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(4);
var propertyIsEnumerableModule = __webpack_require__(33);
var createPropertyDescriptor = __webpack_require__(27);
var toIndexedObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(26);
var has = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(24);
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// Chrome 38 Symbol has incorrect toString conversion
module.exports = !__webpack_require__(8)(function () {
  // eslint-disable-next-line no-undef
  String(Symbol());
});


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9);
var defineProperties = __webpack_require__(52);
var enumBugKeys = __webpack_require__(19);
var html = __webpack_require__(53);
var documentCreateElement = __webpack_require__(25);
var IE_PROTO = __webpack_require__(29)('IE_PROTO');
var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

__webpack_require__(18)[IE_PROTO] = true;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(4);
var definePropertyModule = __webpack_require__(16);
var anObject = __webpack_require__(9);
var objectKeys = __webpack_require__(35);

module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var key;
  while (length > i) definePropertyModule.f(O, key = keys[i++], Properties[key]);
  return O;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;

module.exports = document && document.documentElement;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(String(it) + ' is not a function!');
  return it;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(56);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);

module.exports = __webpack_require__(6)('Array', 'find');


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var internalFind = __webpack_require__(58)(5);
var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
__webpack_require__(1)({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return internalFind(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
__webpack_require__(34)(FIND);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(36);
var IndexedObject = __webpack_require__(13);
var toObject = __webpack_require__(37);
var toLength = __webpack_require__(7);
var arraySpeciesCreate = __webpack_require__(59);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
// 0 -> Array#forEach
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
// 1 -> Array#map
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// 2 -> Array#filter
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// 3 -> Array#some
// https://tc39.github.io/ecma262/#sec-array.prototype.some
// 4 -> Array#every
// https://tc39.github.io/ecma262/#sec-array.prototype.every
// 5 -> Array#find
// https://tc39.github.io/ecma262/#sec-array.prototype.find
// 6 -> Array#findIndex
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
module.exports = function (TYPE, specificCreate) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = specificCreate || arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: target.push(value);       // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var isArray = __webpack_require__(60);
var SPECIES = __webpack_require__(11)('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(14);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(62);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63);

module.exports = __webpack_require__(6)('String', 'includes');


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var validateArguments = __webpack_require__(20);
var INCLUDES = 'includes';

var CORRECT_IS_REGEXP_LOGIC = __webpack_require__(21)(INCLUDES);

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
__webpack_require__(1)({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~validateArguments(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var classof = __webpack_require__(14);
var MATCH = __webpack_require__(11)('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(66);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67);

module.exports = __webpack_require__(6)('String', 'startsWith');


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toLength = __webpack_require__(7);
var validateArguments = __webpack_require__(20);
var STARTS_WITH = 'startsWith';
var CORRECT_IS_REGEXP_LOGIC = __webpack_require__(21)(STARTS_WITH);
var nativeStartsWith = ''[STARTS_WITH];

// `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
__webpack_require__(1)({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = validateArguments(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith
      ? nativeStartsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(69);


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);

module.exports = __webpack_require__(6)('String', 'endsWith');


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toLength = __webpack_require__(7);
var validateArguments = __webpack_require__(20);
var ENDS_WITH = 'endsWith';
var nativeEndsWith = ''[ENDS_WITH];
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = __webpack_require__(21)(ENDS_WITH);

// `String.prototype.endsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.endswith
__webpack_require__(1)({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = validateArguments(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = String(searchString);
    return nativeEndsWith
      ? nativeEndsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(72);


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(73);

module.exports = __webpack_require__(75).Object.assign;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(74);

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
__webpack_require__(1)({ target: 'Object', stat: true, forced: Object.assign !== assign }, { assign: assign });


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var objectKeys = __webpack_require__(35);
var getOwnPropertySymbolsModule = __webpack_require__(32);
var propertyIsEnumerableModule = __webpack_require__(33);
var toObject = __webpack_require__(37);
var IndexedObject = __webpack_require__(13);
var nativeAssign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !nativeAssign || __webpack_require__(8)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return nativeAssign({}, A)[S] != 7 || Object.keys(nativeAssign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (propertyIsEnumerable.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : nativeAssign;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});
//# sourceMappingURL=jquerystorage.js.map