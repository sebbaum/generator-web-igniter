'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    this.log(
      "Let's ignite another great static website with " + chalk.blue('Web Igniter')
    );

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: "What's the name of your website?",
        validate: function(answer) {
          let pass = !_.isEmpty(answer);
          return pass ? true : 'Product/project name is required!';
        }
      }
    ];

    return this.prompt(questions).then(answers => {
      this.answers = answers;
    });
  }

  default() {
    mkdirp(this.answers.name);
    this.destinationRoot(this.destinationPath(this.answers.name));
  }

  writing() {
    const packageJson = {
      name: this.answers.name,
      version: '0.0.0',
      description: '',
      main: '',
      scripts: {
        build: 'webpack',
        dev:
          'NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js',
        watch:
          'NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js',
        hot:
          'NODE_ENV=development webpack-dev-server --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js',
        production:
          'NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js'
      },
      license: 'ISC'
    };

    this.fs.write('package.json', JSON.stringify(packageJson));
    this.fs.copy(this.templatePath('index.html'), this.destinationPath('index.html'));
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(
      this.templatePath('webpack.mix.js'),
      this.destinationPath('webpack.mix.js')
    );
    this.fs.copy(
      this.templatePath('main.js'),
      this.destinationPath(path.join('js', 'main.js'))
    );
    this.fs.copy(
      this.templatePath('styles.scss'),
      this.destinationPath(path.join('sass', 'styles.scss'))
    );
    this.fs.copy(
      this.templatePath('logo_Pttrn_B.svg'),
      this.destinationPath(path.join('public', 'imgs', 'logo_Pttrn_B.svg'))
    );
  }

  install() {
    this.npmInstall([
      'webpack',
      'laravel-mix',
      'style-loader',
      'browser-sync',
      'browser-sync-webpack-plugin'
    ]);
    this.installDependencies({ bower: false });
  }

  end() {
    this.spawnCommandSync('npm', ['run', 'watch']);
  }
};
