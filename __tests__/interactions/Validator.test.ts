import fs from "fs";
import path from "path";
import _ from "lodash";

import {
  XTemplate,
  DefaultTemplateValidator,
  IXTemplateValidator,
} from "../../src";

describe("Validator", () => {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../../mocks/template.yaml"),
    "utf8"
  );

  describe("validate", () => {
    it("should validate template successfully", () => {
      const xtemplate = new XTemplate();
      const template = xtemplate.compile<any>(content);

      const errors = new DefaultTemplateValidator().validate(template);
      expect(errors).toEqual([]);
    });

    it("should validate template with previous validator as well", () => {
      const xtemplate = new XTemplate();
      const template = xtemplate.compile<any>(content);

      const errors = new DefaultTemplateValidator(new TestValidator()).validate(
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
      const xtemplate = new XTemplate();
      const template = xtemplate.compile<any>(content);

      const errors = new DefaultTemplateValidator().getComponents(template);
      expect(errors).toEqual({});
    });

    it("should return template components with previous validator as well", () => {
      const xtemplate = new XTemplate();
      const template = xtemplate.compile<any>(content);

      const errors = new DefaultTemplateValidator(
        new TestValidator()
      ).getComponents(template);
      expect(errors).toEqual(new TestValidator().getComponents());
    });
  });
});

class TestValidator<T = any> implements IXTemplateValidator<T> {
  validate() {
    return [];
  }
  getComponents() {
    return { test: true };
  }
}
