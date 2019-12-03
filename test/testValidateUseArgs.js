const assert = require("assert");
const validate = require("../src/validateUserArgs");

describe("validateEmpId", () => {
  it("should return true if empId is integer and is positive", () => {
    const actualValue = validate.validateEmpId("11111");
    const expectedValue = true;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return false if empId is not whlole number", () => {
    const actualValue = validate.validateEmpId("1.2334");
    const expectedValue = false;
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("validateBeverage", () => {
  it("should return true if beverage length is more than 0", () => {
    const actualValue = validate.validateBeverage("orange");
    const expectedValue = true;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return false if beverage length is equal to 0", () => {
    const actualValue = validate.validateBeverage("");
    const expectedValue = false;
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("validateQty", () => {
  it("should return true it qty is a whole number", () => {
    const actualValue = validate.validateQty("1");
    const expectedValue = true;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should reeturn false if qty is not a whole number", () => {
    const actualValue = validate.validateQty("1.23");
    const expectedValue = false;
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("validateOperation", () => {
  it("should return true when specified operation is available", () => {
    const actualValue = validate.validateOperation("--save");
    const expectedValue = true;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return true when specified operation is available", () => {
    const actualValue = validate.validateOperation("--query");
    const expectedValue = true;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return false when specified operation is not available", () => {
    const actualValue = validate.validateOperation("save");
    const expectedValue = false;
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("validateDate", () => {
  it("should return true if date is given in valid format", () => {
    const actualValue = validate.validateDate("2019-10-11");
    const expectedValue = true;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return false if date stribng length is less than ten", () => {
    const actualValue = validate.validateDate("2019-11-1");
    const expectedValue = false;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return false if date is not valid", () => {
    const actualValue = validate.validateDate("2019-2-30");
    const expectedValue = false;
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("validateArgs", () => {
  it("should return true if args have valid suffix and prefix", () => {
    const actualValue = validate.validateArgs({
      "--beverage": "orange",
      "--empId": "111",
      "--qty": "1"
    });
    const expectedValue = true;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return true if args have valid suffix and prefix", () => {
    const actualValue = validate.validateArgs({
      "--beverage": "orange",
      "--empId": "111",
      "--date": "2019-12-10"
    });
    const expectedValue = true;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return false if args have invalid prefix", () => {
    const actualValue = validate.validateArgs({
      "-beverage": "orange",
      "--empId": "111",
      "--ate": "2019-12-10"
    });
    const expectedValue = false;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return false if args have invalid suffix", () => {
    const actualValue = validate.validateArgs({
      "--beverage": "orange",
      "--empId": "111",
      "--date": "2019-12-"
    });
    const expectedValue = false;
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("validateUserArgs", () => {
  it("should return true if user arguements are valid", () => {
    const actualValue = validate.validateUserArgs({
      "--save": { "--empId": "123", "--beverage": "orange", "--qty": "1" }
    });
    const expectedValue = true;
    assert.strictEqual(actualValue, expectedValue);
  });
  it("should return false if user arguements are not valid", () => {
    const actualValue = validate.validateUserArgs({
      "--donnns": { "--empId": "123", "--beverage": "orange", "--qty": "1" }
    });
    const expectedValue = false;
    assert.strictEqual(actualValue, expectedValue);
  });
});
