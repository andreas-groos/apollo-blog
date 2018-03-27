const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
import uniqBy from "lodash/uniqBy";
import sortBy from "lodash/sortBy";
import chalk from "chalk";
import connectMongo from "./connectMongo";
import { Post, Author, Comment, Like, User } from "./Schema";

const PORT = process.env.PORT || 4010;

// The GraphQL schema in string form
const typeDefs = [
  `
  type Post { id: ID!, authorName: String,title: String, date: String, blogText: String, likes: Int , comments: [Comment] ,createdAt: String, updatedAt: String}
  type postID { id: ID!}
  type Author {id: ID!, name: String, email: String, postsID: [postID], createdAt: String, updatedAt: String }
  type User {id: ID!, name: String, email: String, createdAt: String, updatedAt: String}
  type  Comment {text: String, date: String}
  type Query {
     authors: [Author]
     users: [User]
     posts(authorName: String): [Post]
     user(userName: String): [Comment]
     }
  type Mutation {
    createUser(name: String, email: String): User
    createAuthor(name: String, email: String): Author
    createPost(authorName: String, title: String, blogText: String): Post
    # createComment(userName: String, text: String): Post
    # addLike(userName: String, postID: ID): Post
  }
`
];

// The resolvers
const resolvers = {
  Query: {
    users: () => User.find({}),
    authors: () => Author.find({}),
    posts: async (root, args) => {
      let { authorName } = args;
      let author = await Author.find({ name: authorName });
      return author.posts;
    },
    user: async (root, args) => {
      let { userName } = args;
      let user = await User.find({ name: userName });
      return user;
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      let { name, email } = args;
      let newUser = new User({ name, email });
      let final = await newUser
        .createUser()
        .then(async returnedResult => {
          console.log("returnedResult", returnedResult);
          return returnedResult;
        })
        .catch(err => {
          console.log("ERROR!", err);
          return null;
        });
      return final;
    },
    createAuthor: async (root, args) => {
      let { name, email } = args;
      let newAuthor = new Author({ name, email, posts: [] });
      await newAuthor.save();
      return newAuthor;
    },
    createPost: async (root, args) => {
      let { authorName, title, blogText } = args;
      let newPost = new Post({ authorName, title, blogText, date: new Date() });
      await newPost.save();
      return newPost;
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the app
const app = express();

connectMongo();
// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(PORT, () => {
  console.log(chalk.blue(`GraphQl now running on ${PORT}`));
});

// GraphiQl mutation:

// mutation {
//   createUser(name: "Andreas",email: "andreas.groos1@gmail.com") {
//     name
//     email
//   }
// }
