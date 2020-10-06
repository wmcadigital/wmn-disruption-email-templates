// Local requires
const browserSync = require('browser-sync').create();
const paths = require('./paths.js'); // List of all paths in a config

module.exports.browserSync = () => {
  return browserSync.init({
    server: {
      baseDir: paths.server.baseDir
    },
    port: paths.server.port,
    directory: true
  });
};

module.exports.reload = done => {
  browserSync.reload();
  done();
};
