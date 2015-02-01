// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path');

var config = {
  production: {
    url: 'http://gesellix.net',
    // Example mail config
    // Visit http://support.ghost.org/mail for instructions
    // ```
    //  mail: {
    //      transport: 'SMTP',
    //      options: {
    //          service: 'Mailgun',
    //          auth: {
    //              user: '', // mailgun username
    //              pass: ''  // mailgun password
    //          }
    //      }
    //  },
    // ```
    mail: {},
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/ghost.db')
      },
      debug: false
    },
    server: {
      // Host to be passed to node's `net.Server#listen()`
      host: '0.0.0.0',
      // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
      port: '2368'
    },
    paths: {
      contentPath: path.join(__dirname, '/content/')
    }
  }
};

console.log("content-path: " + config.production.paths.contentPath);

module.exports = config;
