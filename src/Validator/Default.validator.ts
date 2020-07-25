import _ from "lodash";

import { BaseValidator } from "./Base.validator";
import { validators } from "./validators";

export class DefaultValidator extends BaseValidator {
  public getId() {
    return DefaultValidator.name;
  }
  public getValidators() {
    return validators;
  }
}
