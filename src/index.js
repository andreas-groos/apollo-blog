const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
import uniqBy from "lodash/uniqBy";
import sortBy from "lodash/sortBy";
import chalk from "chalk";
import connectMongo from "./connectMongo";

const PORT = process.env.PORT || 4010;
// Some fake data
const events = [
  {
    title: "Breakfast",
    date: new Date(2018, 1, 1).toString()
  },
  {
    title: "Tooth Brushing",
    date: new Date(2018, 2, 1).toString()
  }
];

const users = [
  {
    id: 1,
    name: "Andreas",
    email: "andreas.groos1@gmail.com",
    eventTypes: ["Breakfast", "Tooth Brushing"],
    events: []
  },
  {
    id: 2,
    name: "Mike",
    email: "mike@gmail.com",
    eventTypes: ["Breakfast", "Dinner"],
    events: []
  }
];

// The GraphQL schema in string form
const typeDefs = [
  `
  type Event { id: ID!, title: String, date: String }
  type User {id: ID!, name: String, email: String, eventTypes: [EventType], events: [Event]}
  type EventType {title: String}
  type Input { name: String, email: String}
  type Query {
     events: [Event]
     users: [User]
     eventType: [EventType]
     }
  type Mutation {
    createUser(name: String, email: String): User

  }
`
];

// The resolvers
const resolvers = {
  Query: {
    events: () => events,
    users: () => users,
    eventType: () => {
      let result = [];
      users.map(u => {
        u.eventTypes.map(e => {
          result.push({ title: e });
        });
      });
      result = uniqBy(result, "title");
      return result;
    }
  },
  Mutation: {
    createUser: (root, args) => {
      console.log("root", root);
      console.log("args", args);
      let newUser = { name: args.name, email: args.email };
      users.push(newUser);

      return newUser;
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

// GraohiQl mutation:
// mutation {
//   createUser(name: "Mikddel" ,email:"Mike@gmail.com") {
//     name
//     email
//   }
// }
