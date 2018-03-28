import { Post } from "../Schema";

const savePost = (authorName, title, blogText) => {
  console.log("authorName connector", authorName);
  return new Post({ authorName, title, blogText })
    .createPost()
    .then(newPost => {
      console.log("newPost", newPost);
      return { newPost, error: null };
    })
    .catch(err => {
      throw new Error(err);
    });
};

export { savePost };
