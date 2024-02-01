const shell = require("shelljs");
const chalk = require('chalk');

module.exports.buildAndRunShell = function (user) { 
    console.log(chalk.green("Current information"));
    shell.exec('git config --global user.name');
    shell.exec('git config --global user.email');
    
    console.log(chalk.yellowBright("------------------------"));
    console.log(chalk.green("Changing...."));
    console.log(chalk.yellowBright("------------------------"))

    console.log(chalk.cyan((`Setting user.name - ${user[0].name}`)));
    console.log(chalk.cyan((`Setting user.email - ${user[0].email}`)));

    shell.exec(`git config --global user.name ${user[0].name}`);
    shell.exec(`git config --global user.email ${user[0].email}`);
    console.log(chalk.yellowBright("------------------------"))
    console.log(chalk.green("Hurray Done 🥳"))
};