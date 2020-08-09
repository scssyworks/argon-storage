function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

/**
 * Returns true if provided value is an object
 * @param {*} value Any value
 */
function isObject(value) {
  return value && _typeof(value) === 'object';
}
/**
 * Safely trims the value
 * @param {*} value Any value
 */


function trim(value) {
  return typeof value === 'string' ? value.trim() : '';
}
/* eslint-disable */

/**
 * Inner loop function for assign
 * @private
 * @param {object} ref Argument object
 * @param {object} target First object
 */

function loopFunc(ref, target) {
  if (isObject(ref)) {
    Object.keys(ref).forEach(function (key) {
      target[key] = ref[key];
    });
  }
}
/**
 * Polyfill for Object.assign only smaller and with less features
 * @private
 * @returns {object}
 */


function assign() {
  var i = 0;
  var target = isObject(arguments.length <= 0 ? undefined : arguments[0]) ? arguments.length <= 0 ? undefined : arguments[0] : {};

  for (i = 1; i < arguments.length; i++) {
    loopFunc(i < 0 || arguments.length <= i ? undefined : arguments[i], target);
  }

  return target;
}
/* eslint-enable */

/**
 * Attempts to parse a string value if it can potentially be an object
 * @param {any} value Value
 */

function tryParse(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}
function hasOwn(ob, prop) {
  return Object.prototype.hasOwnProperty.call(ob, prop);
}
var TypeResolver = /*#__PURE__*/function () {
  function TypeResolver(value) {
    _classCallCheck(this, TypeResolver);

    _defineProperty(this, "__v", void 0);

    this.__v = value;
  }

  _createClass(TypeResolver, [{
    key: "setValue",
    value: function setValue(value) {
      if (TypeResolver.match(value)) {
        this.__v = value.__v;
      }

      return this;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.__v;
    }
  }], [{
    key: "match",
    value: function match(value) {
      return value && _typeof(value) === 'object' && Object.keys(value).length === 1 && hasOwn(value, '__v');
    }
  }]);

  return TypeResolver;
}();

var loc = typeof location !== 'undefined' ? location : {};
var ls = typeof localStorage !== 'undefined' ? localStorage : {};
var ss = typeof sessionStorage !== 'undefined' ? sessionStorage : {};
var doc = typeof document !== 'undefined' ? document : {};

var MAX_END_DATE = 'Thu, 31 Dec 2037 00:00:00 GMT';
var COOKIE_DEL_DATE = 'Thu, 01 Jan 1970 00:00:00 UTC';
var MILLISECOND_MULTIPLIER = 24 * 60 * 60 * 1000;
var LOCAL_ENV = ['localhost', '0.0.0.0', '127.0.0.1', null];
var types = {
  SS: 'sessionStorage',
  LS: 'localStorage',
  CC: 'cookie'
};

/**
 * Sets user cookie
 * @param {string} key name of cookie
 * @param {any} value cookie value
 * @param {number} exp cookie expiry
 * @param {string} path url path
 * @param {string} domain supported domain
 * @param {boolean} isSecure Sets security flag
 */

function setCookie(key, value, expiryDays) {
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
  var domain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : loc.hostname;
  var isSecure = arguments.length > 5 ? arguments[5] : undefined;

  if (key && typeof value !== 'undefined') {
    var transformedValue = value;

    if (_typeof(value) === 'object' && value) {
      transformedValue = JSON.stringify(value);
    }

    var expiryDate = new Date();

    if (typeof expiryDays === 'number') {
      if (expiryDays === Infinity) {
        expiryDate = new Date(MAX_END_DATE);
      } else {
        expiryDate.setTime(expiryDate.getTime() + expiryDays * MILLISECOND_MULTIPLIER);
      }
    }

    var expires = expiryDays ? "; expires=".concat(expiryDate.toUTCString()) : '';
    var cookiePath = "; path=".concat(path.trim());
    var cookieDomain = LOCAL_ENV.indexOf(domain) === -1 ? "; domain=".concat(domain.trim()) : '';
    var secureFlag = (typeof isSecure === 'boolean' && isSecure || typeof isSecure === 'undefined') && loc.protocol === 'https:' ? '; secure' : '';
    doc.cookie = "".concat(key, " = ").concat(transformedValue).concat(expires).concat(cookieDomain).concat(cookiePath).concat(secureFlag);
  }
}
/**
 * Get's cookie value
 * @param {string} key Key
 * @param {boolean} trimResult Flag to trim the value
 */

