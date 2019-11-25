const updateTransaction = function(oldTransactions, parsedUserArgs) {
  let empId = parsedUserArgs.empId;
  if (!oldTransactions[empId]) {
    oldTransactions[empId] = [];
  }
  oldTransactions[empId].push(parsedUserArgs);
  return oldTransactions;
};

const generateTransactionStatus = function(parsedUserArgs) {
  let firstHeader = ["Transaction Recorded:"];
  let secondHeader = ["Employee ID,Beverage,Quantity,Date"];
  let fields = Object.values(parsedUserArgs);
  let transactionStatus = [firstHeader, secondHeader, fields].join("\n");
  return transactionStatus;
};

const saveLogs = function(oldTransactions, parsedUserArgs) {
  let date = new Date();
  parsedUserArgs.date = date;
  let updatedTransaction = updateTransaction(oldTransactions, parsedUserArgs);
  return updatedTransaction;
};

const giveTotalQty = function(sum, transaction) {
  let qty = transaction.qty;
  return sum + qty;
};

const extractDetail = function(transaction) {
  return Object.values(transaction);
};

const queryLogs = function(oldTransactions, parsedUserArgs) {
  let empId = parsedUserArgs.empId;
  let transactionDetails = oldTransactions[empId];
  let totalQty = transactionDetails.reduce(giveTotalQty, 0);
  let transactionStatus = transactionDetails.map(extractDetail);
  transactionStatus.push([totalQty]);
  return transactionStatus;
};

let operations = {"--save": saveLogs, "--query": queryLogs};

exports.saveLogs = saveLogs;
exports.updateTransaction = updateTransaction;
exports.giveTotalQty = giveTotalQty;
exports.extractDetail = extractDetail;
exports.queryLogs = queryLogs;
exports.operations = operations;
