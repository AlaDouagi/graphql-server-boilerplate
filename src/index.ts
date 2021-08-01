import 'module-alias/register';
import fastify from "fastify";
import { ApolloServer } from "apollo-server-fastify";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";

import * as resolvers from "./resolvers";

const API_PORT = Number(process.env.API_PORT) || 4000;

const schema = loadSchemaSync(join(__dirname, "./schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
});

const app = fastify();

async function launch() {
  await server.start();

  console.log("Server started 🚀");

  app.register(server.createHandler());

  await app.listen(API_PORT, "0.0.0.0");

  console.log(`App listening on port ${API_PORT} ✔️`);
}

launch();
