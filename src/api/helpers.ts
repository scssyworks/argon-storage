/**
 * Returns true if provided value is an object
 * @param {*} value Any value
 */
function isObject(value: any): boolean {
    return value && typeof value === 'object';
}

/**
 * Safely trims the value
 * @param {*} value Any value
 */
export function trim(value: any) {
    return (typeof value === 'string' ? value.trim() : '');
}

/* eslint-disable */

/**
 * Inner loop function for assign
 * @private
 * @param {object} ref Argument object
 * @param {object} target First object
 */
function loopFunc(ref: any, target: any): void {
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
export function assign(...args: any[]) {
    let i = 0;
    const target = isObject(args[0]) ? args[0] : {};
    for (i = 1; i < args.length; i++) {
        loopFunc(args[i], target);
    }
    return target;
}
/* eslint-enable */

/**
 * Attempts to parse a string value if it can potentially be an object
 * @param {any} value Value
 */
export function tryParse(value: any) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

export function hasOwn(ob: any, prop: (string | number | symbol)) {
    return Object.prototype.hasOwnProperty.call(ob, prop);
}

export class TypeResolver {
    __v: any;
    constructor(value?: any) {
        this.__v = value;
    }
    static match(value: any): boolean {
        return (value && typeof value === 'object' && Object.keys(value).length === 1 && hasOwn(value, '__v'));
    }
    setValue(value: any): TypeResolver {
        if (TypeResolver.match(value)) {
            this.__v = value.__v;
        }
        return this;
    }
    getValue(): any {
        return this.__v;
    }
}