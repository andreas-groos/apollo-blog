import mongoose from "mongoose";
import chalk from "chalk";
require("dotenv").config();

let { DB_NAME, MONGO_PORT, MONGO_URI } = process.env;

if (!MONGO_PORT) {
  MONGO_PORT = 27017;
}
console.log(
  chalk.green(`Connecting to mongodb://${MONGO_URI}:${MONGO_PORT}/${DB_NAME}`)
);
export default function connectMongo() {
  mongoose
    .connect(`mongodb://${MONGO_URI}:${MONGO_PORT}/${DB_NAME}`)
    .then(
      console.log(
        chalk.green("Succesfully connected to MongoDB ", process.env.DB_NAME)
      )
    )
    .catch(err => {
      console.log(chalk.red("ERROR establishing mongo connection", err));
    });
}
