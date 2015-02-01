(function () {
  "use strict";

  var path = require('path');
  var parentApp = require('express')();
  var ghost = require('ghost');
  var ghostOptions = {
    config: path.join(__dirname, 'config.js')
  };

  ghost(ghostOptions).then(function (ghostServer) {
    parentApp.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(parentApp);
  }).catch(function (err) {
    console.error(err, err.context, err.help);
    process.exit(1);
  });
})();