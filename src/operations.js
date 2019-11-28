const updateTransaction = function(oldTransactions, parsedUserArgs) {
  oldTransactions.push(parsedUserArgs);
  return oldTransactions;
};

const extractEmpDetails = function(filterParameters) {
  return function(transaction) {
    let isEmpId = true;
    if (filterParameters["--empId"]) {
      isEmpId = transaction["empId"] == filterParameters["--empId"];
    }
    let isBeverage = true;
    if (filterParameters["--beverage"]) {
      isBeverage = transaction["beverage"] == filterParameters["--beverage"];
    }
    return isEmpId && isBeverage;
  };
};

const queryTransactions = function(oldTransactions, transformedUserArgsData) {
  const filterParameters = transformedUserArgsData["--query"];
  const empTransactionsDetail = oldTransactions.filter(
    extractEmpDetails(filterParameters)
  );
  return empTransactionsDetail;
};

exports.updateTransaction = updateTransaction;
exports.queryTransactions = queryTransactions;
