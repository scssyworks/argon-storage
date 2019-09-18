# Argon Storage (Formerly <a href="https://www.npmjs.com/package/lzstorage">LZStorage</a>)

Argon storage is a cross-browser wrapper for Cookies and Storage API. Argon Storage implements data compression using <a href="https://github.com/pieroxy/lz-string">Pieroxy's</a> LZW algorithm, so that you never run out of storage capacity (esp. mobile devices).

# Installation

```sh
npm i argon-storage
```

# How to use?

ES6 modules

```js
import ArgonStorage, { getCookie, setCookie } from 'argon-storage';
const store = new ArgonStorage();
const compressedStore = new ArgonStorage({ compress: true }); // Enable compression
store.set('TestStorage', 'value');
setCookie('TestCookie', 'cookieValue');
store.get('TestStorage'); // -> 'value'
getCookie('TestCookie'); // -> 'cookieValue'
```

ES5

```js
const store = new ArgonStorage.default();
const { getCookie, setCookie } = ArgonStorage;
...
```

# Available methods

```js
store.get(key [, isSession]); // Gets storage value from local storage, session storage or cookie (whichever is available)

store.set(key, value [, isSession]); // Stores a value in storage. If storage is unavailable, the value is saved in cookies

store.getAll(key); // Gets list of matching key values from storage and cookies

store.remove(key); // Removes all values that match from storage and cookies. 


getCookie(key [, trimResults]); // Get's a cookie value

setCookie(key, value [, expiryInDays][, path][, domain][, isSecure]); // Set's a cookie value

removeCookie(key [, path][, domain]); // Removes a cookie value

getAllCookies([matchRegex]); // Get's a list of all available cookies

compress(value); // Returns compressed value

decompress(value); // Decompresses compressed value
```

# What has changed from version 1 and why?

1. Removed ``store.update``. The implementation was complex and much slower than ``store.set('key', { ...store.get('key'), newValue })``, if you know what I mean. It was not practical to use it in real projects.<br>

2. Cookie related functions are now independent from ``store``. You can now import them separately.<br>

3. Added new functions: ``getAllCookies``, ``compress`` and ``decompress`` for more flexibility.<br>

4. Solved an issue with return values from ``store.remove`` and ``removeCookie``. Now these methods will return ``true`` only when values have actually deleted from storage and/or cookies.