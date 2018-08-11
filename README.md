# jQueryStorage
JQuery storage plugin extends default storage API to resolve cross-browser compatibility issues

# Installation
```
npm install jquerystorage
```

# How does it work?
JQuery storage is a primarily a jQuery plugin. However it can be used as a standalone library. It also supports Webpack ES6 modular syntax. Different ways to use JQuery storage are shown below:

<b>JQuery</b>
```js
$.store.<method>(...);
```

<b>Standalone</b>
```js
commonStore.<method>(...);
```

<b>Webpack</b>
```js
import store, {getCookie, setCookie} from 'jquerystorage';
store.<method>(...);
```

# JQuery storage methods:
# set
To set data in HTML5 storage. By default the values are stored in ``localStorage``.
```js
$.store.set(key, value); // jQuery
commonStore.set(key, value); // Without jQuery
```
To set key in session storage (set ``isSession`` flag to ``true`` by passing it as a third prameter)
```js
$.store.set(key, value, true); // Stores in session
commonStore.set(key, value, true);
```
If storage is unavailable, the method automatically fallbacks to cookies as alternative storage

# get
To get value from storage
```js
$.store.get(key);
commonStore.get(key); // Alternative syntax
```
Get method checks all the available storages to get the data. The data is automatically parsed if it is a valid JSON string.

# getAll
Gets data from all available stores. The values are returned as an array of objects with information like type of storage used.
```js
$.store.getAll(key); // --> Returns [{ value: <data value>, storage: '<type of storage>' }, { ... }, { ... }];
```