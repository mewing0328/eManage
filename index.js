const connection = require('./config/connection');
const functions = require('./lib/functions');
const chalk = require('chalk');
const log = console.log;

init();
function init(){
  log(chalk.cyan("==========================================================================================================="));
  log("");
  log(chalk.bold("Hello! Welcome to eManage, your employee database."));
  log("");
  log(chalk.cyan("==========================================================================================================="));
  connection.connect((err) => {
    if (err) throw err;
    functions.askUser();
  }); 
};
