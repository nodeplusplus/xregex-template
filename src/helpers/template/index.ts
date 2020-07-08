import Handlebars from "handlebars";

import { templateHelperEnv } from "./env";
import { templateHelperRealpath } from "./realpath";

export const helpers = {
  env: templateHelperEnv,
  realpath: templateHelperRealpath,
};
export function register(handlebar: typeof Handlebars): void {
  handlebar.registerHelper("env", templateHelperEnv);
  handlebar.registerHelper("realpath", templateHelperRealpath);
}
