const assert = require("assert");
const updateTransaction = require("../src/operations.js").updateTransaction;
const queryTransactions = require("../src/operations.js").queryTransactions;

describe("updateTransactions", function() {
  it("should update the given transaction in empId if it not exixts already", function() {
    let actualValue = updateTransaction([], {
      empId: "11111",
      beverage: "orange",
      qty: "1"
    });
    let expectedValue = [{ empId: "11111", beverage: "orange", qty: "1" }];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should update the given transaction in empId if it exixts already", function() {
    let actualValue = updateTransaction(
      [{ empId: "11111", beverage: "orange", qty: "1" }],
      { empId: "11111", beverage: "watermelon", qty: "1" }
    );
    let expectedValue = [
      { empId: "11111", beverage: "orange", qty: "1" },
      { empId: "11111", beverage: "watermelon", qty: "1" }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("queryTransactions", function() {
  it("should return all transaction status of a given empId", function() {
    let actualValue = queryTransactions(
      [{ empId: "11111", beverage: "orange", qty: 1, date: "10-20=-2" }],
      { empId: "11111" }
    );
    let expectedValue = [
      { empId: "11111", beverage: "orange", qty: 1, date: "10-20=-2" }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
