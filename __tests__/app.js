'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-web-igniter:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: 'webapp' });
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
});
