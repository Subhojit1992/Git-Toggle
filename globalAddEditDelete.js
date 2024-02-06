const yargs = require("yargs");

const addQ = require('./addQuestionAndSave');

const handleAdd = (filePath) => {
    addQ.addPrompt(filePath)
};

const handleEdit = () => {
  console.log("Work edit here");
};

const yargsLogic = (filePath) => {
  yargs
    .command({
      command: ["--add-details", "-A"],
      describe: "Add something",
      handler: (filePath) => {
        handleAdd(filePath);
      },
    })
    .command({
      command: ["--edit", "-E"],
      describe: "Edit something",
      handler: () => {
        handleEdit();
      },
    })
    .help().argv;
};

module.exports.addEditDelete = yargsLogic;
