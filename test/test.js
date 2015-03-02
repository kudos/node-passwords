var assert = require('assert');

var passwords = require('..');

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
  });

  try {
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
  } catch(err) {
    console.log("skipping generators");
  }

});
