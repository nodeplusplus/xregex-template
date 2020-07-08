import path from "path";

export function templateHelperRealpath(
  filePath: string,
  basePath?: string | { fn: Function }
) {
  if (path.isAbsolute(filePath)) return filePath;

  const base = typeof basePath === "string" ? basePath : process.env.PWD;
  if (!base) return filePath;

  return path.resolve(base, filePath);
}
