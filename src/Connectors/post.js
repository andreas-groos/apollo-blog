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

const addLike = async (id, user) => {
  return new Promise(async (resolve, reject) => {
    await Post.findOne({ id })
      .then(async post => {
        if (post) {
          return post.addLike(user);
        } else {
          throw new Error(`post ID doesn't exist`);
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const addComment = async (text, user, id) => {
  console.log(text, user, id, "----------------");
  await Post.findOne({ id }).then(async post => {
    if (post) {
      let result = await post.addComment(text, user);
      console.log("result addComment", result);
      return result;
    }
  });
};
export { savePost, addLike, addComment };
