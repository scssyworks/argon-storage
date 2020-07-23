(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ArgonStorage = {}));
}(this, (function (exports) { 'use strict';

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

  function isObject(value) {
    return value && _typeof(value) === 'object';
  }
  function def(value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
  }
  function trim(value) {
    return typeof value === 'string' ? value.trim() : '';
  }
  function loopFunc(ref, target) {
    if (isObject(ref)) {
      Object.keys(ref).forEach(function (key) {
        target[key] = ref[key];
      });
    }
  }
  function assign() {
    var i = 0;
    var target = isObject(arguments[0]) ? arguments[0] : {};
    for (i = 1; i < arguments.length; i++) {
      loopFunc(arguments[i], target);
    }
    return target;
  }
  function each(arrayObj, callback) {
    if (arrayObj && arrayObj.length) {
      for (var index = 0; index < arrayObj.length; index += 1) {
        if (typeof callback === 'function') {
          var continueTheLoop = callback.apply(arrayObj, [arrayObj[index], index]);
          if (typeof continueTheLoop === 'boolean') {
            if (continueTheLoop) {
              continue;
            } else {
              break;
            }
          }
        }
      }
    }
  }
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
  var TypeResolver = function () {
    function TypeResolver(value) {
      _classCallCheck(this, TypeResolver);
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

  function setCookie(key, value, expiryDays, path, domain, isSecure) {
    if (key && typeof value !== 'undefined') {
      path = def(path, '/');
      domain = def(domain, loc.hostname);
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
  function getCookie(key, trimResult) {
    if (key) {
      var cookieStr = decodeURIComponent(doc.cookie);
      var value = '';
      each(cookieStr.split(';'), function (cookiePair) {
        var keyPart = "".concat(key, "=");
        var indexOfKey = cookiePair.indexOf(keyPart);
        if (indexOfKey > -1) {
          value = cookiePair.substring(indexOfKey + keyPart.length, cookiePair.length);
          if (trimResult) {
            value = trim(value);
          }
          return false;
        }
      });
      return value;
    }
    return '';
  }
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
  function removeCookie(key, path, domain) {
    var currentValue = getCookie.apply(this, [key]);
    if (key && currentValue.length) {
      path = def(path, '/');
      domain = def(domain, loc.hostname);
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
    }
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

  function isAvailable() {
    try {
      ls.setItem('test', 'test');
      ls.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }
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
  function valueResolver(value) {
    return TypeResolver.match(value) ? new TypeResolver().setValue(value).getValue() : value;
  }
  function getAllMatched(key) {
    var _this = this;
    var allValues = [];
    try {
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
      }
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
  function deleteKey(key) {
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
  var ArgonStorage = function () {
    function ArgonStorage(config) {
      _classCallCheck(this, ArgonStorage);
      this.config = Object.freeze(assign({
        compress: false
      }, config));
    }
    _createClass(ArgonStorage, [{
      key: "set",
      value: function set() {
        return setValue.apply(this, arguments);
      }
    }, {
      key: "get",
      value: function get() {
        var _arguments = arguments;
        var matched = this.getAll.apply(this, arguments).filter(function (obj) {
          if (_arguments[1]) {
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
        return getAllMatched.apply(this, arguments);
      }
    }, {
      key: "remove",
      value: function remove() {
        return deleteKey.apply(this, arguments);
      }
    }, {
      key: "available",
      get: function get() {
        return isAvailable();
      }
    }]);
    return ArgonStorage;
  }();

  exports.compress = toUTF16;
  exports.decompress = fromUTF16;
  exports.default = ArgonStorage;
  exports.getAllCookies = getAllCookies;
  exports.getCookie = getCookie;
  exports.removeCookie = removeCookie;
  exports.setCookie = setCookie;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
