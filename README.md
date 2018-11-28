# LZStorage
LZStorage combines different storage types (local, session, and cookie) and provides a cross browser wrapper to store and retrieve data in an optimal manner. LZStorage implements <a href="https://github.com/pieroxy/lz-string">Pieroxy's</a> LZ compression algorithm to compress data while saving it in local storage.

# Installation
```js
npm install --save lzstorage
```

# How does it work?
Common storage can be used in following ways:

1. Using script tag
```js
<script src="lzstorage.js"></script>
<script>
lzstorage.get(...);
</script>
```

2. Using module bundler
```js
import lzstorage from "lzstorage";
lzstorage.get(...);
```
```js
const lzstorage = require("lzstorage");
lzstorage.get(...);
```

# Enable compression
lzstorage does not enable compression by default. To enable compression you need to create a new instance of LZStorage as follows:
```js
const lzswc = new lzstorage.LZStorage({
  compression: true
});
```

# Enable debugging
To enable debug mode you need to pass ``debug: true`` as a parameter to LZStorage constructor.
```js
const lzswc = new lzstorage.LZStorage({
  debug: true
});
```

# Storage methods:
# set
To set data in HTML5 storage. By default the values are stored in ``localStorage``.
```js
lzstorage.set(key, value);
```
To set key in session storage (set ``isSession`` flag to ``true`` by passing it as a third prameter)
```js
lzstorage.set(key, value[, isSession]);
```
If storage is unavailable, the method automatically fallbacks to cookies as alternative storage

# get
To get value from storage
```js
lzstorage.get(key);
```
Get method checks all the available storages to get the data. The data is automatically parsed if it is a valid JSON string.

# getAll
To get data from all stores. The values are returned in a form of array of objects with information such as type of storage used.
```js
lzstorage.getAll(key); // --> Returns [{ value: <data value>, storage: '<type of storage>' }, { ... }, { ... }];
```

# update
To update the value of an existing key. It is similar to ``set`` except that it gives you more control over how you want to update the data. We have following examples that explain how ``update`` is different from ``set``.

```js
lzstorage.update(key[, data or callback]);
```

<b>Example 1: Updating object properties</b><br>
Using ``set``:
```js
lzstorage.set('profile', { name: "Joanne", age: 26 });
// Updating the age to 27
lzstorage.set('profile', { name: "Joanne", age: 27 }); // You have re-write the entire object
```

Using ``update``:
```js
lzstorage.set('profile', { name: "Joanne", age: 26 });
// Updating profile by passing only the age
lzstorage.update('profile', { age: 27 }); // --> Value now becomes { name: "Joanne", age: 27 }
```

You can also use syntax below:
```js
// 1. Arrow function with implicit return
lzstorage.update('profile', () => { age: 27 });
// 2. Arrow function with data passed as value
lzstorage.update('profile', data => {
    data.value.age = 27; // Modify existing object
});
```

<b>Example 2: Updating arrays</b><br>
Using ``set``:
```js
lzstorage.set('arr', [1,2,3,4]);
// Insert a new value to array
lzstorage.set('arr', [1,2,3,4,'Hello']); // <-- Inserts string 'hello'. But you need to pass the entire array in this case
```

Using ``update``:
```js
lzstorage.set('arr', [1,2,3,4]);
// Insert a new value to array
lzstorage.update('arr', data => {
    data.value.push('Hello'); // Just push a new value to existing array
});
```

<b>Example 3: Updating multiple stores at once</b><br>
There are chances that your data exists in multiple stores having the same key. Update allows you to modify them all at once
Using ``set``:
```js
lzstorage.set('profile', { name: 'Joanne' });
lzstorage.setCookie('profile', { name: 'Adam' });
// Add age = 27 to both profiles currently stored in different stores
lzstorage.set('profile', { name: 'Joanne', age: 27 });
lzstorage.setCookie('profile', { name: 'Adam', age: 27 });
```

Using ``update``:
```js
lzstorage.set('profile', { name: 'Joanne' });
lzstorage.setCookie('profile', { name: 'Adam' });
// Add age = 27 to both profiles currently stored in different stores
lzstorage.update('profile', { age: 27 }); // <-- This updates all stores at once
```

More complex example where we want to update different values:

Consider same example as above. This time we are inserting different ages for Joanne and Adam.

Using ``set``:
```js
lzstorage.set('profile', { name: 'Joanne' });
lzstorage.setCookie('profile', { name: 'Adam' });
// Add age = 27 to both profiles currently stored in different stores
lzstorage.set('profile', { name: 'Joanne', age: 27 });
lzstorage.setCookie('profile', { name: 'Adam', age: 30 });
```

Using ``update``:
```js
lzstorage.set('profile', { name: 'Joanne' });
lzstorage.setCookie('profile', { name: 'Adam' });
// Add age = 27 to both profiles currently stored in different stores
lzstorage.update('profile', (...args) => {
    args.find(arg => arg.storage === 'localStorage').value.age = 27;
    args.find(arg => arg.storage === 'cookie').value.age = 30;
});
```

Update is useful when data sets are large and you wisth to update only a small chunk.

# setCookie
To create a cookie
```js
lzstorage.setCookie(key, value[, expiry][, path][, domain]);
```

# getCookie
To get cookie from cookie store
```js
lzstorage.getCookie(key, value);
```

# removeCookie
To delete a cookie from cookie store
```js
lzstorage.removeCookie(key[, path][, domain]);
```

# resetCookie
To reset an existing cookie with new data. It is similar to ``setCookie`` except that it deletes existing cookie first.
```js
lzstorage.resetCookie(key, value[, expiry][, path][, domain]);
```

"Reset" allows you to change expiry ,path and domain of existing cookie.

# Summing up
Common storage provides with a robust and cross browser way to manage HTML5 storage. However, it doesn't not overcome certain limitations like storage size and availability. If HTML5 storage is not available, there is a fallback of cookie storage, but we know that cookie storage is limited in terms of size.

To overcome size limitation we are working on a version 4 which introduces lossless compression. To checkout the progress you can switch to feature/v4 branch.
