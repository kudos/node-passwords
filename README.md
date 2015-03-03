# Passwords

[![Build Status](https://travis-ci.org/kudos/node-passwords.svg?branch=master)](https://travis-ci.org/kudos/node-passwords)

Passwords is compatible with node.js v0.8+ and io.js and transparently supports traditional callbacks, promises and generators (see installation). It uses the Javascript runtime's PBKDF2 implementation and has no external dependencies.

There is a companion library [written in Python](https://github.com/kudos/passwords) which is compatible with the PBKDF2 hashes produced by this library.

## Installation

`npm install passwords`

**Note** If you are running a non-harmony node.js, you'll need to install bluebird if you want `Promise` support, but it's not required and you can still just use callbacks.

## Usage

### Generators
    
    const hash = passwords.crypt('password');
    assert(yield passwords.verify('password', hash));

### Promises

    return passwords.crypt('password').then(function (hash) {
      return passwords.verify('password', hash);
    }).then(function (good) {
      assert(good);
    });

### Callbacks

    passwords.crypt('password', function (err, hash) {
      passwords.verify('password', hash, function (err, good) {
        assert(good);
      });
    });

## API

### passwords.crypt(password [,cost] [,callback])[.then(hash => )]

If callback is omitted, returns a promise instead. Optional cost for increasing the computational difficulty of the hash.

### passwords.verify(password, hash [,callback])[.then(verified => )]

If callback is omitted, returns a promise instead.