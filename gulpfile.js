// Gulp requires
const { src, dest, watch, series, parallel } = require('gulp');
const zip = require('gulp-zip');
const paths = require('./gulp-tasks/paths.js'); // List of all paths in a config

// ASSETS
const moveAssets = () => {
  return src(paths.assets.src).pipe(dest(paths.assets.output));
};
// move the assets and zip them for production/ready to import into campaign monitor
const moveAndZipAssets = () => {
  return src(paths.assets.src).pipe(zip('assets.zip')).pipe(dest(paths.output));
};

// TEMPLATES
const buildMJMLWithDummyData = require('./gulp-tasks/buildMJMLWithDummyData');
const buildMJMLForLive = require('./gulp-tasks/buildMJMLForLive');

// CLEANER
const cleanBuild = require('./gulp-tasks/clean'); // Clean the current build

// SERVER
const { browserSync, reload } = require('./gulp-tasks/browser-sync'); // BrowserSync server

// WATCHERS
function watchFiles() {
  // Lint, concat, minify JS then reload server
  watch([paths.templates.src, paths.partials.src, "src/**.json"], series(buildMJMLWithDummyData, reload)); // lint and build scripts
}

// EXPORTS
const serve = series(cleanBuild, moveAssets, buildMJMLWithDummyData, parallel(watchFiles, browserSync));

exports.default = serve;
exports.buildLive = series(cleanBuild, moveAndZipAssets, buildMJMLForLive);
exports.clean = cleanBuild;
