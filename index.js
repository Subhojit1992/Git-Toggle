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

// # https://github.com/Automattic/cli-table

// user home directory
const userHome = os.homedir();
// particular file name
const fileName = "git-details.yml";
// file path creation
const filePath = path.join(userHome, fileName);

// const argv = yargs
//   .usage('Usage: $0 <file>')
//   .demandCommand(1, 'Please provide a file path.')
//   .argv;

// const filePath = argv._[0];

// console.log(filePath);

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
      console.log(chalk.green(`Found list of git configuration! 🥳`));
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
    colWidths: [30, 30],
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

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .option("-a, --add", "Add New")
  .option("-e, --edit", "Edit Item")
  .option("-c, --current", "View current global git config details")
  .option("-p, --pizza-type <type>", "flavour of pizza")
  .action((str, options) => {
    if (str.add) {
      addNewConfig();
    } else if (str.edit) {
      console.log("edit");
    } else if (str.current) {
      console.log(chalk.green("Current git configure information"));
      viewCurrent();
    } else {
      indexCall();
    }
  });

program.parse(process.argv);
