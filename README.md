# Passwords

[![Build Status](https://travis-ci.org/kudos/node-passwords.svg?branch=master)](https://travis-ci.org/kudos/node-passwords)

Node.js has built in support for PBKDF2, a tried and tested cryptographic library. Passwords is a light wrapper around this native library that improves and simplifies the API. It's compatible with Node.js v0.8+ and io.js, without needing to compile native extensions.

Passwords provides an API for callbacks and promises through the same functions. Through its promise support it is also compatible with ES6 generators without using any wrappers.

There is a companion library [written in Python](https://github.com/kudos/passwords) which is compatible with the PBKDF2 hashes produced by this library.

## Installation

`npm install passwords`

**Note** If you are running a non-harmony node.js, you'll need to install bluebird if you want `Promise` support, but it's not required and you can still just use callbacks.

## Usage

### Generators

```js
const hash = yield passwords.hash('password');
assert(yield passwords.match('password', hash));
```

### Promises

```js
return passwords.hash('password').then(function (hash) {
  return passwords.match('password', hash);
}).then(function (matched) {
  assert(matched);
});
```

### Callbacks

```js
passwords.hash('password', function (err, hash) {
passwords.match('password', hash, function (err, matched) {
    assert(matched);
  });
});
```

## API

### passwords.hash(password [,cost] [,callback])[.then(hash => )]

If callback is omitted, returns a promise instead. Optional cost for increasing the computational difficulty of the hash.

### passwords.match(password, hash [,callback])[.then(matched => )]

If callback is omitted, returns a promise instead.

## Changes

#### 1.2.0
- Rename `crypt` to `hash` and `verify` to `match` to better reflect the library's purpose. The old function names are still available, but will be removed in the future.

#### 1.1.1
- Updated Readme...

#### 1.1.0
- Remove fixed dependency on [bluebird](https://github.com/petkaantonov/bluebird)
- Remove dependency on assert
- Only test generators on compatible runtimes

#### 1.0.0
- Refactor into supporting callbacks, promises and ES6 generators.
