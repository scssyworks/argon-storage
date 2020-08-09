import { trim } from './helpers';
import { loc, doc } from './vars';
import { MAX_END_DATE, MILLISECOND_MULTIPLIER, LOCAL_ENV, COOKIE_DEL_DATE } from './constants';

/**
 * Sets user cookie
 * @param {string} key name of cookie
 * @param {any} value cookie value
 * @param {number} exp cookie expiry
 * @param {string} path url path
 * @param {string} domain supported domain
 * @param {boolean} isSecure Sets security flag
 */
export function setCookie(
    key: string,
    value: any,
    expiryDays?: number,
    path = '/',
    domain = loc.hostname,
    isSecure?: boolean
): void {
    if (key && typeof value !== 'undefined') {
        let transformedValue = value;
        if (typeof value === 'object' && value) {
            transformedValue = JSON.stringify(value);
        }
        let expiryDate = new Date();
        if (typeof expiryDays === 'number') {
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
        doc.cookie = `${key} = ${transformedValue}${expires}${cookieDomain}${cookiePath}${secureFlag}`;
    }
}

/**
 * Get's cookie value
 * @param {string} key Key
 * @param {boolean} trimResult Flag to trim the value
 */
export function getCookie(
    key: string,
    trimResult?: boolean
): string {
    if (key) {
        const cookieStr = decodeURIComponent(doc.cookie);
        let value = '';
        for (const cookiePair of cookieStr.split(';')) {
            const keyPart = `${key}=`;
            const indexOfKey = cookiePair.indexOf(keyPart);
            if (indexOfKey > -1) {
                value = cookiePair.substring((indexOfKey + keyPart.length), cookiePair.length);
                if (trimResult) {
                    value = trim(value);
                }
                break;
            }
        }
        return value;
    }
    return '';
}

/**
 * Returns all cookies
 * @param {object|string} matchRegex Regex to filter cookie values
 */
export function getAllCookies(
    matchRegex: RegExp
): {
    key: string,
    value: string
}[] {
    return decodeURIComponent(doc.cookie).split(';').map(cookiePair => {
        const keyValuePair = cookiePair.split('=');
        const key = trim(keyValuePair[0]);
        const value = keyValuePair[1];
        return { key, value };
    }).filter(obj => {
        return !!obj.key.match(matchRegex);
    });
}

/**
 * Removes a cookie
 * @param {string} key name of cookie
 * @param {string} path url path
 * @param {string} domain supported domain
 */
export function removeCookie(
    key: string,
    path = '/',
    domain = loc.hostname
): boolean {
    const currentValue = getCookie.apply(this, [key]);
    if (key && currentValue.length) {
        const cookieDomain = LOCAL_ENV.indexOf(domain) === -1 ? `; domain=${domain.trim()}` : '';
        const deletedCookieString = `${key}=; expires=${COOKIE_DEL_DATE}${cookieDomain}; path=${path}`;
        doc.cookie = deletedCookieString;
        return !trim(getCookie.apply(this, [key])).length;
    }
    return false;
}