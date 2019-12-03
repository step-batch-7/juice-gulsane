const generateTransactionStatus = function(parsedUserArgs) {
  let firstHeader = ["Transaction Recorded:"];
  let secondHeader = ["Employee ID,Beverage,Quantity,Date"];
  parsedUserArgs.date = parsedUserArgs.date.toJSON();
  let fields = extractFields(parsedUserArgs);
  let transactionStatus = [firstHeader, secondHeader, fields].join("\n");
  return transactionStatus;
};

const giveTotalQty = function(sum, transaction) {
  let qty = transaction.qty;
  return sum + qty;
};

const extractFields = function(transaction) {
  const empId = transaction.empId;
  const beverage = transaction.beverage;
  const qty = transaction.qty;
  const date = transaction.date;
  const fields = [empId, beverage, qty, date];
  return fields;
};

const getFooter = function(totalQty) {
  const juice = totalQty > 1 ? "Juices" : "Juice";
  return `Total: ${totalQty} ${juice}`;
};

const generateQueryStatus = function(empTransactionsDetail) {
  const header = "Employee ID,Beverage,Quantity,Date";
  const totalQty = empTransactionsDetail.reduce(giveTotalQty, 0);
  const footer = getFooter(totalQty);
  let status = empTransactionsDetail.map(extractFields);
  status.unshift(header);
  status.push(footer);
  return status.join("\n");
};

let status = {
  "--save": generateTransactionStatus,
  "--query": generateQueryStatus
};

exports.generateTransactionStatus = generateTransactionStatus;
exports.generateQueryStatus = generateQueryStatus;
exports.status = status;
exports.giveTotalQty = giveTotalQty;
exports.extractFields = extractFields;
exports.getFooter = getFooter;
