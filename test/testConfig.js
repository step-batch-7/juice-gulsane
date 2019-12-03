const assert = require("assert");
const config = require("../src/config");

describe("getPath", function() {
  it("should return default path if path is not injected", function() {
    const process = { env: { DATAFILE: "" } };
    let actualValue = config.getPath(process);
    let expectedValue = "./transactionDetails.json";
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return the enjected path if path is injected", function() {
    const process = { env: { DATAFILE: "./hello" } };
    let actualValue = config.getPath(process);
    let expectedValue = "./hello";
    assert.strictEqual(actualValue, expectedValue);
  });
});
describe("getTime", function() {
  it("should return default date if it is not injected", function() {
    const process = { env: {} };
    let actualValue = config.getTime(process);
    let expectedValue = new Date();
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return injected date if it is injected", function() {
    const process = { env: { date: "2019-11-26T17:32:02.942Z" } };
    let actualValue = config.getTime(process).toJSON();
    let expectedValue = "2019-11-26T17:32:02.942Z";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
