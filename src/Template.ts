import Handlebar from "handlebars";
import yaml from "js-yaml";
import xhelpers, { GenericObject } from "@nodeplusplus/xregex-helpers";

import { IXTemplate, IXTemplateCompileOptions } from "./types";
import * as helpers from "./helpers";

export class XTemplate implements IXTemplate {
  constructor() {
    helpers.template.register(Handlebar);
  }

  public compile<T>(input: string, options?: IXTemplateCompileOptions): T {
    const compile = Handlebar.compile(input);
    const content = compile({ ...options?.ref }, {});

    const schema = new yaml.Schema({ include: [yaml.DEFAULT_FULL_SCHEMA] });
    const template = yaml.safeLoad(content, { schema, json: true });

    const override =
      options?.override && helpers.parseKeyValue(options.override);
    return xhelpers.merge({}, template, options?.values, override);
  }

  public dump(input: string, options?: IXTemplateCompileOptions, json = false) {
    const template = this.compile<GenericObject>(input, options);
    if (json) return template;

    return yaml.dump(template);
  }
}
