# jQueryStorage
JQuery storage plugin extends the default storage API to resolve cross-browser compatibility issues

# Installation
```
npm install jquerystorage
```

# How does it work?
jQueryStorage works as a standalone library as well as a jQuery plugin. There are few syntactical differences however. But fret not! You can use any syntax of your choice. The plugin automatically add missing dependencies (e.g. ``$``) so that your code works at all times. Syntaxwise it's all so simple!

# Set
To set key in local storage use
```js
$.storage.set(key, value); // With or without jQuery
common.storage.set(key, value); // Alternative syntax
```
To set key in session storage (pass ``true`` flag as third parameter)
```js
$.storage.set(key, value, true); // Stores in session
common.storage.set(key, value, true);
```
If storage is unavailable, the method automatically fallbacks to cookies as alternative storage


# Get
To get any key value use
```js
$.storage.get(key);
common.storage.get(key); // Alternative syntax
```
Get method checks all the available storages to get the value of key. It also parses the data if stored in JSON format.

jQueryStorage works on all major desktop and mobile browsers including IE.
