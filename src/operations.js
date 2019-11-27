const updateTransaction = function(oldTransactions, parsedUserArgs) {
  oldTransactions.push(parsedUserArgs);
  return oldTransactions;
};

const extractEmpDetails = function(empId) {
  return function(transaction) {
    return transaction["empId"] == empId;
  };
};

const queryTransactions = function(oldTransactions, parsedUserArgs) {
  let empId = parsedUserArgs.empId;
  let empTransactionsDetail = oldTransactions.filter(extractEmpDetails(empId));
  return empTransactionsDetail;
};

exports.updateTransaction = updateTransaction;
exports.queryTransactions = queryTransactions;
