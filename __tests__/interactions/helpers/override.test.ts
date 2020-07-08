import faker from "faker";

import { parseOverride } from "../../../src/helpers/parseOverride";

describe("helpers.parseOverride", () => {
  const object = {
    id: faker.random.uuid(),
    tags: [{ name: faker.lorem.word() }],
  };

  it("should parse override template with default separator", () => {
    const templates = [`id=${object.id}`, `tags.0.name=${object.tags[0].name}`];
    expect(parseOverride(templates)).toEqual(object);
  });

  it("should parse override template with custom separator as well", () => {
    const seperator = "#";
    const templates = [
      `id${seperator}${object.id}`,
      `tags.0.name${seperator}${object.tags[0].name}`,
    ];
    expect(parseOverride(templates, seperator)).toEqual(object);
  });
});
