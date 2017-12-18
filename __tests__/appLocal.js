'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

const prompts = { name: 'webapp', useProxy: false, gaEnabled: false };

describe('generator-web-igniter:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(prompts);
  });

  it('should contain broxy browserSync config with https', () => {
    assert.fileContent(
      'webpack.mix.js',
      'mix.browserSync({"serveStatic":["./public"],"files":["./public"]});'
    );
  });
});
