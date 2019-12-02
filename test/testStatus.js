const assert = require("assert");
const generateTransactionStatus = require("../src/status.js")
  .generateTransactionStatus;
const generateQueryStatus = require("../src/status.js").generateQueryStatus;
const giveTotalQty = require("../src/status.js").giveTotalQty;
const extractFields = require("../src/status.js").extractFields;
const getFooter = require("../src/status.js").getFooter;

describe("generateTransactionStatus", function() {
  it("should give transaction status in string", function() {
    let actualValue = generateTransactionStatus({
      empId: "11111",
      beverage: "orange",
      qty: 1,
      date: new Date("2019-11-30")
    });
    let expectedValue =
      "Transaction Recorded:\n" +
      "Employee ID,Beverage,Quantity,Date\n" +
      "11111,orange,1,2019-11-30T00:00:00.000Z";
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
      date: "2019-11-10"
    });
    let expectedValue = ["11111", "orange", 1, "2019-11-10"];
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
      "Total: 1 Juice";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("getFooter", function() {
  it("should return footer with singular juice syntax if qty is less than 2", function() {
    let actualValue = getFooter(1);
    let expectedValue = "Total: 1 Juice";
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return footer with plural juice syntax if qty is more than 1", function() {
    let actualValue = getFooter(2);
    let expectedValue = "Total: 1 Juices";
    asseert.strictEqual(actualValue, expectedValue);
  });
});
