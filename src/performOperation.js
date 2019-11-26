const updateTransaction = require("./operations.js").updateTransaction;
const queryTransactions = require("./operations.js").queryTransactions;
const status = require("./status.js").status;

const generateContent = function(filePath, readFile, existsFile) {
  let fileContent = existsFile(filePath) && readFile(filePath, "utf8");
  return JSON.parse(fileContent) || {};
};

const saveTransaction = function(updatedTransaction, fileFunctions, filePath) {
  let stringifiedUpdatedTransaction = JSON.stringify(updatedTransaction);
  fileFunctions.writeFile(filePath, stringifiedUpdatedTransaction, "utf8");
};

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

const doSaveOperation = function(
  oldTransactions,
  parsedUserArgs,
  date,
  fileFunctions,
  filePath
) {
  parsedUserArgs["date"] = date;
  let updatedTransaction = updateTransaction(oldTransactions, parsedUserArgs);
  saveTransaction(updatedTransaction, fileFunctions, filePath);
  return status["--save"](parsedUserArgs);
};

const doQueryOperation = function(oldTransactions, parsedUserArgs) {
  let empId = parsedUserArgs.empId;
  if (!oldTransactions[empId]) {
    return "there is no transaction with empId: " + empId;
  }
  let queryStatus = queryTransactions(oldTransactions, parsedUserArgs);
  return status["--query"](queryStatus);
};

const performOperation = function(filePath, fileFunctions, userArgs, date) {
  const action = userArgs[0];
  let parsedUserArgs = parseUserArgs(userArgs);
  const readFile = fileFunctions["readFile"];
  const existsFile = fileFunctions["existsFile"];
  const oldTransactions = generateContent(filePath, readFile, existsFile);
  if (action == "--save") {
    let status = doSaveOperation(
      oldTransactions,
      parsedUserArgs,
      date,
      fileFunctions,
      filePath
    );
    return status;
  }

  let status = doQueryOperation(oldTransactions, parsedUserArgs);
  return status;
};

exports.performOperation = performOperation;
exports.parseUserArgs = parseUserArgs;
exports.generateContent = generateContent;
exports.doSaveOperation = doSaveOperation;
exports.doQueryOperation = doQueryOperation;
