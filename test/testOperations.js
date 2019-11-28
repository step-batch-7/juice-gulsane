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
  it("should return status of specific employee when only EmpId is given", function() {
    let actualValue = queryTransactions(
      [{ empId: "11111", beverage: "orange", qty: 1, date: "10-10-2019" }],
      { "--query": { empId: "11111" } }
    );
    let expectedValue = [
      { empId: "11111", beverage: "orange", qty: 1, date: "10-10-2019" }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give status of only specific beverages only specific beverage is given", function() {
    const actualValue = queryTransactions(
      [
        { empId: "11111", beverage: "orange", qty: 1, date: "10-10-2019" },
        { empId: "12345", beverage: "orange", qty: 2, date: "10-1-2019" }
      ],
      { "--query": { "--beverage": "orange" } }
    );
    const expectedValue = [
      { empId: "11111", beverage: "orange", qty: 1, date: "10-10-2019" },
      { empId: "12345", beverage: "orange", qty: 2, date: "10-1-2019" }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should give the the only status which fulfill the specified beverage and empId", function() {
    const actualValue = queryTransactions(
      [
        { empId: "11111", beverage: "orange", qty: 1, date: "10-10-2019" },
        { empId: "12345", beverage: "orange", qty: 2, date: "10-1-2019" },
        { empId: "11111", beverage: "grape", qty: 1, date: "10-10-2019" }
      ],
      { "--query": { "--beverage": "grape", "--empId": "11111" } }
    );
    const expectedValue = [
      { empId: "11111", beverage: "grape", qty: 1, date: "10-10-2019" }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
