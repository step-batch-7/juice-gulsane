const pairOperationParameters = function(operationParameter) {
  let operationArgs = {};
  for (let index = 0; index < operationParameter.length; index += 2) {
    let key = operationParameter[index];
    let value = operationParameter[index + 1];
    operationArgs[key] = value;
  }
  return operationArgs;
};

const transformUserArgsData = function(userArgs) {
  let operation = userArgs[0];
  let transformedUserArgsData = {};
  transformedUserArgsData[operation] = userArgs.slice(1);
  transformedUserArgsData[operation] = pairOperationParameters(
    transformedUserArgsData[operation]
  );
  return transformedUserArgsData;
};

exports.transformUserArgsData = transformUserArgsData;
