# Passwords.js

Passwords.js is a standard and simple interface to cryptographic hashing for for secure password storage. It has no external dependencies.

There is a companion library [written in Python](/kudos/passwords) which is compatible with the PBKDF2 hashes produced by this library.

## Why?

This is an attempt to make it easier for developers to find and use a cryptographic library suitable for password storage.

## Usage

    var passwords = require('passwords');

    var password = "god";

    passwords.crypt(password, function(err, hash) {
      passwords.verify(password, hash, function(err, result) {
        if (result) {
          console.log("password matches hash");
        }
      });
    });
    
    