// keys.js - figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}

//https://console.developers.google.com/apis/credentials?project=emaily-dev-185911
// https://mlab.com/databases/ruspow-emaily-dev/collections/users
