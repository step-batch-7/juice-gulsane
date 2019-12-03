const getPath = function(process) {
  return process.env.DATAFILE || "./transactionDetails.json";
};

const getTime = function(process) {
  const stubbeDate = new Date(process.env.date);
  const isValidDate = !isNaN(stubbeDate.getTime());
  return isValidDate ? stubbeDate : new Date();
};

exports.getPath = getPath;
exports.getTime = getTime;
