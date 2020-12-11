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

// Build the MJML templates for the live system(so don't inject dummy data)
const buildMJMLWithDummyData = () => {
  return (
    src(paths.templates.src)
      .pipe(plugins.mjml(mjmlEngine, { minify: false, validation: 'strict' }))
      .on('error', handleMJMLErrors)
      .pipe(plugins.htmlBeautify())
      .pipe(dest(paths.templates.output))
      // After html templates are created, generate some txt ones...
      .pipe(plugins.html2txt({ ignoreImage: true, wordwrap: false }))
      .pipe(dest(paths.textTemplates.output))
  );
};

module.exports = buildMJMLWithDummyData;
