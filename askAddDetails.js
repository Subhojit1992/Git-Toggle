const inquirer = require('inquirer');

const addQ = require('./addQuestionAndSave');


module.exports.askAddDetails = function (filePath) { 
    inquirer
        .prompt([
        {
            type: 'confirm',
            name: 'addGlobalGitDetails',
            message: 'Do you want to add a new global git details?',
            default: true,
        },
        ])
        .then((answers) => {
            if (answers.addGlobalGitDetails) {
                

                addQ.addPrompt(filePath)

            } else {
                console.log('Exiting...');
            }
        });
}