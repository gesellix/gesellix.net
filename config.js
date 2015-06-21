// Documentation can be found at http://support.ghost.org/config/

var path = require('path');

var config = {production: {}};
config.production.url = 'http://gesellix.net';

config.production.server = {
    // Host to be passed to node's `net.Server#listen()`
    host: '0.0.0.0',
    // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
    port: '2368'
};

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
config.production.mail = {};

config.production.paths = {
    contentPath: path.join(__dirname, '/content/')
};

config.production.database = {
    client: 'sqlite3',
    connection: {
        filename: path.join(config.production.paths.contentPath, '/data/ghost.db')
    },
    debug: false
};

console.log("content-path: " + config.production.paths.contentPath);

module.exports = config;
