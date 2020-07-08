import { unflatten } from "flat";

import { GenericObject } from "../types";

export function parseKeyValue(
  templates: string[],
  separator = "="
): GenericObject {
  const pairs = templates
    .filter(filter.bind(null, separator))
    .map(split.bind(null, separator));
  const options = Object.assign({}, ...pairs);
  return unflatten(options, { object: false });
}

function filter(separator: string, template?: string) {
  return template && template.includes(separator);
}

function split(separator: string, pairs: string): GenericObject {
  const [key, value] = pairs.split(separator).map((p) => p.trim());
  return { [key]: value };
}