function getCookie(key, trimResult) {
  if (key) {
    var cookieStr = decodeURIComponent(doc.cookie);
    var value = '';

    var _iterator = _createForOfIteratorHelper(cookieStr.split(';')),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var cookiePair = _step.value;
        var keyPart = "".concat(key, "=");
        var indexOfKey = cookiePair.indexOf(keyPart);

        if (indexOfKey > -1) {
          value = cookiePair.substring(indexOfKey + keyPart.length, cookiePair.length);

          if (trimResult) {
            value = trim(value);
          }

          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return value;
  }

  return '';
}
/**
 * Returns all cookies
 * @param {object|string} matchRegex Regex to filter cookie values
 */

function getAllCookies(matchRegex) {
  return decodeURIComponent(doc.cookie).split(';').map(function (cookiePair) {
    var keyValuePair = cookiePair.split('=');
    var key = trim(keyValuePair[0]);
    var value = keyValuePair[1];
    return {
      key: key,
      value: value
    };
  }).filter(function (obj) {
    return !!obj.key.match(matchRegex);
  });
}
/**
 * Removes a cookie
 * @param {string} key name of cookie
 * @param {string} path url path
 * @param {string} domain supported domain
 */

function removeCookie(key) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
  var domain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : loc.hostname;
  var currentValue = getCookie.apply(this, [key]);

  if (key && currentValue.length) {
    var cookieDomain = LOCAL_ENV.indexOf(domain) === -1 ? "; domain=".concat(domain.trim()) : '';
    var deletedCookieString = "".concat(key, "=; expires=").concat(COOKIE_DEL_DATE).concat(cookieDomain, "; path=").concat(path);
    doc.cookie = deletedCookieString;
    return !trim(getCookie.apply(this, [key])).length;
  }

  return false;
}

var f = String.fromCharCode;

function _update(context, bitsPerChar, getCharFromInt) {
  if (context.context_data_position == bitsPerChar - 1) {
    context.context_data_position = 0;
    context.context_data.push(getCharFromInt(context.context_data_val));
    context.context_data_val = 0;
  } else {
    context.context_data_position++;
  }
}

function _updateContextNumBits(context) {
  context.context_enlargeIn--;

  if (context.context_enlargeIn == 0) {
    context.context_enlargeIn = Math.pow(2, context.context_numBits);
    context.context_numBits++;
  }
}

function _updateContext(context, bitsPerChar, getCharFromInt) {
  if (hasOwn(context.context_dictionaryToCreate, context.context_w)) {
    if (context.context_w.charCodeAt(0) < 256) {
      for (var i = 0; i < context.context_numBits; i++) {
        context.context_data_val = context.context_data_val << 1;

        _update(context, bitsPerChar, getCharFromInt);
      }

      context.value = context.context_w.charCodeAt(0);

      for (var _i = 0; _i < 8; _i++) {
        context.context_data_val = context.context_data_val << 1 | context.value & 1;

        _update(context, bitsPerChar, getCharFromInt);

        context.value = context.value >> 1;
      }
    } else {
      context.value = 1;

      for (var _i2 = 0; _i2 < context.context_numBits; _i2++) {
        context.context_data_val = context.context_data_val << 1 | context.value;

        _update(context, bitsPerChar, getCharFromInt);

        context.value = 0;
      }

      context.value = context.context_w.charCodeAt(0);

      for (var _i3 = 0; _i3 < 16; _i3++) {
        context.context_data_val = context.context_data_val << 1 | context.value & 1;

        _update(context, bitsPerChar, getCharFromInt);

        context.value = context.value >> 1;
      }
    }

    _updateContextNumBits(context);

    delete context.context_dictionaryToCreate[context.context_w];
  } else {
    context.value = context.context_dictionary[context.context_w];

    for (var _i4 = 0; _i4 < context.context_numBits; _i4++) {
      context.context_data_val = context.context_data_val << 1 | context.value & 1;

      _update(context, bitsPerChar, getCharFromInt);

      context.value = context.value >> 1;
    }
  }

  _updateContextNumBits(context);
}

