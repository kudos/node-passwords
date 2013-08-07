var pbkdf2 = require('crypto').pbkdf2
  , randomBytes = require('crypto').randomBytes
  , Q = require('q');

exports.verify = function(password, hash) {
  var deferred = Q.defer();
  hashParts = hash.split('$');
  var iterations = hashParts[2] * 500;
  var salt = hashParts[3];
  var hashed_password = hashParts[4];
  
  pbkdf2(password, salt, iterations, 24, function(error, derivedKey){
    if(error) {
      deferred.reject(new Error(error));
    } else {
      deferred.resolve(derivedKey.toString('hex') == hashed_password);
    }
  });
  return deferred.promise;
}

exports.crypt = function(password, cost) {
  cost = cost || 2;
  iterations = cost * 500;
  var deferred = Q.defer();

  randomBytes(18, function(error, buf) {
    if(error) {
      deferred.reject(new Error(ex));
    } else {
      pbkdf2(password, buf.toString('base64'), iterations, 24, function(error, derivedKey){
        if(error) {
          deferred.reject(new Error(error));
        } else {
          var hash = '$pbkdf2-256-1$' + cost + '$' + buf.toString('base64') + '$' + derivedKey.toString('hex');
          deferred.resolve(hash);
        }
      });
    }
  });
  return deferred.promise;
}