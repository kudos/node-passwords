# Passwords

Passwords is a standard and simple interface to cryptographic hashing for secure password storage.

It's compatible with node.js v0.8+ and io.js and transparently supports traditional callbacks, promises and generators (see installation). It uses the Javascript runtime's PBKDF2 implementation and has no external dependencies.

There is a companion library [written in Python](/kudos/passwords) which is compatible with the PBKDF2 hashes produced by this library.

## Why?

This is an attempt to make it easier for developers to find and use a cryptographic library suitable for password storage.

## Installation

`npm install passwords`

If you are running a non-harmony node.js, you'll need to install bluebird if you want `Promise`support, but it's not required and you can still just use callbacks.

## Usage

### Callbacks

    passwords.crypt('password', function (err, hash) {
      passwords.verify('password', hash, function (err, good) {
        assert(good);
      });
    });
    
### Promises

    return passwords.crypt('password').then(function (hash) {
      return passwords.verify('password', hash);
    }).then(function (good) {
      assert(good);
    });

### Generators
    
    const hash = passwords.crypt('password');
    assert(yield passwords.verify('password', hash));
