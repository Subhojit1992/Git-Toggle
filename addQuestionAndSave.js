const fs = require("fs");
const YAML = require("yamljs");
const inquirer = require("inquirer");
const addMQ = require("./addMoreQuestionAndSave");
const gitGo = require("./gitGo");
const chalk = require("chalk");

const questions = [
  {
    type: "input",
    name: "gitUsername",
    message: "Enter your Git username:",
    validate: (input) => input.trim() !== "" || "username cannot be empty",
  },
  {
    type: "input",
    name: "gitEmail",
    message: "Enter your Git email:",
    validate: (input) =>
      /.+@.+\..+/.test(input) || "Enter a valid email address",
  },
  {
    type: "input",
    name: "label",
    message: "Enter a label for these Git details:",
    validate: (input) => input.trim() !== "" || "Label cannot be empty",
  },
];

module.exports.addPrompt = (filePath) => {
  inquirer.prompt(questions).then((answers) => {
    // Format responses as YAML
    const yamlData = YAML.stringify(
      [
        {
          name: answers.gitUsername,
          email: answers.gitEmail,
          label: answers.label,
        },
      ],
      2
    );
    // Save the YAML data to a file
    fs.writeFile(filePath, yamlData, (err) => {
      if (err) {
        console.error("Error saving file:", err);
      } else {
        console.log(chalk.green(`Git details added to ${filePath} 🥳`));
        inquirer
          .prompt([
            {
              type: "confirm",
              name: "addMoreGlobalGitDetails",
              message: "Do you want to add more global git details?",
              default: true,
            },
          ])
          .then((answers) => {
            if (answers.addMoreGlobalGitDetails) {
              addMQ.addMorePrompt(filePath);
            } else {
              gitGo.gitToggle(filePath);
            }
          });
      }
    });
  });
};
