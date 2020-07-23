import { ls, ss } from './vars';
import { assign, tryParse, hasOwn, TypeResolver } from './helpers';
import { toUTF16, fromUTF16 } from '../modules/utf16';
import { setCookie, getCookie, removeCookie } from './cookies';
import { types } from './constants';

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
        value = JSON.stringify(
            (value && typeof value === 'object')
                ? value
                : new TypeResolver(value)
        );
        if (this.available) {
            const storageObj = isSession ? ss : ls;
            try {
                storageObj.setItem(
                    key,
                    (this.config.compress ? toUTF16(value) : value)
                );
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
    return TypeResolver.match(value)
        ? (new TypeResolver().setValue(value)).getValue()
        : value;
}

/**
 * Gets all saved values from storages
 * @param {string} key Key
 */
function getAllMatched(key) {
    const allValues = [];
    try {
        // Local and Session storage
        if (this.available) {
            [ls, ss].forEach(storageType => {
                if (hasOwn(storageType, key)) {
                    const storageVal = storageType.getItem(key);
                    const value = valueResolver(tryParse(
                        this.config.compress
                            ? fromUTF16(storageVal)
                            : storageVal
                    ));
                    allValues.push({
                        key,
                        value,
                        type: types[storageType === ls ? 'LS' : 'SS']
                    });
                }
            });
        }
        // Cookies
        const cookieValue = getCookie(key);
        const value = valueResolver(tryParse(cookieValue));
        if (value) {
            allValues.push({
                key,
                value,
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
        let hasValues = false;
        if (this.available) {
            [ls, ss].forEach(storageType => {
                hasValues = hasValues || !!storageType.getItem(key);
            });
            if (hasValues) {
                [ls, ss].forEach(storageType => {
                    storageType.removeItem(key);
                });
            }
        }
        const cookieRemoved = removeCookie(key);
        return (hasValues || cookieRemoved);
    } catch (e) {
        return removeCookie(key);
    }
}

/**
 * Storage class
 * @class ArgonStorage
 */
export class ArgonStorage {
    constructor(config) {
        this.config = Object.freeze(assign({ compress: false }, config));
    }

    get available() {
        return isAvailable();
    }

    set() {
        return setValue.apply(this, arguments);
    }
    get() {
        const matched = this.getAll.apply(this, arguments).filter(obj => {
            if (arguments[1]) {
                return obj.type === types.SS;
            }
            return true;
        });
        if (matched.length > 0) {
            return matched[0].value;
        }
        return;
    }
    getAll() {
        return getAllMatched.apply(this, arguments);
    }
    remove() {
        return deleteKey.apply(this, arguments);
    }
}