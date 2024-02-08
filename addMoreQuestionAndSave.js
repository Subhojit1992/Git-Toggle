const fs = require("fs");
const YAML = require("yamljs");
const inquirer = require("inquirer");
const gitGo = require("./gitGo");
const chalk = require("chalk");

const questions = [
  {
    type: "input",
    name: "gitUsername",
    message: "Enter your Git username:",
    validate: (input) => input.trim() !== "" || "Username cannot be empty",
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
const addMoreDetails = (filePath) => {
  fs.readFile(filePath, "utf-8", (readErr, data) => {
    if (readErr) {
      console.error("Error reading file:", readErr);
      return;
    }
    let existingYamlData;
    try {
      existingYamlData = YAML.parse(data) || [];
    } catch (parseErr) {
      console.error("Error parsing YAML:", parseErr);
      return;
    }

    inquirer.prompt(questions).then((answers) => {
      //Add new data
      existingYamlData.push({
        name: answers.gitUsername,
        email: answers.gitEmail,
        label: answers.label,
      });

      // Format responses as YAML
      const yamlData = YAML.stringify(existingYamlData, 2);

      //Save the YAML data to a file
      fs.writeFile(filePath, yamlData, (err) => {
        if (err) {
          console.error("Error saving file:", err);
        } else {
          console.log(chalk.green(`Git details added to ${filePath} 🥳`));

          const options = [
            {
              type: "list",
              name: "choice",
              message: "Please select one of the following:",
              choices: [
                "Do you want to add more global git details?",
                "Proceed with Git Toggler!",
              ],
            },
          ];

          inquirer.prompt(options).then((answers) => {
            const selectedIndex = options[0].choices.indexOf(answers.choice);

            if (selectedIndex === 0) {
              addMoreDetails(filePath);
            } else if (selectedIndex === 1) {
              gitGo.gitToggle(filePath);
            }
          });
        }
      });
    });
  });
};
module.exports.addMorePrompt = addMoreDetails;
