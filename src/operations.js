const updateTransaction = function(oldTransactions, parsedUserArgs) {
  let empId = parsedUserArgs.empId;

  if (!oldTransactions[empId]) {
    oldTransactions[empId] = [];
  }
  oldTransactions[empId].push(parsedUserArgs);
  return oldTransactions;
};

const giveTotalQty = function(sum, transaction) {
  let qty = transaction.qty;
  return sum + qty;
};

const extractDetail = function(transaction) {
  return Object.values(transaction);
};

const queryTransactions = function(oldTransactions, parsedUserArgs) {
  let empId = parsedUserArgs.empId;
  let transactionDetails = oldTransactions[empId];
  let totalQty = transactionDetails.reduce(giveTotalQty, 0);
  let queryStatus = transactionDetails.map(extractDetail);
  queryStatus.push(totalQty);
  return queryStatus;
};

exports.updateTransaction = updateTransaction;
exports.giveTotalQty = giveTotalQty;
exports.extractDetail = extractDetail;
exports.queryTransactions = queryTransactions;
