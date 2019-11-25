const fs = require("fs");
const operations = require("./operations.js").operations;
//const status = require("./status.js").status;

const parseUserArgs = function(userArgs) {
  let empId = userArgs[2];
  let parsedArgs = { empId: empId };
  if (userArgs[0] == "--save") {
    let beverage = userArgs[2];
    let qty = +userArgs[6];
    empId = userArgs[4];
    parsedArgs = { empId: empId, beverage: beverage, qty: qty };
  }
  return parsedArgs;
};

const performOperation = function(oldTransactions, userArgs) {
  let action = userArgs[0];
  let parsedUserArgs = parseUserArgs(userArgs);
  return operations[action](oldTransactions, parsedUserArgs);
};

exports.performOperation = performOperation;
exports.parseUserArgs = parseUserArgs;
