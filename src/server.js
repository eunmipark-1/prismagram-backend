import "./env";
import { GraphQLServer} from "graphql-yoga";
import { prisma } from "../generated/prisma-client";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import {isAuthenticated} from "./middlewares";
//import {sendSecretMail} from "./utils";

//import "./passport";

const PORT = process.env.PORT || 5000;
/*
const typeDefs = `
  type Query {
    hello : String!
  }
`;


const resolvers = {
  Query : {
    hello: () => "Hi"
  }
}
*/
const server = new GraphQLServer({
  schema, 
  context: ({request}) => ({request, isAuthenticated})
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({port: PORT}, () => console.log(`Server runnung on http://localhost:${PORT}`));