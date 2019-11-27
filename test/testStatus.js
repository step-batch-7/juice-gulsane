const assert = require("assert");
const generateTransactionStatus = require("../src/status.js")
  .generateTransactionStatus;
const generateQueryStatus = require("../src/status.js").generateQueryStatus;
const giveTotalQty = require("../src/status.js").giveTotalQty;
const extractFields = require("../src/status.js").extractFields;

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

describe("giveTotalQty", function() {
  it("should give total qty of transactions", function() {
    let actualValue = giveTotalQty(0, { qty: 1 });
    let expectedValue = 1;
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("extractFields", function() {
  it("should give values of transaction", function() {
    let actualValue = extractFields({
      empId: "11111",
      beverage: "orange",
      qty: 1,
      date: "10-11-2019"
    });
    let expectedValue = ["11111", "orange", 1, "10-11-2019"];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("generateQueryStatus", function() {
  it("should give query status in string", function() {
    let actualValue = generateQueryStatus([
      { empId: "11111", beverage: "orange", qty: 1, date: "12-12-2019" }
    ]);

    let expectedValue =
      "Employee ID,Beverage,Quantity,Date\n" +
      "11111,orange,1,12-12-2019\n" +
      "Total: 1 Juices";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
