const assert = require("assert");
const updateTransaction = require("../src/operations.js").updateTransaction;
const giveTotalQty = require("../src/operations.js").giveTotalQty;
const extractDetail = require("../src/operations.js").extractDetail;
const queryTransactions = require("../src/operations.js").queryTransactions;

describe("updateTransactions", function() {
  it("should update the given transaction in empId if it not exixts already", function() {
    let actualValue = updateTransaction(
      {},
      { empId: "11111", beverage: "orange", qty: "1" }
    );
    let expectedValue = {
      "11111": [{ empId: "11111", beverage: "orange", qty: "1" }]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should update the given transaction in empId if it exixts already", function() {
    let actualValue = updateTransaction(
      {
        "11111": [{ empId: "11111", beverage: "orange", qty: "1" }]
      },
      { empId: "11111", beverage: "watermelon", qty: "1" }
    );
    let expectedValue = {
      "11111": [
        { empId: "11111", beverage: "orange", qty: "1" },
        { empId: "11111", beverage: "watermelon", qty: "1" }
      ]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("giveTotalQty", function() {
  it("should give total qty of transactions", function() {
    let actualValue = giveTotalQty(0, { qty: 1 });
    let expectedValue = 1;
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("extractDetail", function() {
  it("should give values of transaction", function() {
    let actualValue = extractDetail({
      empId: "11111",
      beverage: "orange",
      qty: 1,
      date: "10-11-2019"
    });
    let expectedValue = ["11111", "orange", 1, "10-11-2019"];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("queryTransactions", function() {
  it("should return all transaction status of a given empId", function() {
    let actualValue = queryTransactions(
      {
        "11111": [
          { empId: "11111", beverage: "orange", qty: 1, date: "10-20=-2" }
        ]
      },
      { empId: "11111" }
    );
    let expectedValue = [["11111", "orange", 1, "10-20=-2"], 1];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
