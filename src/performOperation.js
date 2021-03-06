const updateTransaction = require("./operations.js").updateTransaction;
const queryTransactions = require("./operations.js").queryTransactions;
const status = require("./status.js").status;
const transformUserArgsData = require("./utilities.js").transformUserArgsData;
const validateUserArgs = require("./validateUserArgs.js").validateUserArgs;

const loadTransactionsData = function(filePath, readFile, existsFile) {
  let fileContent = existsFile(filePath) && readFile(filePath, "utf8");
  return JSON.parse(fileContent) || [];
};

const saveTransaction = function(updatedTransaction, fileFunctions, filePath) {
  let stringifiedUpdatedTransaction = JSON.stringify(updatedTransaction);
  fileFunctions.writeFile(filePath, stringifiedUpdatedTransaction, "utf8");
};

const parseUserArgs = function(userArgs) {
  const beverage = userArgs[2];
  const qty = +userArgs[6];
  const empId = userArgs[4];
  const parsedArgs = { empId: empId, beverage: beverage, qty: qty };
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

const doQueryOperation = function(oldTransactions, transformedUserArgsData) {
  let queryStatus = queryTransactions(oldTransactions, transformedUserArgsData);
  return status["--query"](queryStatus);
};

const performOperation = function(filePath, fileFunctions, userArgs, date) {
  const transformedUserArgsData = transformUserArgsData(userArgs);
  const isValidUserArgs = validateUserArgs(transformedUserArgsData);
  if (!isValidUserArgs) {
    return "please enter proper input";
  }
  let parsedUserArgs = parseUserArgs(userArgs);
  const readFile = fileFunctions.readFile;
  const existsFile = fileFunctions.existsFile;
  const oldTransactions = loadTransactionsData(filePath, readFile, existsFile);
  if (transformedUserArgsData["--save"]) {
    let status = doSaveOperation(
      oldTransactions,
      parsedUserArgs,
      date,
      fileFunctions,
      filePath
    );
    return status;
  }

  let status = doQueryOperation(oldTransactions, transformedUserArgsData);
  return status;
};

exports.performOperation = performOperation;
exports.parseUserArgs = parseUserArgs;
exports.loadTransactionsData = loadTransactionsData;
exports.doSaveOperation = doSaveOperation;
exports.doQueryOperation = doQueryOperation;
