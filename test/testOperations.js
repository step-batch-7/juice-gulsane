const assert = require("assert");
const updateTransaction = require("../src/operations.js").updateTransaction;
const queryTransactions = require("../src/operations.js").queryTransactions;

describe("updateTransactions", function() {
  it("should update the given transaction in trandsaction data", function() {
    let actualValue = updateTransaction([], {
      empId: "11111",
      beverage: "orange",
      qty: "1",
      date: "2019-11-26T17:32:02.942Z"
    });
    let expectedValue = [
      {
        empId: "11111",
        beverage: "orange",
        qty: "1",
        date: "2019-11-26T17:32:02.942Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should update the given transaction in empId if any data exixts already", function() {
    let actualValue = updateTransaction(
      [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-11-26T17:32:02.942Z"
        }
      ],
      {
        empId: "11111",
        beverage: "watermelon",
        qty: "1",
        date: "2019-11-26T17:32:02.942Z"
      }
    );
    let expectedValue = [
      {
        empId: "11111",
        beverage: "orange",
        qty: "1",
        date: "2019-11-26T17:32:02.942Z"
      },
      {
        empId: "11111",
        beverage: "watermelon",
        qty: "1",
        date: "2019-11-26T17:32:02.942Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("queryTransactions", function() {
  it("should return status of specific employee when only EmpId is given", function() {
    let actualValue = queryTransactions(
      [
        {
          empId: "11111",
          beverage: "orange",
          qty: 1,
          date: "2019-11-26T17:32:02.942Z"
        }
      ],
      { "--query": { empId: "11111" } }
    );
    let expectedValue = [
      {
        empId: "11111",
        beverage: "orange",
        qty: 1,
        date: "2019-11-26T17:32:02.942Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give status related to specific given beverage", function() {
    const actualValue = queryTransactions(
      [
        {
          empId: "11111",
          beverage: "orange",
          qty: 1,
          date: "2019-11-26T17:32:02.942Z"
        },
        {
          empId: "12345",
          beverage: "orange",
          qty: 2,
          date: "2019-11-26T17:32:02.942Z"
        }
      ],
      { "--query": { "--beverage": "orange" } }
    );
    const expectedValue = [
      {
        empId: "11111",
        beverage: "orange",
        qty: 1,
        date: "2019-11-26T17:32:02.942Z"
      },
      {
        empId: "12345",
        beverage: "orange",
        qty: 2,
        date: "2019-11-26T17:32:02.942Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should give the status related to spcific given date", () => {
    const actualValue = queryTransactions(
      [
        {
          empId: "11111",
          beverage: "orange",
          qty: 1,
          date: "2019-11-26T17:32:02.942Z"
        },
        {
          empId: "12345",
          beverage: "orange",
          qty: 2,
          date: "2019-11-25T17:32:02.942Z"
        }
      ],
      { "--query": { "--date": "2019-11-25" } }
    );
    const expectedValue = [
      {
        empId: "12345",
        beverage: "orange",
        qty: 2,
        date: "2019-11-25T17:32:02.942Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should give the the only status which related to the specified beverage and empId", function() {
    const actualValue = queryTransactions(
      [
        {
          empId: "11111",
          beverage: "orange",
          qty: 1,
          date: "2019-11-26T17:32:02.942Z"
        },
        {
          empId: "12345",
          beverage: "orange",
          qty: 2,
          date: "2019-11-26T17:32:02.942Z"
        },
        {
          empId: "11111",
          beverage: "grape",
          qty: 1,
          date: "2019-11-26T17:32:02.942Z"
        }
      ],
      { "--query": { "--beverage": "grape", "--empId": "11111" } }
    );
    const expectedValue = [
      {
        empId: "11111",
        beverage: "grape",
        qty: 1,
        date: "2019-11-26T17:32:02.942Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should give the only status which related to the specified beverage and date", () => {
    let actualValue = queryTransactions(
      [
        {
          empId: "11111",
          beverage: "orange",
          qty: 1,
          date: "2019-11-26T17:32:02.942Z"
        },
        {
          empId: "12345",
          beverage: "orange",
          qty: 2,
          date: "2019-11-24T17:32:02.942Z"
        },
        {
          empId: "11111",
          beverage: "grape",
          qty: 1,
          date: "2019-11-26T17:32:02.942Z"
        }
      ],
      { "--query": { "--beverage": "orange", "--date": "2019-11-24" } }
    );
    let expectedValue = [
      {
        empId: "12345",
        beverage: "orange",
        qty: 2,
        date: "2019-11-24T17:32:02.942Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
