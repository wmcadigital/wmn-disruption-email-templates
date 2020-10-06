// Gulp requires
const { src, dest } = require('gulp');
const plugins = require('gulp-load-plugins')();
const liquid = require('@tuanpham-dev/gulp-liquidjs');
const mjmlEngine = require('mjml');
// Other requires
const fs = require('fs');
const path = require('path');
const paths = require('./paths.js'); // List of all paths in a config

// Handle errors for MJML issues
function handleMJMLErrors(err) {
  console.log(err.toString());
  this.emit('end');
}

const buildMJMLWithDummyData = () => {
  return src(paths.templates.src)
    .pipe(
      plugins.data(file => {
        let dummyData;
        try {
          dummyData = JSON.parse(
            fs.readFileSync(path.dirname(file.path) + '/' + path.parse(file.path).name + '.dummyData.json')
          );
        } catch (error) {
          dummyData = null;
        }
        return dummyData;
      })
    )
    .pipe(
      liquid({
        ext: '.mjml'
      })
    )
    .pipe(plugins.mjml(mjmlEngine, { beautify: true, validation: 'strict' }))
    .on('error', handleMJMLErrors)
    .pipe(dest(paths.templates.output))
    .pipe(plugins.html2txt({ ignoreImage: true }))
    .pipe(dest(paths.textTemplates.output));
};

module.exports = buildMJMLWithDummyData;
