var pbkdf2 = require('crypto').pbkdf2
  , randomBytes = require('crypto').randomBytes;

exports.verify = function(password, hash, callback) {
  hashParts = hash.split('$');
  var iterations = hashParts[2] * 500;
  var salt = hashParts[3];
  var hashed_password = hashParts[4];

  pbkdf2(password, salt, iterations, 24, function(error, derivedKey){
    if(error) {
      callback(new Error(error));
    } else {
      callback(null, derivedKey.toString('hex') == hashed_password);
    }
  });
}

exports.crypt = function(password, cost, callback) {
  if (typeof(callback) !== 'function') {
    callback = cost;
    cost = 2;
  }

  iterations = cost * 500;

  randomBytes(18, function(error, buf) {
    if(error) {
      callback(new Error(error));
    } else {
      try {
        pbkdf2(password, buf.toString('base64'), iterations, 24, function(error, derivedKey){
          if(error) {
            callback(new Error(error));
          } else {
            var hash = '$pbkdf2-256-1$' + cost + '$' + buf.toString('base64') + '$' + derivedKey.toString('hex');
            callback(null, hash);
          }
        });
      } catch(e) {
        callback(new Error(error));
      }
    }
  });
}
