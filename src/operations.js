const updateTransaction = function(oldTransactions, parsedUserArgs) {
  oldTransactions.push(parsedUserArgs);
  return oldTransactions;
};

const extractEmpDetails = function(filterParameters) {
  return function(transaction) {
    let isEmpId = true;
    if (filterParameters["--empId"]) {
      isEmpId = transaction.empId === filterParameters["--empId"];
    }
    let isBeverage = true;
    if (filterParameters["--beverage"]) {
      isBeverage = transaction.beverage === filterParameters["--beverage"];
    }
    let isDate = true;
    if (filterParameters["--date"]) {
      isDate = transaction.date.slice(0, 10) === filterParameters["--date"];
    }
    return isEmpId && isBeverage && isDate;
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
