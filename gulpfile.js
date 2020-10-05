const {src, dest, watch, series, parallel} = require('gulp');
// const fs = require('fs');
// const gulp = require('gulp');
// const posthtml = require('gulp-posthtml');
const mjml = require('gulp-mjml');



// Gulp requires
const plugins = require('gulp-load-plugins')();
const liquid = require('@tuanpham-dev/gulp-liquidjs')

// Local requires
const emailDummyData = require('./src/templates/welcome.json');
console.log(emailDummyData);

const buildEmails = () => {
  return src('src/templates/**/*.mjml')
    .pipe(plugins.data((file) => emailDummyData))
    .pipe(liquid({
      ext: '.mjml'
    }))
    .pipe(mjml())

    // .pipe(plugins.formatHtml())
    // .pipe(plugins.htmlmin({ removeComments: true, collapseWhitespace: true }))
    .pipe(dest('builded/'));
};


// gulp.task('html', function () {
//   var plugins = [
//     require('posthtml-lorem')(),
//   ];

//   fs.readdir('./languages/', function (err, files) {
//     if (err) throw err;
//     files.forEach(function (file) {
//       var language = file.split('.')[0];
//       // Gets .html and .nunjucks files in pages
//       return gulp.src('./pages/**/*.+(html|nunjucks)')
//         // Adding data to Nunjucks
//         .pipe(data(function () {
//           return require('./languages/' + language + '.json')
//         }))
//         // Renders template with nunjucks
//         .pipe(nunjucksRender({
//           path: ['./helpers/']
//         }))
//         .pipe(posthtml(plugins))
//         .pipe(mjml())
//         // output files in app folder
//         .pipe(gulp.dest('./dest/' + language));
//     });
//   });
// });

// exports.default = serve;
exports.buildEmails = buildEmails;