/**
 * JQuery storage extends default storage API to resolve cross-browser issues
 * @author       Sachin Singh
 * @dependencies jQuery 1.11+
 * @date         28/11/2018
 */

import { toUTF16 as compress, fromUTF16 as decompress } from './modules/utf16';

const messages = {
    params: 'Insufficient parameters'
};

const _hasOwn = Object.prototype.hasOwnProperty;

/**
 * Safety method for console logging
 * @param  {...any} args console arguments
 */
function _log(...args) {
    if (typeof console !== "undefined") {
        console.log(...args);
    }
}

/**
 * Safety method for console logging
 * @param  {...any} args console arguments
 */
function _err(...args) {
    if (typeof console !== "undefined") {
        console.error(...args);
    }
}

/**
 * Check if passed value is a pure object
 * @param {*} key Any type of value which needs to be checked if it's an object
 */
function _isObject(value) {
    return (!Array.isArray(value) && value !== null && typeof value === 'object');
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
        const [key, value = '', exp, path = '/', domain = window.location.hostname] = arguments;
        let updateValue = value;
        if (value !== null && typeof value === 'object') {
            updateValue = JSON.stringify(value);
        }
        let dt = new Date();
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
        const expires = exp ? `; expires=${dt.toUTCString()}` : '';
        // Set cookie path parameter
        const cookiePath = `; path=${path.trim()}`;
        let cookieDomain = '';
        // IE does not allow localhost domains
        if (['localhost', '127.0.0.1', null].indexOf(domain) === -1) {
            cookieDomain = `; domain=${domain.trim()}`;
        }
        // Mark the cookie as secure if created in secure context
        let secureCookieFlag = '';
        if (window.location.protocol === 'https:') {
            secureCookieFlag = '; secure';
        }
        // Set the cookie value
        document.cookie = `${key}=${((this.config.compression) ? compress(updateValue) : updateValue)}${expires}${cookieDomain}${cookiePath}${secureCookieFlag}`;
    } else if (this.config.debug) {
        console.log(messages.params);
    }
}

/**
 * Gets cookie value
 * @param {string} key name of cookie
 */
