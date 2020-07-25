export interface IXTemplateValidator<T> {
  readonly steps: string[];
  validate(template: T): Array<IXTemplateValidatorError>;
  getComponents(template: T): any;
}
export interface IXTemplateValidatorError {
  type: string;
  path: string[];
  message: string;
}
