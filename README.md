# LZStorage
LZStorage is a cross-browser ``Storage`` wrapper with ability to compress data. It uses  <a href="https://github.com/pieroxy/lz-string">Pieroxy's</a> LZW compression library for compression.

# Installation

```sh
npm i lzstorage;
```

# How to use?

```js
import { LZStorage } from 'lzstorage';
const lzStorage = new LZStorage({
  compress: true
});
lzStorage.set('key', 'value');
lzStorage.get('key'); // 'value';

lzStorage.set('key', { k: 'Hello World' });
lzStorage.get('key'); // { k: 'Hello World' }
```

# API

