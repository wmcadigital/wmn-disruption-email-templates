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
  return (
    src(paths.templates.src)
      // Inject dummy data
      .pipe(
        plugins.data(file => {
          let dummyData;
          try {
            // If there is a file named the same as the template with x.dummyData.json, then we will use that as the reference for our dummy data
            dummyData = JSON.parse(
              fs.readFileSync(path.dirname(file.path) + '/' + path.parse(file.path).name + '.dummyData.json')
            );
          } catch (error) {
            // If no dummyData.json file then just set to null and don't use anything to inject data
            dummyData = null;
          }
          return dummyData;
        })
      )
      // Render the variables/logic in the templates
      .pipe(
        liquid({
          ext: '.mjml'
        })
      )
      // Render MJML templates
      .pipe(plugins.mjml(mjmlEngine, { beautify: true, validation: 'strict' }))
      .on('error', handleMJMLErrors)
      // Render the variables/logic from partials pulled in from mjml include
      .pipe(
        liquid({
          ext: '.html'
        })
      )
      .pipe(dest(paths.templates.output))
      // After html templates are created, generate some txt ones...
      .pipe(plugins.html2txt({ ignoreImage: true }))
      .pipe(dest(paths.textTemplates.output))
  );
};

module.exports = buildMJMLWithDummyData;
