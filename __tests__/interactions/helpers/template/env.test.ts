import { templateHelperEnv } from "../../../../src/helpers/template/env";

describe("helpers.template.env", () => {
  beforeAll(() => {
    process.env.TEST_BOOLEAN = "true";
    process.env.TEST_NUMBER = "1";
    process.env.TEST_DATE = new Date().toISOString();
    process.env.TEST_ARRAY = ["template", "env"].join(",");
  });

  it("should return environment variable if default value is object", () => {
    expect(
      templateHelperEnv("NOT_FOUND", { fn: function () {} })
    ).toBeUndefined();
  });

  it("should return default value if env is not set and default value is not a object", () => {
    expect(templateHelperEnv("IS_TEST", true)).toBeTruthy();
  });

  it("should return exact data type of default value", () => {
    expect(templateHelperEnv("TEST_BOOLEAN", false)).toBe(
      process.env.TEST_BOOLEAN === "true"
    );
    expect(templateHelperEnv("TEST_NUMBER", 0)).toBe(
      Number(process.env.TEST_NUMBER)
    );
    expect(templateHelperEnv("TEST_DATE", new Date())).toEqual(
      new Date(process.env.TEST_DATE as string)
    );
    expect(templateHelperEnv("TEST_ARRAY", [])).toEqual(
      (process.env.TEST_ARRAY as string).split(",")
    );
    expect(typeof templateHelperEnv("PWD", "")).toBeTruthy();
  });
});
