import path from "path";

import { templateHelperRealpath } from "../../../../src/helpers/template/realpath";

describe("helpers.template.realpath", () => {
  it("should return original file path if it is absolute path", () => {
    const filePath = path.resolve(__dirname);
    expect(templateHelperRealpath(filePath)).toEqual(filePath);
  });

  it("should ignore empty base path", () => {
    const filePath = "./mocks";
    expect(templateHelperRealpath(filePath, "")).toBe(filePath);
  });

  it("should use process.env.PWD as default base path", () => {
    const filePath = "./mocks";
    expect(templateHelperRealpath(filePath, { fn: function () {} })).toBe(
      path.resolve(process.env.PWD as string, filePath)
    );
  });

  it("should only use base path if it is valid string", () => {
    const filePath = "./mocks";
    const basePath = path.resolve(__dirname, "../../..");
    expect(templateHelperRealpath(filePath, basePath)).toBe(
      path.resolve(basePath, filePath)
    );
  });
});
