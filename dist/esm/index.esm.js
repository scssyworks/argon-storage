function isObject(value) {
    return value && typeof value === 'object';
}
function def(value, defaultValue) {
    if (typeof value === 'undefined') {
        return defaultValue;
    }
    return value;
}
function trim(value) {
    return (typeof value === 'string' ? value.trim() : '');
}
function loopFunc(ref, target) {
    if (isObject(ref)) {
        Object.keys(ref).forEach(function (key) {
            target[key] = ref[key];
        });
    }
}
function assign() {
    let i = 0;
    const target = isObject(arguments[0]) ? arguments[0] : {};
    for (i = 1; i < arguments.length; i++) {
        loopFunc(arguments[i], target);
    }
    return target;
}
function each(arrayObj, callback) {
    if (arrayObj && arrayObj.length) {
        for (let index = 0; index < arrayObj.length; index += 1) {
            if (typeof callback === 'function') {
                const continueTheLoop = callback.apply(arrayObj, [arrayObj[index], index]);
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

const loc = window.location;
const ls = window.localStorage;
const ss = window.sessionStorage;

const MAX_END_DATE = 'Thu, 31 Dec 2037 00:00:00 GMT';
const COOKIE_DEL_DATE = 'Thu, 01 Jan 1970 00:00:00 UTC';
const MILLISECOND_MULTIPLIER = (24 * 60 * 60 * 1000);
const LOCAL_ENV = ['localhost', '0.0.0.0', '127.0.0.1', null];
const types = {
    SS: 'sessionStorage',
    LS: 'localStorage',
    CC: 'cookie'
};

function setCookie(key, value, expiryDays, path, domain, isSecure) {
    if (key && typeof value !== 'undefined') {
        path = def(path, '/');
        domain = def(domain, loc.hostname);
        let transformedValue = value;
        if (typeof value === 'object' && value) {
            transformedValue = JSON.stringify(value);
        }
        let expiryDate = new Date();
        if (typeof expiryDate === 'number') {
            if (expiryDays === Infinity) {
                expiryDate = new Date(MAX_END_DATE);
            } else {
                expiryDate.setTime(expiryDate.getTime() + (expiryDays * MILLISECOND_MULTIPLIER));
            }
        }
        const expires = expiryDays ? `; expires=${expiryDate.toUTCString()}` : '';
        const cookiePath = `; path=${path.trim()}`;
        const cookieDomain = (LOCAL_ENV.indexOf(domain) === -1) ? `; domain=${domain.trim()}` : '';
        const secureFlag = (((typeof isSecure === 'boolean' && isSecure)
            || (typeof isSecure === 'undefined')) && (loc.protocol === 'https:')) ? '; secure' : '';
        document.cookie = `${key} = ${transformedValue}${expires}${cookieDomain}${cookiePath}${secureFlag}`;
    }
}
function getCookie(key, trimResult) {
    if (key) {
        const cookieStr = decodeURIComponent(document.cookie);
        let value = '';
        each(cookieStr.split(';'), cookiePair => {
            const keyPart = `${key}=`;
            const indexOfKey = cookiePair.indexOf(keyPart);
            if (indexOfKey > -1) {
                value = cookiePair.substring((indexOfKey + keyPart.length), cookiePair.length);
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
    return decodeURIComponent(document.cookie).split(';').map(cookiePair => {
        const keyValuePair = cookiePair.split('=');
        const key = trim(keyValuePair[0]);
        const value = keyValuePair[1];
        return { key, value };
    }).filter(obj => {
        return !!obj.key.match(matchRegex);
    });
}
function removeCookie(key, path, domain) {
    const currentValue = getCookie.apply(this, [key]);
    if (key && currentValue.length) {
        path = def(path, '/');
        domain = def(domain, loc.hostname);
        const cookieDomain = LOCAL_ENV.indexOf(domain) === -1 ? `; domain=${domain.trim()}` : '';
        const deletedCookieString = `${key}=; expires=${COOKIE_DEL_DATE}${cookieDomain}; path=${path}`;
        document.cookie = deletedCookieString;
        return !trim(getCookie.apply(this, [key])).length;
    }
    return false;
}

const f = String.fromCharCode;

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
        context.context_enlargeIn = 2 ** context.context_numBits;
        context.context_numBits++;
    }
}
function _updateContext(context, bitsPerChar, getCharFromInt) {
    if (hasOwn(context.context_dictionaryToCreate, context.context_w)) {
        if (context.context_w.charCodeAt(0) < 256) {
            for (let i = 0; i < context.context_numBits; i++) {
                context.context_data_val = (context.context_data_val << 1);
                _update(context, bitsPerChar, getCharFromInt);
            }
            context.value = context.context_w.charCodeAt(0);
            for (let i = 0; i < 8; i++) {
                context.context_data_val = (context.context_data_val << 1) | (context.value & 1);
                _update(context, bitsPerChar, getCharFromInt);
                context.value = context.value >> 1;
            }
        } else {
            context.value = 1;
            for (let i = 0; i < context.context_numBits; i++) {
                context.context_data_val = (context.context_data_val << 1) | context.value;
                _update(context, bitsPerChar, getCharFromInt);
                context.value = 0;
            }
            context.value = context.context_w.charCodeAt(0);
            for (let i = 0; i < 16; i++) {
                context.context_data_val = (context.context_data_val << 1) | (context.value & 1);
                _update(context, bitsPerChar, getCharFromInt);
                context.value = context.value >> 1;
            }
        }
        _updateContextNumBits(context);
        delete context.context_dictionaryToCreate[context.context_w];
    } else {
        context.value = context.context_dictionary[context.context_w];
        for (let i = 0; i < context.context_numBits; i++) {
            context.context_data_val = (context.context_data_val << 1) | (context.value & 1);
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
    const context = {
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
    let i = 0;
    for (let ii = 0; ii < uncompressed.length; ii += 1) {
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
        context.context_data_val = (context.context_data_val << 1) | (context.value & 1);
        _update(context, bitsPerChar, getCharFromInt);
        context.value = context.value >> 1;
    }
    while (true) {
        context.context_data_val = (context.context_data_val << 1);
        if (context.context_data_position == bitsPerChar - 1) {
            context.context_data.push(getCharFromInt(context.context_data_val));
            break;
        }
        else context.context_data_position++;
    }
    return context.context_data.join('');
}

function _commonRep3(data, maxpower, resetValue, getNextValue) {
    let bits = 0;
    let power = 1;
    while (power !== maxpower) {
        const resb = data.val & data.position;
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
    const dictionary = [];
    const data = {
        val: getNextValue(0),
        position: resetValue,
        index: 1
    };
    const result = [];
    let enlargeIn = 4;
    let dictSize = 4;
    let numBits = 3;
    let entry = '';
    let w;
    let c;
    for (let i = 0; i < 3; i++) {
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
    return compress(input, 15, (a) => f(a + 32)) + ' ';
}
function fromUTF16(compressed) {
    if (compress == null) {
        return '';
    }
    if (compress === '') {
        return null;
    }
    return decompress(compressed.length, 16384, (index) => (compressed.charCodeAt(index) - 32));
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
function getAllMatched(key) {
    const allValues = [];
    try {
        if (this.available) {
            [ls, ss].forEach(storageType => {
                if (hasOwn(storageType, key)) {
                    const value = storageType.getItem(key);
                    allValues.push({
                        key,
                        value: tryParse(this.config.compress ? fromUTF16(value) : value),
                        type: types[storageType === ls ? 'LS' : 'SS']
                    });
                }
            });
        }
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
class ArgonStorage {
    constructor(config) {
        this.config = Object.freeze(assign({ compress: false }, config));
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

export default ArgonStorage;
export { toUTF16 as compress, fromUTF16 as decompress, getAllCookies, getCookie, removeCookie, setCookie };
//# sourceMappingURL=index.esm.js.map
