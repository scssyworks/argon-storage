(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.lzs = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
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

  /**
   * Returns default if original is undefined
   * @param {*} value Original value
   * @param {*} defaultValue Default value
   */
  function setDefault(value, defaultValue) {
    if (typeof value === 'undefined') {
      return defaultValue;
    }

    return value;
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
    if (ref != null && _typeof(ref) === 'object') {
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
    var target = _typeof(arguments[0]) !== 'object' || arguments[0] == null ? {} : arguments[0];

    for (i = 1; i < arguments.length; i++) {
      loopFunc(arguments[i], target);
    }

    return target;
  }
  /* eslint-enable */

  /**
   * Loops over an array like object
   * @param {object} arrayObj Array or array like object
   * @param {function} callback Callback function
   */

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

  var loc = window.location;
  var ls = window.localStorage;
  var ss = window.sessionStorage;
  var hasOwn = Object.prototype.hasOwnProperty;

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
   * @param {string} value cookie value
   * @param {string} exp cookie expiry
   * @param {string} path url path
   * @param {string} domain supported domain
   * @param {boolean} isSecure Sets security flag
   */

  function setCookie(key, value, expiryDays, path, domain, isSecure) {
    if (key && typeof value !== 'undefined') {
      path = setDefault(path, '/');
      domain = setDefault(domain, loc.hostname);
      var transformedValue = value;

      if (_typeof(value) === 'object' && value) {
        transformedValue = JSON.stringify(value);
      }

      var expiryDate = new Date();

      if (typeof expiryDate === 'number') {
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
      document.cookie = "".concat(key, " = ").concat(transformedValue).concat(expires).concat(cookieDomain).concat(cookiePath).concat(secureFlag);
    }
  }
  /**
   * Get's cookie value
   * @param {string} key Key
   * @param {boolean} trimResult Flag to trim the value
   */

  function getCookie(key, trimResult) {
    if (key) {
      var cookieStr = decodeURIComponent(document.cookie);
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
  /**
   * Returns all cookies
   * @param {object|string} matchRegex Regex to filter cookie values
   */

  function getAllCookies(matchRegex) {
    return decodeURIComponent(document.cookie).split(';').map(function (cookiePair) {
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

  function removeCookie(key, path, domain) {
    if (key) {
      path = setDefault(path, '/');
      domain = setDefault(domain, loc.hostname);
      var cookieDomain = LOCAL_ENV.indexOf(domain) === -1 ? "; domain=".concat(domain.trim()) : '';
      var deletedCookieString = "".concat(key, "=; expires=").concat(COOKIE_DEL_DATE).concat(cookieDomain, "; path=").concat(path);
      document.cookie = deletedCookieString;
      return !getCookie.apply(this, [key]).length;
    }

    return false;
  }

  var f = String.fromCharCode;

  function _updateContext(context, bitsPerChar, getCharFromInt) {
    if (hasOwn.call(context.context_dictionaryToCreate, context.context_w)) {
      if (context.context_w.charCodeAt(0) < 256) {
        for (var i = 0; i < context.context_numBits; i++) {
          context.context_data_val = context.context_data_val << 1;

          if (context.context_data_position == bitsPerChar - 1) {
            context.context_data_position = 0;
            context.context_data.push(getCharFromInt(context.context_data_val));
            context.context_data_val = 0;
          } else {
            context.context_data_position++;
          }
        }

        context.value = context.context_w.charCodeAt(0);

        for (var _i = 0; _i < 8; _i++) {
          context.context_data_val = context.context_data_val << 1 | context.value & 1;

          if (context.context_data_position == bitsPerChar - 1) {
            context.context_data_position = 0;
            context.context_data.push(getCharFromInt(context.context_data_val));
            context.context_data_val = 0;
          } else {
            context.context_data_position++;
          }

          context.value = context.value >> 1;
        }
      } else {
        context.value = 1;

        for (var _i2 = 0; _i2 < context.context_numBits; _i2++) {
          context.context_data_val = context.context_data_val << 1 | context.value;

          if (context.context_data_position == bitsPerChar - 1) {
            context.context_data_position = 0;
            context.context_data.push(getCharFromInt(context.context_data_val));
            context.context_data_val = 0;
          } else {
            context.context_data_position++;
          }

          context.value = 0;
        }

        context.value = context.context_w.charCodeAt(0);

        for (var _i3 = 0; _i3 < 16; _i3++) {
          context.context_data_val = context.context_data_val << 1 | context.value & 1;

          if (context.context_data_position == bitsPerChar - 1) {
            context.context_data_position = 0;
            context.context_data.push(getCharFromInt(context.context_data_val));
            context.context_data_val = 0;
          } else {
            context.context_data_position++;
          }

          context.value = context.value >> 1;
        }
      }

      context.context_enlargeIn--;

      if (context.context_enlargeIn == 0) {
        context.context_enlargeIn = Math.pow(2, context.context_numBits);
        context.context_numBits++;
      }

      delete context.context_dictionaryToCreate[context.context_w];
    } else {
      context.value = context.context_dictionary[context.context_w];

      for (var _i4 = 0; _i4 < context.context_numBits; _i4++) {
        context.context_data_val = context.context_data_val << 1 | context.value & 1;

        if (context.context_data_position == bitsPerChar - 1) {
          context.context_data_position = 0;
          context.context_data.push(getCharFromInt(context.context_data_val));
          context.context_data_val = 0;
        } else {
          context.context_data_position++;
        }

        context.value = context.value >> 1;
      }
    }

    context.context_enlargeIn--;

    if (context.context_enlargeIn == 0) {
      context.context_enlargeIn = Math.pow(2, context.context_numBits);
      context.context_numBits++;
    }
  }

  function compress() {
    var uncompressed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var bitsPerChar = arguments.length > 1 ? arguments[1] : undefined;
    var getCharFromInt = arguments.length > 2 ? arguments[2] : undefined;

    if (uncompressed === null) {
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

      if (!hasOwn.call(context.context_dictionary, context.context_c)) {
        context.context_dictionary[context.context_c] = context.context_dictSize++;
        context.context_dictionaryToCreate[context.context_c] = true;
      }

      context.context_wc = context.context_w + context.context_c;

      if (hasOwn.call(context.context_dictionary, context.context_wc)) {
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

      if (context.context_data_position == bitsPerChar - 1) {
        context.context_data_position = 0;
        context.context_data.push(getCharFromInt(context.context_data_val));
        context.context_data_val = 0;
      } else {
        context.context_data_position++;
      }

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

  function decompress(length, resetValue, getNextValue) {
    var dictionary = [];
    var data = {
      val: getNextValue(0),
      position: resetValue,
      index: 1
    };
    var result = [];
    var next;
    var enlargeIn = 4;
    var dictSize = 4;
    var numBits = 3;
    var entry = "";
    var w;
    var resb;
    var c;

    for (var i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }

    var bits = 0;
    var maxpower = Math.pow(2, 2);
    var power = 1;

    while (power !== maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;

      if (data.position === 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }

      bits |= (resb > 0 ? 1 : 0) * power;
      power <<= 1;
    }

    next = bits;

    switch (next) {
      case 0:
        bits = 0;
        maxpower = Math.pow(2, 8);
        power = 1;

        while (power !== maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;

          if (data.position === 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }

          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }

        c = f(bits);
        break;

      case 1:
        bits = 0;
        maxpower = Math.pow(2, 16);
        power = 1;

        while (power !== maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;

          if (data.position === 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }

          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }

        c = f(bits);
        break;

      case 2:
        return "";
    }

    dictionary[3] = c;
    w = c;
    result.push(c);

    while (true) {
      if (data.index > length) {
        return "";
      }

      bits = 0;
      maxpower = Math.pow(2, numBits);
      power = 1;

      while (power !== maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;

        if (data.position === 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }

        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2, 8);
          power = 1;

          while (power !== maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;

            if (data.position === 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }

            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize - 1;
          enlargeIn--;
          break;

        case 1:
          bits = 0;
          maxpower = Math.pow(2, 16);
          power = 1;

          while (power !== maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;

            if (data.position === 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }

            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
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

  function toUTF16() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (input === null) {
      return '';
    }

    return compress(input, 15, function (a) {
      return f(a + 32);
    }) + ' ';
  }
  function fromUTF16() {
    var compressed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (compress === null) {
      return '';
    }

    if (compress === '') {
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
      if (_typeof(value) === 'object' && value) {
        value = JSON.stringify(value);
      }

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
   * Gets all saved values from storages
   * @param {string} key Key
   */


  function getAllMatched(key) {
    var _this = this;

    var allValues = [];

    try {
      // Local and Session storage
      if (this.available) {
        [ls, ss].forEach(function (storageType) {
          if (hasOwn.call(storageType, key)) {
            var _value = storageType.getItem(key);

            allValues.push({
              key: key,
              value: tryParse(_this.config.compress ? fromUTF16(_value) : _value),
              type: types[storageType === ls ? 'LS' : 'SS']
            });
          }
        });
      } // Cookies


      var value = getCookie(key);

      if (value) {
        allValues.push({
          key: key,
          value: tryParse(value),
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


  function deleteKey(key) {
    try {
      if (this.available) {
        [ls, ss].forEach(function (storageType) {
          storageType.removeItem(key);
        });
      }

      return !!this.get(key) || removeCookie(key);
    } catch (e) {
      return removeCookie(key);
    }
  }
  /**
   * Storage class
   * @class LZStorage
   */


  var LZStorage =
  /*#__PURE__*/
  function () {
    function LZStorage(config) {
      _classCallCheck(this, LZStorage);

      this.config = assign(config, {
        compress: false
      });
      this.available = isAvailable();
    }

    _createClass(LZStorage, [{
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
    }]);

    return LZStorage;
  }();

  exports.LZStorage = LZStorage;
  exports.compress = toUTF16;
  exports.decompress = fromUTF16;
  exports.getAllCookies = getAllCookies;
  exports.getCookie = getCookie;
  exports.removeCookie = removeCookie;
  exports.setCookie = setCookie;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=lzstorage.js.map
