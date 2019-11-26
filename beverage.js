const performOperation = require("./src/performOperation.js").performOperation;
const fs = require("fs");
const generateDate = function() {
  let date = new Date().toJSON();
  return date;
};

const main = function() {
  const userArgs = process.argv.slice(2);
  const date = generateDate();
  const filePath = "./transactionDetails.json";
  const fileFunctions = {
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    existsFile: fs.existsSync
  };

  let message = performOperation(filePath, fileFunctions, userArgs, date);
  return message;
};

console.log(main());
