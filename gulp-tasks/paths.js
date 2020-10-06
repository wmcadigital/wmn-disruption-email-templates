module.exports = {
  output: 'build/', // Default output location for code build
  server: {
    port: 8080,
    baseDir: './build/',
    root: './build/'
  },
  templates: {
    src: 'src/templates/**/*.mjml',
    output: 'build/htmlTemplates/'
  },
  textTemplates: {
    output: 'build/txtTemplates/'
  },
  partials: {
    src: 'src/partials/**/*.mjml'
  },
  assets: {
    src: 'src/assets/**/*',
    output: 'build/assets/'
  }
};
