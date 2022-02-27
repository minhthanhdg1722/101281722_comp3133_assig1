const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js")
const User = require('./model/User')

//import typedefs and resolvers
const TypeDefs = require('./schema')
const Resolvers = require('./resolvers')

//import ApolloServer
const { ApolloServer } = require('apollo-server-express')

//Store sensitive information to env variables
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });

//Define Apollo Server
const server = new ApolloServer({
  typeDefs: TypeDefs.typeDefs,
  resolvers: Resolvers.resolvers
})

//Define Express Server
const app = express();
app.use(bodyParser.json());
app.use('*', cors());

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.start().then(res => {
  server.applyMiddleware({ app });
  app.listen({ port: 8080 }, () =>
      console.log('Now browse to http://localhost:8080' + server.graphqlPath)
  )
 })