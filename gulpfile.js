// Gulp requires
const { src, dest, watch, series, parallel } = require('gulp');
const plugins = require('gulp-load-plugins')();
const mjml = require('gulp-mjml');
const liquid = require('@tuanpham-dev/gulp-liquidjs');
const mjmlEngine = require('mjml');
// Other requires
const fs = require('fs');
const path = require('path');

// Handle errors for MJML issues
function handleMJMLErrors(err) {
  console.log(err.toString());
  this.emit('end');
}

const buildEmails = () => {
  return src('src/templates/**/*.mjml')
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
    .pipe(mjml(mjmlEngine, { beautify: true, validation: 'strict' }))
    .on('error', handleMJMLErrors)
    .pipe(dest('builded/'));
};

// exports.default = serve;
exports.buildEmails = buildEmails;
