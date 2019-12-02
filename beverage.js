const performOperation = require("./src/performOperation.js").performOperation;
const fs = require("fs");
const config = require("./src/config.js");

const main = function() {
  const userArgs = process.argv.slice(2);
  const date = config.getTime(process);
  const filePath = config.getPath(process);
  const fileFunctions = {
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    existsFile: fs.existsSync
  };

  let message = performOperation(filePath, fileFunctions, userArgs, date);
  return message;
};

console.log(main());
