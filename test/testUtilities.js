const assert = require("assert");
const transformUserArgsData = require("../src/utilities.js")
  .transformUserArgsData;
const pairOperationParameters = require("../src/utilities.js")
  .pairOperationParameters;

describe("pairOperationParameters", function() {
  it("pair make prefix key and suffixs it value when it is given in object", function() {
    let actualValue = pairOperationParameters([
      "--empId",
      "11111",
      "--beverage",
      "orange",
      "qty",
      "1"
    ]);
    let expectedValue = {
      "--empId": "11111",
      "--beverage": "orange",
      qty: "1"
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("transformUserArgsData", function() {
  it("should give argsData making operation as key and paremeters as key and value", function() {
    let actualValue = transformUserArgsData([
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "123",
      "--qty",
      "1"
    ]);
    let expectedValue = {
      "--save": { "--empId": "123", "--beverage": "orange", "--qty": "1" }
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
