import { GenericObject } from "./Common";

export interface IXTemplate {
  compile<T>(input: string, options?: IXTemplateCompileOptions): T;
  resolve(input: string, options?: IXTemplateCompileOptions): string;
}

export interface IXTemplateCompileOptions {
  values?: GenericObject;
  override?: string[];
  ref?: any;
}