function compress(uncompressed, bitsPerChar, getCharFromInt) {
  if (uncompressed == null) {
    return '';
  }

  var context = {
    context_dictionary: {},
    context_dictionaryToCreate: {},
    context_data: [],
    context_c: "",
    context_wc: "",
    context_w: "",
    context_enlargeIn: 2,
    context_dictSize: 3,
    context_numBits: 2,
    context_data_val: 0,
    context_data_position: 0
  };
  var i = 0;

  for (var ii = 0; ii < uncompressed.length; ii += 1) {
    context.context_c = uncompressed.charAt(ii);

    if (!hasOwn(context.context_dictionary, context.context_c)) {
      context.context_dictionary[context.context_c] = context.context_dictSize++;
      context.context_dictionaryToCreate[context.context_c] = true;
    }

    context.context_wc = context.context_w + context.context_c;

    if (hasOwn(context.context_dictionary, context.context_wc)) {
      context.context_w = context.context_wc;
    } else {
      _updateContext(context, bitsPerChar, getCharFromInt);

      context.context_dictionary[context.context_wc] = context.context_dictSize++;
      context.context_w = String(context.context_c);
    }
  }

  if (context.context_w !== "") {
    _updateContext(context, bitsPerChar, getCharFromInt);
  }

  context.value = 2;

  for (i = 0; i < context.context_numBits; i++) {
    context.context_data_val = context.context_data_val << 1 | context.value & 1;

    _update(context, bitsPerChar, getCharFromInt);

    context.value = context.value >> 1;
  } // Flush the last char


  while (true) {
    context.context_data_val = context.context_data_val << 1;

    if (context.context_data_position == bitsPerChar - 1) {
      context.context_data.push(getCharFromInt(context.context_data_val));
      break;
    } else context.context_data_position++;
  }

  return context.context_data.join('');
}

function _commonRep3(data, maxpower, resetValue, getNextValue) {
  var bits = 0;
  var power = 1;

  while (power !== maxpower) {
    var resb = data.val & data.position;
    data.position >>= 1;

    if (data.position === 0) {
      data.position = resetValue;
      data.val = getNextValue(data.index++);
    }

    bits |= (resb > 0 ? 1 : 0) * power;
    power <<= 1;
  }

  return bits;
}

function decompress(length, resetValue, getNextValue) {
  var dictionary = [];
  var data = {
    val: getNextValue(0),
    position: resetValue,
    index: 1
  };
  var result = [];
  var enlargeIn = 4;
  var dictSize = 4;
  var numBits = 3;
  var entry = '';
  var w;
  var c;

  for (var i = 0; i < 3; i++) {
    dictionary[i] = i;
  }

  switch (_commonRep3(data, Math.pow(2, 2), resetValue, getNextValue)) {
    case 0:
      c = f(_commonRep3(data, Math.pow(2, 8), resetValue, getNextValue));
      break;

    case 1:
      c = f(_commonRep3(data, Math.pow(2, 16), resetValue, getNextValue));
      break;

    case 2:
      return '';
  }

  dictionary[3] = c;
  w = c;
  result.push(c);

  while (true) {
    if (data.index > length) {
      return '';
    }

    switch (c = _commonRep3(data, Math.pow(2, numBits), resetValue, getNextValue)) {
      case 0:
        dictionary[dictSize++] = f(_commonRep3(data, Math.pow(2, 8), resetValue, getNextValue));
        c = dictSize - 1;
        enlargeIn--;
        break;

      case 1:
        dictionary[dictSize++] = f(_commonRep3(data, Math.pow(2, 16), resetValue, getNextValue));
        c = dictSize - 1;
        enlargeIn--;
        break;

      case 2:
        return result.join('');
    }

    if (enlargeIn === 0) {
      enlargeIn = Math.pow(2, numBits);
      numBits++;
    }

    if (dictionary[c]) {
      entry = dictionary[c];
    } else {
      if (c === dictSize) {
        entry = w + w.charAt(0);
      } else {
        return null;
      }
    }

    result.push(entry);
    dictionary[dictSize++] = w + entry.charAt(0);
    enlargeIn--;
    w = entry;

    if (enlargeIn === 0) {
      enlargeIn = Math.pow(2, numBits);
      numBits++;
    }
  }
}

