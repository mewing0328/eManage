const connection = require('./config/connection');
const functions = require('./lib/functions');

init();
function init(){
  console.log("=============================================================");
  console.log("                                                            ");
  console.log("Hello! Welcome to eManage, your employee database.");
  console.log("                                                            ");
  connection.connect((err) => {
    if (err) throw err;
    functions.askUser();
  }); 
};
