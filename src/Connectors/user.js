import { User } from "../Schema";
import { createError, formatError } from "apollo-errors";

const customError = createError("custom error", {
  message: "validation error"
});

const saveUser = (name, email) => {
  return new User({ name, email })
    .createUser()
    .then(newUser => {
      return { newUser, error: null };
    })
    .catch(err => {
      throw new customError({
        data: { type: err }
      });
    });
};

export { saveUser };
