const fs = require("fs");
const inquirer = require("inquirer");
const YAML = require("yamljs");
const Table = require("cli-table3");
const chalk = require("chalk");

const gitGo = require("./gitGo");
const add = require("./askAddDetails");
const addMQ = require("./addMoreQuestionAndSave");

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

// display the array of objects using cli-table3
const displayData = (data) => {
  // Initialize table
  const table = new Table({
    head: ["Label", "Name", "Email"],
    colWidths: [30, 40, 30],
  });

  // Add data rows to the table
  data.forEach((obj) => {
    table.push([obj.label, obj.name, obj.email]);
  });

  // Display the table
  console.log(table.toString());
};

// prompt the user to select an object to edit
const promptSelectObject = (data) => {
  return inquirer.prompt([
    {
      type: "list",
      name: "selectedEmail",
      message: "Select a git config to edit:",
      choices: data.map((obj) => ({
        name: `${obj.name}: ${obj.email}`,
        value: obj.email,
      })),
    },
  ]);
};

// Function to prompt the user to edit the selected object
const promptEditObject = (selectedObject) => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter new Git username:",
      default: selectedObject.name,
      validate: (input) => input.trim() !== "" || "username cannot be empty",
    },
    {
      type: "input",
      name: "email",
      message: "Enter new Git email:",
      default: selectedObject.email,
      validate: (input) =>
        /.+@.+\..+/.test(input) || "Enter a valid email address",
    },
    {
      type: "input",
      name: "label",
      message: "Enter a label for these Git details:",
      default: selectedObject.label,
      validate: (input) => input.trim() !== "" || "Label cannot be empty",
    },
  ]);
};

// Function to edit an object in the array based on its email
const editObjectByEmail = (email, newData, data) => {
  const index = data.findIndex((obj) => obj.email === email);
  if (index !== -1) {
    Object.assign(data[index], newData);
  }
};

// Main function to run the program
module.exports.editSelectedConfig = (filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      let parsedData = YAML.parse(data);

      if (parsedData.length === 0) {
        askAdd(filePath);
      } else {
        const playWithParsedData = async () => {
          // Display current data
          displayData(parsedData);
          // Prompt user to select an object to edit
          const { selectedEmail } = await promptSelectObject(parsedData);

          // Find the selected object
          const selectedObject = parsedData.find(
            (obj) => obj.email === selectedEmail
          );

          // Prompt user to edit the selected object
          const newData = await promptEditObject(selectedObject);

          // Edit the selected object
          editObjectByEmail(selectedEmail, newData, parsedData);

          // set updated data
          fs.writeFile(filePath, YAML.stringify(parsedData), (err) => {
            if (err) {
              console.error("Error during edited data saving:", err);
            } else {
              console.log(chalk.green(`Git details edited successfully 🥳`));
              // Display updated data
              // displayData(parsedData);
              gitGo.gitToggle(filePath);
            }
          });
        };

        playWithParsedData();
      }
    }
  });
};
