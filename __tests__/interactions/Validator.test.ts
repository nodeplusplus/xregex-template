import fs from "fs";
import path from "path";
import _ from "lodash";

import { XTemplate, DefaultValidator, IXTemplateValidator } from "../../src";

describe("Validator", () => {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../../mocks/template.yaml"),
    "utf8"
  );
  const xtemplate = new XTemplate();
  const template = xtemplate.compile<any>(content);

  it("should log all validator to .steps", () => {
    expect(new DefaultValidator().steps).toEqual([DefaultValidator.name]);
    expect(new DefaultValidator(new TestValidator()).steps).toEqual([
      TestValidator.name,
      DefaultValidator.name,
    ]);
  });

  describe("validate", () => {
    it("should validate template successfully", () => {
      const errors = new DefaultValidator().validate(template);
      expect(errors).toEqual([]);
    });

    it("should validate template with previous validator as well", () => {
      const errors = new DefaultValidator(new TestValidator()).validate(
        _.omit(template, "logger.type")
      );
      expect(errors.length).toBe(1);
      expect(errors[0].type).toBeTruthy();
      expect(errors[0].message).toBeTruthy();
      expect(errors[0].path).toEqual(["logger", "type"]);
    });
  });

  describe("getComponents", () => {
    it("should return template components successfully", () => {
      const errors = new DefaultValidator().getComponents(template);
      expect(errors).toEqual({});
    });

    it("should return template components with previous validator as well", () => {
      const errors = new DefaultValidator(new TestValidator()).getComponents(
        template
      );
      expect(errors).toEqual(new TestValidator().getComponents());
    });
  });
});

class TestValidator<T = any> implements IXTemplateValidator<T> {
  get steps() {
    return [TestValidator.name];
  }

  validate() {
    return [];
  }
  getComponents() {
    return { test: true };
  }
}
