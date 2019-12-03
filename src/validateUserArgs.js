const isWholeNum = function(num) {
  return num > 0 && Number.isInteger(num);
};
const validateEmpId = function(empId) {
  return isWholeNum(+empId);
};

const validateBeverage = function(beverage) {
  return beverage.length > 0;
};

const validateQty = function(qty) {
  return isWholeNum(+qty);
};

const validateOperation = function(operation) {
  const availableOperation = ["--save", "--query"];
  return availableOperation.includes(operation);
};

const validateDate = function(date) {
  return date.length == 10 && new Date(date) != "Invalid Date";
};

const validateArgs = function(args) {
  const validArgsOptions = {
    "--beverage": validateBeverage,
    "--empId": validateEmpId,
    "--qty": validateQty,
    "--date": validateDate
  };
  return Object.entries(args).every(function(argPair) {
    return (
      !!validArgsOptions[argPair[0]] && validArgsOptions[argPair[0]](argPair[1])
    );
  });
};

const validateUserArgs = function(transformedUserArgs) {
  const operation = Object.keys(transformedUserArgs)[0];
  const isValidOperation = validateOperation(operation);
  const isValidArgs = validateArgs(transformedUserArgs[operation]);
  return isValidOperation && isValidArgs;
};

exports.validateEmpId = validateEmpId;
exports.validateBeverage = validateBeverage;
exports.validateQty = validateQty;
exports.validateOperation = validateOperation;
exports.validateDate = validateDate;
exports.validateUserArgs = validateUserArgs;
exports.validateArgs = validateArgs;
