const fs = require("fs");
const inquirer = require("inquirer");
const YAML = require("yamljs");
const _ = require("lodash");
const Table = require("cli-table3");

const shell = require("./shell");

const askQuestion = (list) => {
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
        choices: list.map((option) => ({
          name: `${option.label} - [name: ${option.name} - email: ${option.email}]`,
          value: option.email,
        })),
      },
    ])
    .then((answers) => {
      const selectedOption = list.find(
        (option) => option.email === answers.selectedOption
      );
      console.log(
        `You selected: ${selectedOption.label} (${selectedOption.email})`
      );

      const singleUser = _.filter(list, { email: selectedOption.email });
      shell.buildAndRunShell(singleUser);
    });
};

module.exports.gitToggle = function (filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      askQuestion(YAML.parse(data));
    }
  });
};
