const fs = require('fs');
const YAML = require('yamljs');
const inquirer = require('inquirer');

const questions = [
    {
      type: 'input',
      name: 'gitUsername',
      message: 'Enter your Git username:',
    },
    {
      type: 'input',
      name: 'gitEmail',
      message: 'Enter your Git email:',
      validate: (input) => /.+@.+\..+/.test(input) || 'Enter a valid email address',
    },
    {
      type: 'input',
      name: 'label',
      message: 'Enter a label for these Git details:',
    },
];

module.exports.addPrompt = (filePath) => {
    inquirer.prompt(questions).then((answers) => {
        // Format responses as YAML
        const yamlData = YAML.stringify([{ name: answers.gitUsername, email: answers.gitEmail, label: answers.label }], 2);
      
        // Save the YAML data to a file
        fs.writeFile(filePath, yamlData, (err) => {
          if (err) {
            console.error('Error saving file:', err);
          } else {
            console.log(`Git details saved to ${filePath}`);
          }
        });
      });
}