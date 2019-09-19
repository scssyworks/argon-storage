/**
 * Returns default if original is undefined
 * @param {*} value Original value
 * @param {*} defaultValue Default value
 */
export function setDefault(value, defaultValue) {
    if (typeof value === 'undefined') {
        return defaultValue;
    }
    return value;
}

/**
 * Safely trims the value
 * @param {*} value Any value
 */
export function trim(value) {
    return (typeof value === 'string' ? value.trim() : '');
}

/* eslint-disable */

/**
 * Inner loop function for assign
 * @private
 * @param {object} ref Argument object
 * @param {object} target First object
 */
function loopFunc(ref, target) {
    if (ref != null && typeof ref === 'object') {
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
export function assign() {
    let i = 0;
    const target = typeof arguments[0] !== 'object' || arguments[0] == null ? {} : arguments[0];
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
export function each(arrayObj, callback) {
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

/**
 * Attempts to parse a string value if it can potentially be an object
 * @param {any} value Value
 */
export function tryParse(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}