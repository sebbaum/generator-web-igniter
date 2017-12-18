'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

const prompts = {
  name: 'webapp',
  useProxy: false,
  gaEnabled: true,
  gaTrackingID: 'UA-fake-1234'
};

describe('generator-web-igniter:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(prompts);
  });

  it('should contain google analytics', () => {
    assert.fileContent(
      'index.html',
      "gtag('config', 'UA-fake-1234', { 'anonymize_ip': true });"
    );
  });
});
