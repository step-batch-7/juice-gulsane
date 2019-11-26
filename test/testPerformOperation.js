const assert = require("assert");
const performOperation = require("../src/performOperation.js").performOperation;
const parseUserArgs = require("../src/performOperation.js").parseUserArgs;
const generateContent = require("../src/performOperation.js").generateContent;
const doQueryOperation = require("../src/performOperation.js").doQueryOperation;
const doSaveOperation = require("../src/performOperation.js").doSaveOperation;

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

describe("generateContent", function() {
  it("should return an empty content if file path is wrong", function() {
    const existsFile = function(path) {
      assert.strictEqual(path, "./hai");
      return false;
    };
    const readFile = function(path, encode) {
      assert.strictEqual(path, "./hai");
      assert.strictEqual(encode, "utf8");
      return "something";
    };
    let actualValue = generateContent("./hai", readFile, existsFile);
    let expectedValue = {};
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return the parsed content of file when path is right", function() {
    const existsFile = function(path) {
      assert.strictEqual(path, "./hello");
      return true;
    };
    const readFile = function(path, encode) {
      assert.strictEqual(path, "./hello");
      assert.strictEqual(encode, "utf8");
      return '{"ram":"mohan"}';
    };
    let actualValue = generateContent("./hello", readFile, existsFile);
    let expectedValue = { ram: "mohan" };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("doQueryOperation", function() {
  it("should return an message when empId is not in transactions history", function() {
    let actualValue = doQueryOperation({}, { empId: "11111" });
    let expectedValue = "there is no transaction with empId: " + "11111";
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return transaction details if empId present in transaction history", function() {
    let actualValue = doQueryOperation(
      {
        "11111": [
          { empId: "11111", beverage: "orange", qty: 1, date: "10-10-2019" }
        ]
      },
      { empId: "11111" }
    );
    let expectedValue =
      "Employee ID,Beverage,Quantity,Date\n" +
      "11111,orange,1,10-10-2019\n" +
      "Total: 1 Juices";
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("performOperation", function() {
  it("it should choose save action if --save command is given", function() {
    let userArgs = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "111",
      "qty",
      "1"
    ];
    const fileFunctions = {
      readFile: (path, encode) => {
        assert.strictEqual(path, "./hai");
        assert.strictEqual(encode, "utf8");
        return "{}";
      },
      writeFile: (path, content, encode) => {
        assert.strictEqual(path, "./hai");
        assert.strictEqual(
          content,
          '{"111":[{"empId":"111","beverage":"orange","qty":1,"date":"2019-11-26T17:32:02.942Z"}]}'
        );
        assert.strictEqual(encode, "utf8");
      },
      existsFile: path => {
        assert.strictEqual(path, "./hai");
        return true;
      }
    };

    let date = function() {
      return "2019-11-26T17:32:02.942Z";
    };

    let actualValue = performOperation(
      "./hai",
      fileFunctions,
      userArgs,
      date()
    );
    let expectedValue =
      "Transaction Recorded:\n" +
      "Employee ID,Beverage,Quantity,Date\n" +
      "111,orange,1,2019-11-26T17:32:02.942Z";

    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it.only("should choose query action if --query command is given", function() {
    const userArgs = ["--Query", "--empId", "12345"];
    const fileFunctions = {
      readFile: (path, encode) => {
        assert.strictEqual(path, "./hai");
        assert.strictEqual(encode, "utf8");
        return "{}";
      },
      writeFile: (path, content, encode) => {
        assert.strictEqual(path, "./hai");
        assert.strictEqual(
          content,
          '{"111":[{"empId":"111","beverage":"orange","qty":1,"date":"2019-11-26T17:32:02.942Z"}]}'
        );
        assert.strictEqual(encode, "utf8");
      },
      existsFile: path => {
        assert.strictEqual(path, "./hai");
        return true;
      }
    };

    let date = function() {
      return "2019-11-26T17:32:02.942Z";
    };

    let actualValue = performOperation(
      "./hai",
      fileFunctions,
      userArgs,
      date()
    );
    let expectedValue = "there is no transaction with empId: 12345";
    assert.strictEqual(actualValue, expectedValue);
  });
});