function getCookie() {
    if (arguments.length > 0) {
        let [key] = arguments;
        // Decode the cookie value if it is stored in encoded form
        const cookieString = decodeURIComponent(document.cookie);
        let allCookies = null;
        // Split the cookie string to get individual values
        allCookies = cookieString.split(';');
        if (allCookies.length) {
            // Check if any one key value pair matches the key
            // If yes then return its corresponding value
            let returnValue = '';
            allCookies.forEach(c => {
                const keyIndexOf = c.indexOf(`${key}=`);
                if (keyIndexOf > -1) {
                    // Return the value substring
                    if (this.config.compression) {
                        returnValue = decompress(c.substring((keyIndexOf + `${key}=`.length), c.length)).trim();
                    } else {
                        returnValue = c.substring((keyIndexOf + `${key}=`.length), c.length).trim();
                    }
                }
            });
            return returnValue;
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
        const [key, path = '/', domain = window.location.hostname] = arguments;
        let cookieDomain = '';
        let deletedCookieString = '';
        // IE does not allow localhost domains
        // Hence check if passed domain is not localhost or null
        if (['localhost', '127.0.0.1', null].indexOf(domain) === -1) {
            cookieDomain = `; domain=${domain.trim()}`;
        }
        deletedCookieString = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC${cookieDomain}; path=${path}`;
        document.cookie = deletedCookieString;
        // Check updated value to get deletion status

        return !getCookie.apply(this, [key]).length;
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
    removeCookie.apply(this, [key, path, domain]);
    // Set a new cookie with same name
    setCookie.apply(this, [key, value, exp, path, domain]);
}

class LZStorage {
    constructor(config = {}) {
        this.config = config;
    }
    available() {
        try {
            // If localStorage object is missing or setItem does not function properly on localStorage (e.g. Safari incognito)
            // This methos will throw an error which will tell us if storage API is usable
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            if (this.config.debug) {
                _log("Storage API is not supported in this environment");
            }
            return false;
        }
    }
    set() {
        if (arguments.length > 1) {
            const [key, value, isSession = false] = arguments;
            let savedValue = value;
            // Check if value is stringifiable
            // All values are stores are string in storages
            if (value !== null && typeof value === 'object') {
                savedValue = JSON.stringify(value);
            }
            // If storage is available, set the value in local or session storage based on flag
            if (this.available()) {
                try {
                    window[isSession ? 'sessionStorage' : 'localStorage'].setItem(
                        key,
                        (this.config.compression) ? compress(savedValue) : savedValue
                    );
                } catch (e) {
                    if (this.config.debug) {
                        _err(e);
                    }
                }
            } else {
                // Else set the value in cookie
                this.setCookie(key, savedValue, (isSession ? Infinity : undefined));
            }
        } else {
            if (this.config.debug) {
                _log(messages.params);
            }
        }
    }
    remove() {
        if (arguments.length > 0) {
            const [key] = arguments;
            if (this.available()) {
                try {
                    // Try to remove the value from both the storages
                    window.localStorage.removeItem(key);
                    window.sessionStorage.removeItem(key);
                    // Try to remove from cookie as well and return the combined result
                    return !window.localStorage.key(key) || !window.sessionStorage.key(key) || this.removeCookie(key);
                } catch (e) {
                    if (this.config.debug) {
                        _err(e);
                    }
                }
            }
            return this.removeCookie(key);
        } else {
            if (this.config.debug) {
                _log(messages.params);
            }
        }
    }
    getAll() {
        if (arguments.length > 0) {
            const [key, isSession = false] = arguments;
            const returnValue = [];
            if (this.available()) {
                try {
                    // Specify where to search for value
                    // session storage is default as it will be searched regardless of flag
                    const searchIn = ['sessionStorage'];
                    if (!isSession) {
                        // If session flag is not set expand the search to local storage
                        searchIn.push('localStorage');
                    }
                    // Search for value in all specified storages and combine the results
                    searchIn.forEach((type) => {
                        if (_hasOwn.call(window[type], key)) {
                            returnValue.push({
                                value: (this.config.compression) ? decompress(window[type].getItem(key)) : window[type].getItem(key),
                                storage: type
                            });
                        }
                    });
                } catch (e) {
                    if (this.config.debug) {
                        _err(e);
                    }
                }
            }
            // Complete the search by looking up the key in cookie
            const cookieValue = this.getCookie(key);
            if (cookieValue) {
                returnValue.push({
                    value: cookieValue,
                    storage: 'cookie'
                });
            }
            // Return the combined results
            // Make sure that parsable data is parsed before the actual results are send
            return returnValue.map(data => {
                try {
                    data.value = JSON.parse(data.value);
                } catch (e) {
                    if (this.config.debug) {
                        _log(e);
                    }
                }
                return data;
            });
        }
        return [];
    }
    get() {
        if (arguments.length > 0) {
            const [key, isSession = false] = arguments;
            const valueList = this.getAll(key, isSession);
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
                return valueList.filter(valueOb => valueOb.storage === (isSession ? 'sessionStorage' : 'localStorage'))[0].value;
            }
            // If only two stores are returned, value can be in any two combination of stores:
            // 1. [localStorage, cookie]
            // 2. [sessionStorage, cookie]
            // Get the combination of stores to determine from where the value needs to be fetched
            const storageTypes = valueList.map(valueOb => valueOb.storage);
            // If session flag is true check if value was stored in session storage
            // If not then return the cookie value
            if (isSession) {
                if (storageTypes.indexOf('sessionStorage') > -1) {
                    return valueList.filter(valueOb => valueOb.storage === 'sessionStorage')[0].value;
                }
                return valueList.filter(valueOb => valueOb.storage === 'cookie')[0].value;
            }
            // If session flag is false, cookie value doesn't matter
            // Check for session or local storage and return the value
            return valueList.filter(valueOb => (['sessionStorage', 'localStorage'].indexOf(valueOb.storage) > -1))[0].value;
        } else {
            if (this.config.debug) {
                _log(messages.params);
            }
        }
    }
    update() {
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
            // Make sure that both arguments are passed
            const [key, callback] = arguments;
            // Get all the values
            const values = this.getAll(key);
            // Get the updated value
            let updatedValue = null;
            if (typeof callback === 'function') {
                // It means that the second parameter was passed as a function which can work in number
                // of ways. It may or may not return a value.
                // It it returns a value, then directly use that value as an update
                // Else assume that the data value was modified directly in the stored object
                updatedValue = callback(...values); // All values are passed a separate parameters
            } else if (typeof callback !== undefined) {
                // It means that the updated value was directly passed to the method
                try {
                    updatedValue = JSON.parse(callback);
                } catch (e) {
                    if (this.config.debug) {
                        _err(e);
                    }
                    updatedValue = callback;
                }
            }
            // Check if we have a valid updated value
            if (updatedValue !== undefined) {
                // Check if update value is an object and target key also has an object value
                // In this scenario we need to update the object instead of replacing it
                values.forEach((valueOb) => {
                    const { value } = valueOb;
                    if (_isObject(value) && _isObject(updatedValue)) {
                        valueOb.value = {
                            ...value,
                            ...updatedValue
                        };
                    } else {
                        valueOb.value = updatedValue;
                    }
                });
            }
            // Write back all the values to their destinations
            values.forEach(({ value, storage: store }) => {
                if (['sessionStorage', 'localStorage'].indexOf(store) > -1) {
                    this.set(key, value, store === 'sessionStorage');
                }
                if (store === 'cookie') {
                    this.setCookie(key, value);
                }
            });
        } else {
            if (this.config.debug) {
                _log(messages.params);
            }
        }
    }
    setCookie() {
        return setCookie.apply(this, arguments);
    }
    getCookie() {
        return getCookie.apply(this, arguments);
    }
    removeCookie() {
        return removeCookie.apply(this, arguments);
    }
    resetCookie() {
        return resetCookie.apply(this, arguments);
    }
}

export default LZStorage;