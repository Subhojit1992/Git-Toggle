const fs = require("fs");
const inquirer = require("inquirer");
const YAML = require("yamljs");
const _ = require("lodash");
const Table = require("cli-table3");
const chalk = require("chalk");

const add = require("./askAddDetails");
const addMQ = require("./addMoreQuestionAndSave");

const askAdd = (filePath) => {
    console.log(chalk.yellowBright(`Didn't found any git configuration! 😣 let's add! 🥳`));
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // ok then ask for adding new one
      add.askAddDetails(filePath);
    } else {
      addMQ.addMorePrompt(filePath);
    }
  });
};

const askQuestion = (list, filePath) => {
  if (list.length === 0) {
    askAdd(filePath);
  } else {
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
        // selected data removed from array
        const filteredData = _.filter(
          list,
          (item) => !_.isMatch(item, { email: selectedOption.email })
        );

        fs.writeFile(filePath, YAML.stringify(filteredData), (err) => {
          if (err) {
            console.error("Error during delete:", err);
          } else {
            console.log(chalk.green(`Git details deleted successfully 🥳`));
          }
        });
      });
  }
};

module.exports.deleteConfig = function (filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      askQuestion(YAML.parse(data), filePath);
    }
  });
};
