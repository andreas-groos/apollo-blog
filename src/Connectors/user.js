import { User } from "../Schema";

const saveUser = (name, email, uid) => {
  return new User({ name, email, uid })
    .createUser(name, email, uid)
    .then(newUser => {
      return { newUser, error: null };
    })
    .catch(err => {
      throw new Error(err);
    });
};

export { saveUser };
