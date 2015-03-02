var assert = require('assert');

var passwords = require('..');

var hashPassword = '$pbkdf2-256-1$2$XoeBED7r20l03vQcGl8XiTfl$f944bff1cc8e3666ff673e637dc47a85e0bca99f03b8921f';

describe('passwords', function () {
  describe('using callbacks', function () {
    it('should hash a password', function () {
      passwords.crypt('password', function (err, hash) {
        assert.equal(5, hash.split('$').length);
      });
    });

    it('should verify a password', function () {
      passwords.crypt('password', function (err, hash) {
        passwords.verify('password', hash, function (err, good) {
          assert(good);
        });
      });
    });

    it('should reject a password', function () {
      passwords.crypt('password', function (err, hash) {
        passwords.verify('drowssap', hash, function(err, good) {
          assert(!good);
        });
      });
    });

    it('should increase cost', function () {
      passwords.crypt('password', 10, function (err, hash) {
        passwords.verify('password', hash, function (err, good) {
          assert(good);
        });
      });
    });

    it('should match existing hashes', function () {
      passwords.verify('password', hashPassword, function (err, good) {
        assert(good);
      });
    });
  });
  
  describe('using promises', function () {
    it('should hash a password', function () {
      return passwords.crypt('password').then(function (hash) {
        assert.equal(5, hash.split('$').length);
      });
    });

    it('should verify a password', function () {
      return passwords.crypt('password').then(function (hash) {
        return passwords.verify('password', hash);
      }).then(function (good) {
        assert(good);
      });
    });

    it('should reject a password', function () {
      return passwords.crypt('password').then(function (hash) {
        return passwords.verify('drowssap', hash);
      }).then(function (good) {
        assert(!good);
      });
    });

    it('should increase cost', function () {
      return passwords.crypt('password', 10).then(function (hash) {
        return passwords.verify('password', hash);
      }).then(function (good) {
        assert(good);
      });
    });

    it('should match existing hashes', function () {
      passwords.verify('password', hashPassword).then(function (good) {
        assert(good);
      });
    });
  });

  try {
    eval("(function *(){})");
    require('./generators.js');
  } catch(err) {
    console.log("no generator support, skipping");
  }

});
