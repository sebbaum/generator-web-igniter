'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

const prompts = {
  name: 'webapp',
  environment: 'local',
  gaEnabled: false,
  useImprint: true,
  startCoding: false,
  localGit: true
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
      'src/js/googleAnalytics.js',
      'src/sass/styles.scss',
      'public/imgs/logo_Pttrn_B.svg',
      'public/robots.txt',
      'src/pages/impressum.html',
      'src/js/libs/.gitkeep',
      '.git/config'
    ]);
  });

  it('should contain values in package.json', () => {
    assert.fileContent('package.json', / {2}"name": "webapp",/);
  });

  it('should contain broxy browserSync config with https', () => {
    assert.fileContent(
      'webpack.mix.js',
      'mix.browserSync({\n' +
        '  "serveStatic": [\n' +
        '    "./public"\n' +
        '  ],\n' +
        '  "files": [\n' +
        '    "./public"\n' +
        '  ]\n' +
        '});'
    );
  });
});
