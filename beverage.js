const fs = require("fs");
const performOperation = require("./src/performOperation.js").performOperation;

const main = function() {
  let userArgs = process.argv.slice(2);
  let oldTransactions = fs.readFileSync("./transactionsDetails.json", "utf8");
  let message = performOperation(oldTransactions,userArgs);
  return message;
};

console.log(main());
