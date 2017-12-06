'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log("Let's ignite another great static webpp with " + chalk.blue('Web Igniter'));

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: "What's the name of your product/project?",
        validate(answer) {
          let pass = !_.isEmpty(answer);
          return pass ? true : 'Product/project name is required!';
        }
      }
    ];

    return this.prompt(questions).then(answers => {
      // To access answers later use this.answers.someAnswer;
      this.answers = answers;
    });
  }

  default() {
    mkdirp(this.answers.name);
    this.destinationRoot(this.destinationPath(this.answers.name));
  }

  writing() {
    this.fs.copy(this.templatePath('index.html'), this.destinationPath('index.html'));
  }

  install() {
    // This.installDependencies({ bower: false });
  }
};
