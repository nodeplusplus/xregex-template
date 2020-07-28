import _ from "lodash";
import Joi from "joi";

import {
  GenericObject,
  IXTemplateValidator,
  IXTemplateValidatorError,
} from "../types";

export abstract class BaseValidator implements IXTemplateValidator {
  public get ids() {
    const ids = [this.getId()];
    if (this.validator) ids.unshift(...this.validator.ids);
    return ids;
  }

  protected validator?: IXTemplateValidator;
  constructor(validator?: IXTemplateValidator) {
    this.validator = validator;
  }

  public validate(template: any) {
    const prevErrors = this.validator ? this.validator.validate(template) : [];

    const validators = this.getValidators();
    const { error } = validators.validate(template, { abortEarly: false });
    const errors = error
      ? error.details.map((error) => _.pick(error, ["type", "path", "message"]))
      : [];

    return _.uniqBy([...prevErrors, ...errors], (e) =>
      e.path.join(".")
    ) as IXTemplateValidatorError[];
  }

  public getComponents(template: any): GenericObject {
    return this.validator ? this.validator.getComponents(template) : {};
  }

  protected abstract getId(): string;
  protected abstract getValidators(): Joi.ObjectSchema;
}
