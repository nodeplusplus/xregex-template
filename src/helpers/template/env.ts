export function templateHelperEnv(
  envName: string,
  defaultValue: any | { fn: Function }
) {
  const env = process.env[envName];
  // if you omit second parameter, it's going to become handler options object
  // so if defaultValue, mean we don't care about default value anymore
  if (typeof defaultValue === "object" && defaultValue.fn) return env;

  // for other case, we have defined defaultValue
  if (typeof env === "undefined") return defaultValue;

  if (typeof defaultValue === "boolean") return env.toLowerCase() === "true";
  if (typeof defaultValue === "number") return Number(env);

  if (Object.prototype.toString.call(defaultValue) === "[object Date]") {
    return new Date(env);
  }
  if (Array.isArray(defaultValue)) {
    return env.split(",").filter(Boolean);
  }

  return env;
}
