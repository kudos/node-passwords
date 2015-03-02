# Passwords.js [![Circle CI](https://circleci.com/gh/kudos/passwords.js.svg?style=svg) ](https://circleci.com/gh/kudos/passwords.js)

Passwords.js is a standard and simple interface to cryptographic hashing for for secure password storage.

It is transparently compatible with traditional callbacks, promises and generators.

There is a companion library [written in Python](/kudos/passwords) which is compatible with the PBKDF2 hashes produced by this library.

## Why?

This is an attempt to make it easier for developers to find and use a cryptographic library suitable for password storage.

## Installation

Just `npm install passwords`.

If you want to run the tests, use `npm install passwords --dev` and then run `npm test`.

## Usage

    passwords.crypt('password', function (err, hash) {
      passwords.verify('password', hash, function (err, good) {
        assert(good);
      });
    });
    
    return passwords.crypt('password').then(function (hash) {
      return passwords.verify('password', hash);
    }).then(function (good) {
      assert(good);
    });
    
    const hash = passwords.crypt('password');
    assert(yield passwords.verify('password', hash));
