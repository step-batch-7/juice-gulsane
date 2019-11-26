const assert = require("assert");
const generateTransactionStatus = require("../src/status.js")
  .generateTransactionStatus;
const generateQueryStatus = require("../src/status.js").generateQueryStatus;

describe("generateTransactionStatus", function() {
  it("should give transaction status in string", function() {
    let actualValue = generateTransactionStatus({
      empId: "11111",
      beverage: "orange",
      Qty: 1
    });
    let expectedValue =
      "Transaction Recorded:\n" +
      "Employee ID,Beverage,Quantity,Date\n" +
      "11111,orange,1";
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("generateQueryStatus", function() {
  it("should give query status in string", function() {
    let actualValue = generateQueryStatus([
      ["11111", "orange", 1, "12-12-2019"],
      1
    ]);

    let expectedValue =
      "Employee ID,Beverage,Quantity,Date\n" +
      "11111,orange,1,12-12-2019\n" +
      "Total: 1 Juices";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
