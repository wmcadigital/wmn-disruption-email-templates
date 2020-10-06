const del = require('del');
const paths = require('./paths.js');

module.exports = () => {
  return del(paths.output);
};
