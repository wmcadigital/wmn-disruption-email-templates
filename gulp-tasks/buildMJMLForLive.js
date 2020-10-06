// Gulp requires
const { src, dest } = require('gulp');
const plugins = require('gulp-load-plugins')();
const mjmlEngine = require('mjml');
// Other requires
const paths = require('./paths.js'); // List of all paths in a config

// Handle errors for MJML issues
function handleMJMLErrors(err) {
  console.log(err.toString());
  this.emit('end');
}

const buildMJMLWithDummyData = () => {
  return src(paths.templates.src)
    .pipe(plugins.mjml(mjmlEngine, { minify: true, validation: 'strict' }))
    .on('error', handleMJMLErrors)
    .pipe(dest(paths.templates.output));
};

module.exports = buildMJMLWithDummyData;
