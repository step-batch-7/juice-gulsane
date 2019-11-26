const generateTransactionStatus = function(parsedUserArgs) {
  let firstHeader = ["Transaction Recorded:"];
  let secondHeader = ["Employee ID,Beverage,Quantity,Date"];
  let fields = Object.values(parsedUserArgs);
  let transactionStatus = [firstHeader, secondHeader, fields].join("\n");
  return transactionStatus;
};

const generateQueryStatus = function(queryStatus) {
  let header = ["Employee ID,Beverage,Quantity,Date"];
  let totalQty = queryStatus.pop();
  let footer = "Total: " + totalQty + " Juices";
  queryStatus.unshift(header);
  queryStatus.push(footer);
  return queryStatus.join("\n");
};

let status = {
  "--save": generateTransactionStatus,
  "--query": generateQueryStatus
};

exports.generateTransactionStatus = generateTransactionStatus;
exports.generateQueryStatus = generateQueryStatus;
exports.status = status;
