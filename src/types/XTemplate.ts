import { GenericObject } from "./Common";

export interface IXTemplate {
  compile<T>(input: string, options?: IXTemplateCompileOptions): T;
  dump(
    input: string,
    options?: IXTemplateCompileOptions,
    json?: boolean
  ): string | GenericObject;
}

export interface IXTemplateCompileOptions {
  values?: GenericObject;
  override?: string[];
  ref?: any;
}
