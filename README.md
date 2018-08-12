# jQueryStorage
JQuery storage plugin extends the default HTML5 storage API to resolve cross-browser compatibility issues

# Installation
```
npm install jquerystorage
```

# How does it work?
JQuery storage works as a jQuery plugin as well as a standalone library. There are few syntactical differences however. But fret not! You can use any syntax of your choice. The plugin automatically add missing dependencies (e.g. ``$``) so that your code works at all times (<i>Update: This has been removed in version 2</i>). Syntaxwise it's all very simple!

# set
To set data in local or session storage
```js
$.storage.set(key, value); // With or without jQuery
common.storage.set(key, value); // Alternative syntax
```
To set key in session storage (pass ``true`` flag as third parameter)
```js
$.storage.set(key, value, true); // Stores in session
common.storage.set(key, value, true);
```
If storage is unavailable, the method automatically fallbacks to cookie storage as an alternative


# get
To get from local or session storage
```js
$.storage.get(key);
common.storage.get(key); // Alternative syntax
```
Get method checks all the available storages to get the value of key. It also parses the data if stored in JSON format.

# getCookie and getFromCookies
To get data from cookie
```js
var data = $.storage.getCookie(key); // <-- JSON data not parsed
var data = $.storage.getFromCookies(key); // <-- JSON data parsed
```
The difference between ``getCookie`` and ``getFromCookies`` is that the latter parses JSON data.

# setCookie
To set a cookie (works in ``localhost`` environment ``(IE 9-11)``)
```js
$.storage.setCookie(key, value[, expiry][, path][, domain]);
```

# removeCookie
To delete an existing cookie
```js
$.storage.removeCookie(key);
```

# resetCookie
To reset an existing cookie. This method is useful to change expiry, path and domain of any existing cookie.
```js
$.storage.reset(key, value[, expiry][, path][, domain]);
```

# getAll
To get data from all stores
```js
$.storage.getAll(key); // <-- Returns data from local storage, session storage, and cookies (if available) in the form of an array
```
# getFromLocalStorage
To get data from local storage (returns ``undefined`` if value is not available in local storage)
```js
$.storage.getFromLocalStorage(key);
```

# getFromSessionStorage
To get data from session storage (returns ``undefined`` if value is not available in session storage)
```js
$.storage.getFromSessionStorage(key);
```

JQuery storage works on all major desktop and mobile browsers including IE.
