#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const yargs = require('yargs');
const chalk = require('chalk');
const _ = require('lodash');

const gitGo = require('./gitGo');
const add = require('./askAddDetails');
const yargsAddEditDelete = require('./globalAddEditDelete');

// user home directory
const userHome = os.homedir();
// particular file name
const fileName = 'git-details.yml';
// file path creation
const filePath = path.join(userHome, fileName);


// const argv = yargs
//   .usage('Usage: $0 <file>')
//   .demandCommand(1, 'Please provide a file path.')
//   .argv;



// const filePath = argv._[0];

// console.log(filePath);




// Check if the file exists
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.log(chalk.yellowBright(`File ${fileName} does not exist in the user's home directory.`))

    // ok then ask for adding new one
    add.askAddDetails(filePath);
  } else {
    console.log(chalk.green(`Found the file ${fileName} in the user's home directory at ${filePath}.`))
    // yargsAddEditDelete.addEditDelete(filePath);
    gitGo.gitToggle(filePath);
  }
});

