import { setDefault, trim, each } from './helpers';
import { loc } from './vars';
import { MAX_END_DATE, MILLISECOND_MULTIPLIER, LOCAL_ENV, COOKIE_DEL_DATE } from './constants';

/**
 * Sets user cookie
 * @param {string} key name of cookie
 * @param {string} value cookie value
 * @param {string} exp cookie expiry
 * @param {string} path url path
 * @param {string} domain supported domain
 * @param {boolean} isSecure Sets security flag
 */
export function setCookie(key, value, expiryDays, path, domain, isSecure) {
    if (key && typeof value !== 'undefined') {
        path = setDefault(path, '/');
        domain = setDefault(domain, loc.hostname);
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

/**
 * Get's cookie value
 * @param {string} key Key
 * @param {boolean} trimResult Flag to trim the value
 */
export function getCookie(key, trimResult) {
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

/**
 * Returns all cookies
 * @param {object|string} matchRegex Regex to filter cookie values
 */
export function getAllCookies(matchRegex) {
    return decodeURIComponent(document.cookie).split(';').map(cookiePair => {
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
export function removeCookie(key, path, domain) {
    const currentValue = getCookie.apply(this, [key]);
    if (key && currentValue.length) {
        path = setDefault(path, '/');
        domain = setDefault(domain, loc.hostname);
        const cookieDomain = LOCAL_ENV.indexOf(domain) === -1 ? `; domain=${domain.trim()}` : '';
        const deletedCookieString = `${key}=; expires=${COOKIE_DEL_DATE}${cookieDomain}; path=${path}`;
        document.cookie = deletedCookieString;
        return !trim(getCookie.apply(this, [key])).length;
    }
    return false;
}