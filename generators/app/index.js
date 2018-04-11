'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const path = require('path');

const npmDevDependencies = [
  'cross-env',
  'laravel-mix',
  'browser-sync',
  'browser-sync-webpack-plugin',
  'laravel-mix-purgecss'
];

const npmDependencies = [];

module.exports = class extends Generator {
  prompting() {
    this.log(
      "Let's ignite another great static project with " + chalk.blue('Web Igniter')
    );

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: "What's the name of your project?",
        validate: answer => {
          let pass = !_.isEmpty(answer);
          return pass ? true : 'Product/project name is required!';
        }
      },
      {
        type: 'list',
        name: 'environment',
        message: 'Where do you develop your website?',
        choices: ['local', 'proxy'],
        default: 'local'
      },
      {
        when: answers => {
          return answers.environment === 'proxy';
        },
        type: 'list',
        name: 'schema',
        message: 'Which schema do you want to use?',
        choices: ['http', 'https'],
        default: 'http'
      },
      {
        type: 'confirm',
        name: 'installJquery',
        message: 'Do you want to use jquery?',
        default: false
      },
      {
        type: 'confirm',
        name: 'gaEnabled',
        message: 'Do you want to use Google Anaytics for tracking?',
        default: false
      },
      {
        when: answers => {
          return answers.gaEnabled;
        },
        type: 'input',
        name: 'gaTrackingID',
        message: 'What is your Google Analytics Tracking ID?',
        validate: answer => {
          let pass = !_.isEmpty(answer);
          return pass ? true : 'Google Analytics Tracking ID is required!';
        }
      },
      {
        type: 'confirm',
        name: 'useImprint',
        message: 'Do you want to generate a basic imprint (Impressum)?',
        default: false
      },
      {
        type: 'confirm',
        name: 'startCoding',
        message: 'Do you want to start coding right away?',
        default: true
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
        dev:
          'cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js',
        watch:
          'cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --watch-poll --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js',
        hot:
          'cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js',
        production:
          'cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js'
      },
      license: 'ISC'
    };

    const localHostConfig = {
      serveStatic: ['./public'],
      files: ['./public']
    };

    const proxyHostConfig = {
      proxy: this.answers.schema + '://localhost',
      host: 'dev.host',
      files: ['public/js/**/*.js', 'public/css/**/*.css', 'public/*.html'],
      open: false,
      watchOptions: {
        usePolling: true
      }
    };

    let browserSyncConfig =
      this.answers.environment === 'proxy' ? proxyHostConfig : localHostConfig;

    this.fs.write('package.json', JSON.stringify(packageJson));
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(path.join('src', 'index.html')),
      {
        installJquery: this.answers.installJquery,
        gaEnabled: this.answers.gaEnabled,
        gaTrackingID: this.answers.gaTrackingID,
        useImprint: this.answers.useImprint
      }
    );
    this.fs.copyTpl(
      this.templatePath('impressum.html'),
      this.destinationPath(path.join('src', 'pages', 'impressum.html')),
      {
        gaEnabled: this.answers.gaEnabled,
        gaTrackingID: this.answers.gaTrackingID
      }
    );
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copyTpl(
      this.templatePath('webpack.mix.js'),
      this.destinationPath('webpack.mix.js'),
      {
        browserSyncConfig: browserSyncConfig
      }
    );
    this.fs.copyTpl(
      this.templatePath('main.ejs'),
      this.destinationPath(path.join('src', 'js', 'main.js')),
      {
        installJquery: this.answers.installJquery,
        gaEnabled: this.answers.gaEnabled
      }
    );
    this.fs.copyTpl(
      this.templatePath('googleAnalytics.ejs'),
      this.destinationPath(path.join('src', 'js', 'googleAnalytics.js')),
      {
        gaTrackingID: this.answers.gaTrackingID
      }
    );
    this.fs.copyTpl(
      this.templatePath('styles.scss'),
      this.destinationPath(path.join('src', 'sass', 'styles.scss')),
      {
        gaEnabled: this.answers.gaEnabled
      }
    );
    this.fs.copy(
      this.templatePath('logo_Pttrn_B.svg'),
      this.destinationPath(path.join('public', 'imgs', 'logo_Pttrn_B.svg'))
    );
    this.fs.copy(
      this.templatePath('robots.txt'),
      this.destinationPath(path.join('public', 'robots.txt'))
    );
  }

  install() {
    this.npmInstall(npmDevDependencies, { 'save-dev': true });
    if (this.answers.installJquery) {
      npmDependencies.push('jquery');
    }
    if (this.answers.gaEnabled) {
      npmDependencies.push('simple-cookie-consent');
    }
    this.npmInstall(npmDependencies, { save: true });

    this.installDependencies({ bower: false });
  }

  end() {
    if (this.answers.startCoding) {
      this.spawnCommandSync('npm', ['run', 'watch']);
    }
  }
};
