import { Author } from "../Schema";

const saveAuthor = (name, email) => {
  return new Author({ name, email })
    .createAuthor()
    .then(newAuthor => {
      return { newAuthor, error: null };
    })
    .catch(err => {
      throw new Error(err);
    });
};

export { saveAuthor };
