[![Build Status](https://travis-ci.org/scssyworks/lzstorage.svg?branch=master)](https://travis-ci.org/scssyworks/lzstorage)

# Argon Storage

Argon storage is a cross-browser wrapper for local storage.

# Installation

```sh
npm i argon-storage
```

# How does it work?

### Argon storage test's if your current browser supports local/session storage API. If not, it stores data in cookies.

With Argon Storage
```js
import ArgonStorage from 'argon-storage';
const store = new ArgonStorage();

store.set('dataKey', 'dataValue');
const value = store.get('dataKey'); // --> 'dataValue'
```

Without Argon Storage
```js
let value = '';
try {
    localStorage && localStorage.setItem('dataKey', 'dataValue');
    if (localStorage) {
        value = localStorage.getItem('dataKey'); // --> 'dataValue'
    }
} catch(e) {
    // Assuming you have 'setCookie' and 'getCookie' implementation available
    setCookie('dataKey', 'dataValue');
    value = getCookie('dataKey');
}
```

### Argon Storage takes an extra step to verify your data and stores it correctly in local storage.

Without Argon Storage
```js
localStorage.setItem('item', { m: 'helloworld', n: 100 });
localStorage.getItem('item'); // --> [object Object] // Local storage stores everything as strings
```

With Argon Storage
```js
...
store.set('item', { m: 'helloworld', n: 100 });
store.get('item'); // --> { m: 'helloworld', n: 100 }
```

Saves an extra step of transforming data before saving it.

### You can also store data in session storage. Data validations and fallback still works.

```js
...
store.set('item', 'value', true); // Third parameter enables session storage mode
```

### Argon Storage respects the "type" of data stored.

Without Argon Storage

```js
localStorage.set('item', true); // Stored value is boolean
localStorage.get('item'); // --> 'true' // Retrieved value is a string
```

With Argon Storage

```js
...
store.set('item', true);
store.get('item'); // --> true // Returns the value as boolean
```

### Argon storage supports data compression

We use Pieroxy's LZW algorithm (custom implementation) to compress input data. Useful to save some bytes when dealing with large dataset.

```js
const store = new ArgonStorage({ compress: true });
...
```


### Argon Storage provide methods to save data directly to cookies

```js
import { setCookie, getCookie } from 'argon-storage';

setCookie('item', 'value');
getCookie('item'); // --> 'value'
```

By default ``setCookie`` creates a session cookie (cookie without an expiry). You can set ``expiryDays`` by passing a third parameter.

```js
setCookie('item', 'value', 3); // Cookie expires after 3 days
```

You can also set cookie ``path`` and ``domain`` by passing fourth and fifth parameters.

```js
setCookie('item', 'value', null /* Setting up a session cookie */ , '/', 'example.com');
```

However, if you don't pass them, the path value defaults to ``/`` and domain value defaults to current site domain. If for any reason you do not want to set domain (which isn't recommended), you can pass an empty string value.

You can also mark cookies as secure by passing a sixth boolean parameter.

```js
setCookie('item', 'value', null /* Setting up a session cookie */ , '/', 'example.com', true); // Creates a secure cookie
```

For secure websites, you don't need to do this step. Argon storage by default creates secure cookies by checking if the site uses an ``https://`` URL.

# About

Argon Storage is a great utility for local storage. It is tested on majority of desktop and mobile browsers which makes it perfect for production use. It's built-in type resolution reduces a ton of code (and pain to write them). You can see it for yourself in one of the examples above.

Argon Storage supports IE9 browser and above.

# Additional functions/methods

## Get All Cookies

```js
import { getAllCookies } from 'argon-storage';
getAllCookies(); // --> Returns all stored cookies as list[]
getAllCookies(/test_cookie/); // --> Returns all stored cookies that matches the regex.
```

## Remove Cookie

```js
import { removeCookie } from 'argon-storage';
removeCookie('test'); // Deletes a cookie
```

## Remove local/session storage data

```js
import ArgonStorage from 'argon-storage';
(new ArgonStorage())
  .remove('item'); // Removes an item from local/session storage.
```

```js
...
(new ArgonStorage())
  .remove('item', true); // Removes item from session storage only.
```