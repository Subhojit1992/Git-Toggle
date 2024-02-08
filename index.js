#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");
const Table = require("cli-table3");
const shell = require("shelljs");
const chalk = require("chalk");
const _ = require("lodash");

const packageJson = require("./package.json");

const { Command } = require("commander");
const program = new Command();

const gitGo = require("./gitGo");
const add = require("./askAddDetails");
const addMQ = require("./addMoreQuestionAndSave");
const trash = require("./deleteDetails");
const editConfig = require("./editSelectedDetails");

// # https://github.com/Automattic/cli-table

// user home directory
const userHome = os.homedir();
// particular file name
const fileName = "git-details.yml";
// file path creation
const filePath = path.join(userHome, fileName);

// default git toggler
const indexCall = () => {
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(
        chalk.yellowBright(
          `Didn't found any git configuration! 😣 But don't worry let's create! 🥳`
        )
      );
      // ok then ask for adding new one
      add.askAddDetails(filePath);
    } else {
      gitGo.gitToggle(filePath);
    }
  });
};

// add new git config
const addNewConfig = () => {
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // ok then ask for adding new one
      add.askAddDetails(filePath);
    } else {
      addMQ.addMorePrompt(filePath);
    }
  });
};

const viewCurrent = () => {
  // viewCurrent();
  const table = new Table({
    head: ["Name", "Email"],
    colWidths: [30, 40],
  });

  // Get the git user name and email using shell.exec
  const gitUserName = shell
    .exec("git config --global user.name", { silent: true })
    .stdout.trim();
  const gitUserEmail = shell
    .exec("git config --global user.email", { silent: true })
    .stdout.trim();

  // Add the data to the table
  table.push([gitUserName, gitUserEmail]);

  // Display the table
  console.log(table.toString());
};

const editSelectedConfig = () => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // ok then ask for adding new one
      add.askAddDetails(filePath);
    } else {
      editConfig.editSelectedConfig(filePath);
    }
  });
  
}

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version, '-v, --version', 'output the version number')

program
  .option("-a, --add", "add new global git user.name and user.email configuration")
  .option("-e, --edit", "edit git user.name and user.email configuration from your git-toggler list")
  .option("-d, --delete", "delete git user.name and user.email configuration from your git-toggler list")
  .option("-c, --current", "view current global git user.name and user.email config details")
  .action((str, options) => {
    if (str.add) {
      addNewConfig();
    } else if (str.edit) {
      editSelectedConfig()
    } else if (str.delete) {
      trash.deleteConfig(filePath);
    } else if (str.current) {
      console.log(chalk.green("Current git configure information"));
      viewCurrent();
    } else {
      indexCall();
    }
  });

// program.on('--help', () => {
//   console.log(''); // Add a new line for better readability
//   console.log('  Example:');
//   console.log('');
//   console.log('    $ your-command-here --add');
// });

program.parse(process.argv);
