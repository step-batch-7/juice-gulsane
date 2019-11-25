const assert = require("assert");
const performOperation = require("../src/performOperation.js").performOperation;
const parseUserArgs = require("../src/performOperation").parseUserArgs;

describe("parseUserArgs", function() {
  it("should return empId in object if query action is given", function() {
    let actualValue = parseUserArgs(["--query", "empId", "11111"]);
    let expectedValue = { empId: "11111" };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should return empId, beverage, qty if --save action is given", function() {
    let actualValue = parseUserArgs([
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "11111",
      "--qty",
      "1"
    ]);
    let expectedValue = { empId: "11111", beverage: "orange", qty: 1 };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("performOperation", function() {
  it("it should choose save action if --save command is given", function() {
    let actualValue = performOperation({}, [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "11111",
      "--qty",
      "1"
    ]);
    let expectedValue = {
      "11111": [
        {
          empId: "11111",
          beverage: "orange",
          qty: 1,
          date: actualValue["11111"][actualValue["11111"].length - 1].date
        }
      ]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("it should choose query action when --query command is given", function() {
    let actualValue = performOperation(
      {
        "11111": [
          { empId: "11111", beverage: "orange", qty: 1, date: "10-10-2019" }
        ]
      },
      ["--query", "empId", "11111"]
    );
    let expectedValue = [["11111", "orange", 1, "10-10-2019"], [1]];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
