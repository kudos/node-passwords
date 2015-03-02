var assert = require('assert');

var passwords = require('..');

describe('using generators', function () {
  it('should hash a password', function *() {
    const hash = yield passwords.crypt('password');
    assert.equal(5, hash.split('$').length);
  });

  it('should verify a password', function *() {
    const hash = passwords.crypt('password');
    assert(yield passwords.verify('password', hash));
  });

  it('should reject a password', function *() {
    const hash = yield passwords.crypt('password');
    assert(yield !passwords.verify('drowssap', hash));
  });

  it('should increase cost', function *() {
    const hash = yield passwords.crypt('password', 10);
    assert(passwords.verify('password', hash));
  });
});