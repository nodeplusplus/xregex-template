import Handlebar from "handlebars";
import yaml from "js-yaml";
import xhelpers from "@nodeplusplus/xregex-helpers";

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

  public resolve(input: string, options?: IXTemplateCompileOptions) {
    const template = this.compile(input, options);
    return yaml.dump(template);
  }
}