function toUTF16(input) {
  if (input == null) {
    return '';
  }

  return compress(input, 15, function (a) {
    return f(a + 32);
  }) + ' ';
}
function fromUTF16(compressed) {
  if (compressed == null) {
    return '';
  }

  if (compressed === '') {
    return null;
  }

  return decompress(compressed.length, 16384, function (index) {
    return compressed.charCodeAt(index) - 32;
  });
}

/**
 * Tests availability of storage API
 */

function isAvailable() {
  try {
    ls.setItem('test', 'test');
    ls.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * Sets storage value
 * @param {string} key Key
 * @param {string} value Value
 * @param {string} isSession Flag to store in session storage
 */


function setValue(key, value, isSession) {
  if (key && typeof value !== 'undefined') {
    value = JSON.stringify(value && _typeof(value) === 'object' ? value : new TypeResolver(value));

    if (this.available) {
      var storageObj = isSession ? ss : ls;

      try {
        storageObj.setItem(key, this.config.compress ? toUTF16(value) : value);
      } catch (e) {
        setCookie(key, value, isSession ? undefined : Infinity);
      }
    } else {
      setCookie(key, value, isSession ? undefined : Infinity);
    }
  }
}
/**
 * Resolves the current value currectly
 * @param {any} value Input value
 */


function valueResolver(value) {
  return TypeResolver.match(value) ? new TypeResolver().setValue(value).getValue() : value;
}
/**
 * Gets all saved values from storages
 * @param {string} key Key
 */


function getAllMatched() {
  var _this = this;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var key = args[0];
  var allValues = [];

  try {
    // Local and Session storage
    if (this.available) {
      [ls, ss].forEach(function (storageType) {
        if (hasOwn(storageType, key)) {
          var storageVal = storageType.getItem(key);

          var _value = valueResolver(tryParse(_this.config.compress ? fromUTF16(storageVal) : storageVal));

          allValues.push({
            key: key,
            value: _value,
            type: types[storageType === ls ? 'LS' : 'SS']
          });
        }
      });
    } // Cookies


    var cookieValue = getCookie(key);
    var value = valueResolver(tryParse(cookieValue));

    if (value) {
      allValues.push({
        key: key,
        value: value,
        type: types.CC
      });
    }
  } catch (e) {
    throw new TypeError(e.message);
  }

  return allValues;
}
/**
 * Removes all keys
 * @param {object|string} matchRegex Regular expression to match keys to be deleted
 */


function deleteKey() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var key = args[0];

  try {
    var hasValues = false;

    if (this.available) {
      [ls, ss].forEach(function (storageType) {
        hasValues = hasValues || !!storageType.getItem(key);
      });

      if (hasValues) {
        [ls, ss].forEach(function (storageType) {
          storageType.removeItem(key);
        });
      }
    }

    var cookieRemoved = removeCookie(key);
    return hasValues || cookieRemoved;
  } catch (e) {
    return removeCookie(key);
  }
}
/**
 * Storage class
 * @class ArgonStorage
 */


var _available = new WeakMap();

var ArgonStorage = /*#__PURE__*/function () {
  function ArgonStorage(config) {
    _classCallCheck(this, ArgonStorage);

    _available.set(this, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "config", void 0);

    this.config = Object.freeze(assign({
      compress: false
    }, config));

    _classPrivateFieldSet(this, _available, isAvailable());
  }

  _createClass(ArgonStorage, [{
    key: "set",
    value: function set(key, value, isSession) {
      return setValue.apply(this, [key, value, isSession]);
    }
  }, {
    key: "get",
    value: function get() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var matched = this.getAll.apply(this, args).filter(function (obj) {
        if (args[1]) {
          return obj.type === types.SS;
        }

        return true;
      });

      if (matched.length > 0) {
        return matched[0].value;
      }

      return;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return getAllMatched.apply(this, args);
    }
  }, {
    key: "remove",
    value: function remove() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return deleteKey.apply(this, args);
    }
  }, {
    key: "available",
    get: function get() {
      return _classPrivateFieldGet(this, _available);
    }
  }]);

  return ArgonStorage;
}();

export default ArgonStorage;
export { toUTF16 as compress, fromUTF16 as decompress, getAllCookies, getCookie, removeCookie, setCookie };
//# sourceMappingURL=index.esm.js.map
