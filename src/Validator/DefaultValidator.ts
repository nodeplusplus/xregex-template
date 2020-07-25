import _ from "lodash";

import {
  GenericObject,
  IXTemplateValidator,
  IXTemplateValidatorError,
} from "../types";
import { validators } from "./validators";

export class DefaultValidator<T> implements IXTemplateValidator<T> {
  public get steps() {
    const steps = [DefaultValidator.name];
    if (this.validator) steps.unshift(...this.validator.steps);
    return steps;
  }

  private validator?: IXTemplateValidator<any>;

  constructor(validator?: IXTemplateValidator<any>) {
    this.validator = validator;
  }

  validate(template: T) {
    const prevErrors = this.validator ? this.validator.validate(template) : [];

    const { error } = validators.validate(template, { abortEarly: false });
    const errors = error
      ? error.details.map((error) => _.pick(error, ["type", "path", "message"]))
      : [];

    return [...prevErrors, ...errors] as IXTemplateValidatorError[];
  }

  getComponents(template: T): GenericObject {
    return this.validator ? this.validator.getComponents(template) : {};
  }
}
