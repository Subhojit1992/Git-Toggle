const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const YAML = require("yamljs");
const _ = require("lodash");
const Table = require("cli-table3");

const shell = require("./shell");
const add = require("./askAddDetails");
const addMQ = require("./addMoreQuestionAndSave");

const askQuestion = (list) => {
  console.log(chalk.green(`Found list of git configuration! 🥳`));
  // Create a table instance
  const table = new Table({
    head: ["Label", "Name", "Email"],
    colWidths: [30, 40, 30],
  });

  // Populate the table with data
  list.forEach((option) => {
    table.push([option.label, option.name, option.email]);
  });

  // Display the table
  console.log(table.toString());

  // Prompt the user to select an option using radio buttons
  inquirer
    .prompt([
      {
        type: "list",
        name: "selectedOption",
        message: "Select a git configuration:",
        choices: list.map((option, i) => ({
          name: `${option.label} - [name: ${option.name} - email: ${option.email}]`,
          value: i,
        })),
      },
    ])
    .then((answers) => {
      // console.log(answers.selectedOption, list[answers.selectedOption])
      // const selectedOption = list.find(
      //   (option) => option.email === answers.selectedOption
      // );
      const  selectedOption = list[answers.selectedOption];
      console.log(
        `You selected: ${selectedOption.label} (${selectedOption.email})`
      );

      const singleUser = _.filter(list, { email: selectedOption.email, name: selectedOption.name });
      shell.buildAndRunShell(singleUser);
    });
};

const askAdd = (filePath) => {
  console.log(
    chalk.yellowBright(`Didn't found any git configuration! 😣 let's add! 🥳`)
  );
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // ok then ask for adding new one
      add.askAddDetails(filePath);
    } else {
      addMQ.addMorePrompt(filePath);
    }
  });
};

module.exports.gitToggle = function (filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      if (YAML.parse(data).length === 0) {
        askAdd(filePath);
      } else {
        askQuestion(YAML.parse(data));
      }
    }
  });
};
