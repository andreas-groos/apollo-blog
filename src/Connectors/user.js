import { User } from "../Schema";

const saveUser = (name, email) => {
  return new User({ name, email })
    .createUser()
    .then(newUser => {
      return { newUser, error: null };
    })
    .catch(err => {
      throw new Error(err);
    });
};

export { saveUser };
