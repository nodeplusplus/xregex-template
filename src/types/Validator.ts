export interface IXTemplateValidator {
  readonly ids: string[];
  validate(template: any): Array<IXTemplateValidatorError>;
  getComponents(template: any): any;
}
export interface IXTemplateValidatorError {
  type: string;
  path: string[];
  message: string;
}
