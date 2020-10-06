// Gulp requires
const { src, dest, watch, series, parallel } = require('gulp');
const paths = require('./gulp-tasks/paths.js'); // List of all paths in a config

const moveAssets = () => {
  return src(paths.assets.src).pipe(dest(paths.assets.output));
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
  watch(paths.templates.src, series(buildMJMLWithDummyData, reload)); // lint and build scripts
}

const serve = series(cleanBuild, moveAssets, buildMJMLWithDummyData, parallel(watchFiles, browserSync));

exports.default = serve;
exports.buildLive = series(cleanBuild, moveAssets, buildMJMLForLive);
