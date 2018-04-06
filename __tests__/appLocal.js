'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

const prompts = {
  name: 'webapp',
  environment: 'local',
  gaEnabled: false,
  startCoding: false
};

describe('generator-web-igniter:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(prompts);
  });

  it('creates files', () => {
    assert.file([
      'package.json',
      'src/index.html',
      '.gitignore',
      'webpack.mix.js',
      'src/js/main.js',
      'src/sass/styles.scss',
      'public/imgs/logo_Pttrn_B.svg',
      'public/robots.txt'
    ]);
  });

  it('should contain broxy browserSync config with https', () => {
    assert.fileContent(
      'webpack.mix.js',
      'mix.browserSync({"serveStatic":["./public"],"files":["./public"]});'
    );
  });
});
