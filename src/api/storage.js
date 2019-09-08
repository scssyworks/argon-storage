import { ls, ss, hasOwn } from './vars';
import { assign, tryParse } from './helpers';
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
        if (typeof value === 'object' && value) {
            value = JSON.stringify(value);
        }
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
 * Gets all saved values from storages
 * @param {string} key Key
 */
function getAllMatched(key) {
    const allValues = [];
    try {
        // Local and Session storage
        if (this.available) {
            [ls, ss].forEach(storageType => {
                if (hasOwn.call(storageType, key)) {
                    const value = storageType.getItem(key);
                    allValues.push({
                        key,
                        value: tryParse(this.config.compress ? fromUTF16(value) : value),
                        type: types[storageType === ls ? 'LS' : 'SS']
                    });
                }
            });
        }
        // Cookies
        const value = getCookie(key);
        if (value) {
            allValues.push({
                key,
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
            [ls, ss].forEach(storageType => {
                storageType.removeItem(key);
            });
        }
        return (!!this.get(key) || removeCookie(key));
    } catch (e) {
        return removeCookie(key);
    }
}

/**
 * Storage class
 * @class LZStorage
 */
export class LZStorage {
    constructor(config) {
        this.config = assign(config, { compress: false });
        this.available = isAvailable();
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