const fs = require('fs');
const inquirer = require('inquirer');
const YAML = require('yamljs');
const _ = require('lodash');

const shell = require('./shell');

const askQuestion = (list) => {
    inquirer
      .prompt([
        {
          type: 'rawlist',
          name: 'git_type',
          message: 'What type of git you want to use?',
          choices: _.map(list, 'label'),
        },
      ])
      .then((answers) => {
        const singleUser = _.filter(list, {label: answers.git_type});
        shell.buildAndRunShell(singleUser);
      });
}

module.exports.gitToggle = function (filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file: ${err.message}`);
        } else {
          askQuestion(YAML.parse(data))
        }
      });
}