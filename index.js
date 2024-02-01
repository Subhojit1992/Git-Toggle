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

YAML.load('git-details.yml', function(result) {
  askQuestion(result.GitDetails)
})

