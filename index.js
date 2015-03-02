"use strict";

var pbkdf2 = require('crypto').pbkdf2,
  randomBytes = require('crypto').randomBytes;

try {
  if (!global.Promise) {
    global.Promise = require('bluebird');
  }
  var Deferred = function() {
    var deferred = {};
    deferred.promise = new Promise(function(resolve, reject) {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });
    return deferred;
  };
} catch(_) {
  // ignore missing bluebird module, but try to catch people using Promises anyway.
  var Deferred = function() {
    var deferred = {};
    deferred.promise = {then: function() {
      throw new Error('Use callbacks, install bluebird or use a newer javascript runtime (io.js, node.js harmony) for promise support.');
    }}
    return deferred;
  };
}


exports.verify = function(password, hash, callback) {
  var hashParts = hash.split('$');
  var iterations = hashParts[2] * 500;
  var salt = hashParts[3];
  var hashed_password = hashParts[4];
  var defer = new Deferred();
  pbkdf2(password, salt, iterations, 24, function(err, derivedKey){
    if(err) {
      if (callback) {
        return callback(new Error(err));
      }
      
      defer.reject(err);
    } else {
      var match = new Buffer(derivedKey, 'binary').toString('hex') == hashed_password;
      if (callback) {
        return callback(null, match);
      }

      defer.resolve(match);
    }
  });
  return !!callback || defer.promise;
};


exports.crypt = function(password, cost, callback) {
  if (typeof(cost) === 'function') {
    callback = cost;
    cost = 2;
  }

  var iterations = cost * 500;

  var defer = new Deferred();
  randomBytes(18, function(err, buf) {
    if(err) {
      if (callback) {
        return callback(new Error(err));
      }

      defer.reject(new Error(err));
    } else {
      try {
        pbkdf2(password, buf.toString('base64'), iterations, 24, function(err, derivedKey){
          if(err) {
            if (callback) {
              return callback(new Error(err));
            }

            defer.reject(new Error(err));
          } else {
            var hash = '$pbkdf2-256-1$' + cost + '$' + 
              buf.toString('base64') + '$' + new Buffer(derivedKey, 'binary').toString('hex');
            if (callback) {
              return callback(null, hash);
            }
            
            defer.resolve(hash);
          }
        });
      } catch(err) {
        if (callback) {
          return callback(new Error(err));
        }

        defer.reject(new Error(err));
      }
    }
  });
  return !!callback || defer.promise;
};
