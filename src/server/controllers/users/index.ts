import * as signIn from "./signIn";
import * as singUp from "./signUp";

export const UsersController = {
  ...signIn,
  ...singUp
};
