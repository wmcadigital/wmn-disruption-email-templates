module.exports = {
  output: 'build/', // Default output location for code build
  server: {
    port: 8080,
    baseDir: './build/',
    root: './build/'
  },
  templates: {
    src: 'src/templates/**/*.mjml',
    output: 'build/'
  },
  assets: {
    src: 'src/assets/**/',
    output: 'build/assets/'
  }
};
