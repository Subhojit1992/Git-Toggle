#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");
const shell = require("shelljs");
const chalk = require('chalk');
const _ = require("lodash");

const { Command } = require('commander');
const program = new Command();

const gitGo = require("./gitGo");
const add = require("./askAddDetails");
// const yargsAddEditDelete = require("./globalAddEditDelete");

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

const indexCall = () => {
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(
        chalk.yellowBright(
          `File ${fileName} does not exist in the user's home directory.`
        )
      );

      // ok then ask for adding new one
      add.askAddDetails(filePath);
    } else {
      console.log(
        chalk.green(
          `Found the file ${fileName} in the user's home directory at ${filePath}.`
        )
      );
      gitGo.gitToggle(filePath);
    }
  });
}


program
  .name('git-toggler')
  .description('Git Toggler Description')
  .version('0.8.0');

program
  .option('-a, --add', 'Add New')
  .option('-e, --edit', 'Edit Item')
  .option('-v, --view', 'View current details')
  .option('-p, --pizza-type <type>', 'flavour of pizza')
  .action((str, options) => {
    if (str.add) {
      console.log('add')
    } else if (str.edit) {
      console.log('edit')
    }else if (str.view) {
      console.log(chalk.green("Current git configure information"));
      shell.exec('git config --global user.name');
      shell.exec('git config --global user.email');
    } else {
      indexCall()
    }
  });

program.parse(process.argv);


