var assert = require('assert');

var passwords = require('..');

var hashPassword = '$pbkdf2-256-1$2$XoeBED7r20l03vQcGl8XiTfl$f944bff1cc8e3666ff673e637dc47a85e0bca99f03b8921f';

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

  it('should match existing hashes', function *() {
    assert(yield passwords.verify('password', hashPassword));
  });
});