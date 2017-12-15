'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('generator-web-igniter:app-proxy', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: 'webapp', useProxy: true, schema: 'http' });
  });

  it('creates files', () => {
    assert.file([
      'package.json',
      'index.html',
      '.gitignore',
      'webpack.mix.js',
      'js/main.js',
      'sass/styles.scss',
      'public/imgs/logo_Pttrn_B.svg'
    ]);
  });

  it('should contain values in package.json', () => {
    assert.fileContent('package.json', /"name":"webapp"/);
  });

  it('should contain broxy browserSync config with https', () => {
    assert.fileContent(
      'webpack.mix.js',
      '{"proxy":"http://localhost","host":"dev.host","files":["public/js/**/*.js","public/css/**/*.css","public/*.html"],"open":false,"watchOptions":{"usePolling":true}}'
    );
  });
});

describe('generator-web-igniter:app-local', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: 'webapp', useProxy: false });
  });

  it('should contain broxy browserSync config with https', () => {
    assert.fileContent(
      'webpack.mix.js',
      'mix.browserSync({"serveStatic":["./public"],"files":["./public"]});'
    );
  });
});
