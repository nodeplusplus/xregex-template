import fs from "fs";
import path from "path";

import { XTemplate } from "../../src";

describe("Template", () => {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../../mocks/template.yaml"),
    "utf8"
  );

  describe("compile", () => {
    it("should compile template successfully", () => {
      const xtemplate = new XTemplate();
      const template = xtemplate.compile<any>(content);

      expect(typeof template).toBe("object");
      const keys = Object.keys(template);
      expect(keys.sort()).toEqual(
        [
          "CONNECTIONS",
          "logger",
          "XMiddleware",
          "configs",
          "scheduler",
          "downloader",
          "pipeline",
          "storage",
          "queue",
          "datasource",
          "XProvider",
        ].sort()
      );
    });

    it("should allow override by values object", () => {
      const xtemplate = new XTemplate();
      const template = xtemplate.compile<any>(content, {
        values: { XProvider: null },
      });

      expect(template.XProvider).toBeNull();
    });

    it("should allow override by array of template key=value", () => {
      const xtemplate = new XTemplate();
      const template = xtemplate.compile<any>(content, {
        override: ["XProvider.extra.0.name=test"],
      });

      expect(template.XProvider.extra).toEqual([{ name: "test" }]);
    });
  });

  describe("resolve", () => {
    it("should return resolved template successfull", () => {
      const xtemplate = new XTemplate();
      const resolvedContent = xtemplate.resolve(content);

      expect(resolvedContent).toBeTruthy();
    });

    it("should return resolved template with options as well", () => {
      const xtemplate = new XTemplate();
      const resolvedContent = xtemplate.resolve(content, {
        values: { TEST: true },
      });

      expect(resolvedContent).toBeTruthy();
      expect(resolvedContent.includes("TEST")).toBeTruthy();
    });
  });
});
