# Common storage
Common storage unifies different storage types (local, session, and cookie) and provides a cross browser wrapper to access each one of them with ease

# Installation
```js
npm install --save commonstorage
```

# How does it work?
Common storage can be used in following ways:

1. Using script tag
```
<script src="commonstorage.js"></script>
<script>
commonstorage.get(...);
</script>
```

2. Using module bundler
```js
import { commonstorage } from "commonstorage";
commonstorage.get(...);
```
```js
const commonstorage = require("commonstorage");
commonstorage.get(...);
```

# Storage methods:
# set
To set data in HTML5 storage. By default the values are stored in ``localStorage``.
```js
commonstorage.set(key, value);
```
To set key in session storage (set ``isSession`` flag to ``true`` by passing it as a third prameter)
```js
commonstorage.set(key, value[, isSession]);
```
If storage is unavailable, the method automatically fallbacks to cookies as alternative storage

# get
To get value from storage
```js
commonstorage.get(key);
```
Get method checks all the available storages to get the data. The data is automatically parsed if it is a valid JSON string.

# getAll
To get data from all stores. The values are returned in a form of array of objects with information such as type of storage used.
```js
commonstorage.getAll(key); // --> Returns [{ value: <data value>, storage: '<type of storage>' }, { ... }, { ... }];
```

# update
To update the value of an existing key. It is similar to ``set`` except that it gives you more control over how you want to update the data. We have following examples that explain how ``update`` is different from ``set``.

```js
commonstorage.update(key[, data or callback]);
```

<b>Example 1: Updating object properties</b><br>
Using ``set``:
```js
commonstorage.set('profile', { name: "Joanne", age: 26 });
// Updating the age to 27
commonstorage.set('profile', { name: "Joanne", age: 27 }); // You have re-write the entire object
```

Using ``update``:
```js
commonstorage.set('profile', { name: "Joanne", age: 26 });
// Updating profile by passing only the age
commonstorage.update('profile', { age: 27 }); // --> Value now becomes { name: "Joanne", age: 27 }
```

You can also use syntax below:
```js
// 1. Arrow function with implicit return
commonstorage.update('profile', () => { age: 27 });
// 2. Arrow function with data passed as value
commonstorage.update('profile', data => {
    data.value.age = 27; // Modify existing object
});
```

<b>Example 2: Updating arrays</b><br>
Using ``set``:
```js
commonstorage.set('arr', [1,2,3,4]);
// Insert a new value to array
commonstorage.set('arr', [1,2,3,4,'Hello']); // <-- Inserts string 'hello'. But you need to pass the entire array in this case
```

Using ``update``:
```js
commonstorage.set('arr', [1,2,3,4]);
// Insert a new value to array
commonstorage.update('arr', data => {
    data.value.push('Hello'); // Just push a new value to existing array
});
```

<b>Example 3: Updating multiple stores at once</b><br>
There are chances that your data exists in multiple stores having the same key. Update allows you to modify them all at once
Using ``set``:
```js
commonstorage.set('profile', { name: 'Joanne' });
commonstorage.setCookie('profile', { name: 'Adam' });
// Add age = 27 to both profiles currently stored in different stores
commonstorage.set('profile', { name: 'Joanne', age: 27 });
commonstorage.setCookie('profile', { name: 'Adam', age: 27 });
```

Using ``update``:
```js
commonstorage.set('profile', { name: 'Joanne' });
commonstorage.setCookie('profile', { name: 'Adam' });
// Add age = 27 to both profiles currently stored in different stores
commonstorage.update('profile', { age: 27 }); // <-- This updates all stores at once
```

More complex example where we want to update different values:

Consider same example as above. This time we are inserting different ages for Joanne and Adam.

Using ``set``:
```js
commonstorage.set('profile', { name: 'Joanne' });
commonstorage.setCookie('profile', { name: 'Adam' });
// Add age = 27 to both profiles currently stored in different stores
commonstorage.set('profile', { name: 'Joanne', age: 27 });
commonstorage.setCookie('profile', { name: 'Adam', age: 30 });
```

Using ``update``:
```js
commonstorage.set('profile', { name: 'Joanne' });
commonstorage.setCookie('profile', { name: 'Adam' });
// Add age = 27 to both profiles currently stored in different stores
commonstorage.update('profile', (...args) => {
    args.find(arg => arg.storage === 'localStorage').value.age = 27;
    args.find(arg => arg.storage === 'cookie').value.age = 30;
});
```

Update is useful when data sets are large and you wisth to update only a small chunk.

# setCookie
To create a cookie
```js
commonstorage.setCookie(key, value[, expiry][, path][, domain]);
```

# getCookie
To get cookie from cookie store
```js
commonstorage.getCookie(key, value);
```

# removeCookie
To delete a cookie from cookie store
```js
commonstorage.removeCookie(key[, path][, domain]);
```

# resetCookie
To reset an existing cookie with new data. It is similar to ``setCookie`` except that it deletes existing cookie first.
```js
commonstorage.resetCookie(key, value[, expiry][, path][, domain]);
```

"Reset" allows you to change expiry ,path and domain of existing cookie.

# Summing up
Common storage provides with a robust and cross browser way to manage HTML5 storage. However, it doese not overcome certain limitations like storage size and availability (yet). If HTML5 storage is unavailable, there is a fallback of cookie storage, but we all know that cookie storage is limited in terms of size.

To overcome size limitation we are working on a version 4 which introduces lossless data compression. To checkout the progress you can switch to feature/v4 branch.
